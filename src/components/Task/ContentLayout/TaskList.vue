<script setup>
import { ref, onUnmounted , onMounted , watch, computed } from 'vue'
import { supabase } from '../../../supabase/supabase'
import draggable from 'vuedraggable'
import TaskPopup from '../TaskPopup.vue'

const props = defineProps({
  tasks: { type: Array, default: () => [] },
  editID: Number,
  editText: String,
  tags: Array,
  mode: { type: String, default: 'inbox' },
  currentSortType: { type: String, default: 'None' }
})


const emit = defineEmits([
  'update:tasks',
  'complete-task',
  'edit-task',
  'edit-save',
  'edit-date',
  'pin-task',
  'set-priority',
  'delete-task',
  'select-tag'
])

const tasksForDraggableMutable = ref([])
const loading = ref(false)
const error = ref(null)
const popupPosition = ref('bottom')
const taskMenu = ref(null)
const editInput = ref(null)

async function fetchTasks() {
  loading.value = true
  error.value = null
  try {
    const { data, error: fetchError } = await supabase
      .from('tasks')
      .select(`
        id,
        title,
        completed,
        pinned,
        priority,
        due_date,
        tag_id,
        is_trashed,
        updated_at
      `)
    if (fetchError) throw fetchError

    // Map ให้ field สอดคล้องกับ UI เดิม
    tasksForDraggableMutable.value = data
      .filter(task => !task.completed && !task.is_trashed) // กรองเฉพาะงานที่ active
      .map(task => ({
        id: task.id,
        title: task.title,
        completed: task.completed,
        pinned: task.pinned,
        priority: task.priority,
        dueDate: task.due_date,
        tagId: task.tag_id
    }))
    .sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return b.id - a.id // งานใหม่ขึ้นก่อน
    })
  } catch (err) {
    console.error('Error fetching tasks:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function onDragEnd() {
  emit('update:tasks', tasksForDraggableMutable.value)
  console.log('New order:', tasksForDraggableMutable.value.map(t => t.title))
}

function togglePopup(id, event) {
  taskMenu.value = taskMenu.value === id ? null : id
  if (event?.target) {
    const top = event.target.getBoundingClientRect().top
    const screenHeight = window.innerHeight
    popupPosition.value = top < screenHeight / 2 ? 'bottom' : 'top'
  }
}

async function updateTaskField(taskId, updates) {
  try {
    const { error: updateError } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)

    if (updateError) throw updateError
  } catch (err) {
    console.error('Error updating task:', err)
    error.value = err.message
  }
}

function toggleComplete(task) {
  task.completed = !task.completed
  updateTaskField(task.id, { completed: task.completed }) // ✅
  emit('complete-task', task)
}

function flagClass(priority) {
  switch (priority) {
    case 'red': return 'bx bx-flag text-red-500 text-xl'
    case 'yellow': return 'bx bx-flag text-yellow-300 text-xl'
    case 'sky': return 'bx bx-flag text-sky-500 text-xl'
    case 'green': return 'bx bx-flag text-green-400 text-xl'
    default: return ''
  }
}

function editTaskTitle(task, newText) {
  task.title = newText
  updateTaskField(task.id, { title: newText })
}

function editTaskDueDate(task, newDate) {
  task.dueDate = newDate
  updateTaskField(task.id, { due_date: newDate })
}

function editTaskPriority(task, priority) {
  task.priority = priority
  updateTaskField(task.id, { priority })
}

function editTaskPinned(task) {
  task.pinned = !task.pinned
  updateTaskField(task.id, { pinned: task.pinned })
    tasksForDraggableMutable.value.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })
}

const tagsList = ref([...props.tags])

function handleSelectTag(task, tag) {
  const idx = tasksForDraggableMutable.value.findIndex(t => t.id === task.id)
  if (idx !== -1) {
    tasksForDraggableMutable.value[idx].tagId = tag?.id || null
    updateTaskField(task.id, { tag_id: tag?.id || null }) // update DB
  }
}


watch(() => props.tags, (newTags) => {
  tagsList.value = newTags
})



let channel = null

onMounted(async () => {
  await fetchTasks()

  const channel = supabase
    .channel('tasks-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'tasks' },
      async (payload) => {
        console.log('Realtime payload:', payload)
        if (payload.eventType === 'INSERT') {
          if (!payload.new.completed && !payload.new.is_trashed) {
            tasksForDraggableMutable.value.unshift({
              id: payload.new.id,
              title: payload.new.title,
              completed: payload.new.completed,
              pinned: payload.new.pinned,
              priority: payload.new.priority,
              dueDate: payload.new.due_date,
              tagId: payload.new.tag_id
            })
          }
        } else if (payload.eventType === 'UPDATE') {
          const idx = tasksForDraggableMutable.value.findIndex(t => t.id === payload.new.id)

          if (payload.new.completed || payload.new.is_trashed) {
            // ถ้า complete หรือไป trash → เอาออกจาก list
            if (idx !== -1) tasksForDraggableMutable.value.splice(idx, 1)
          } else {
            // ยัง active → update หรือ add เข้าใหม่
            const updatedTask = {
              id: payload.new.id,
              title: payload.new.title,
              completed: payload.new.completed,
              pinned: payload.new.pinned,
              priority: payload.new.priority,
              dueDate: payload.new.due_date,
              tagId: payload.new.tag_id
            }

            if (idx !== -1) {
              tasksForDraggableMutable.value[idx] = updatedTask
            } else {
              tasksForDraggableMutable.value.unshift(updatedTask)
            }
          }
        } else if (payload.eventType === 'DELETE') {
          tasksForDraggableMutable.value =
            tasksForDraggableMutable.value.filter(t => t.id !== payload.old.id)
        }
      }
    )
  .subscribe()
})

onUnmounted(() => {
  if (channel) supabase.removeChannel(channel)
})

watch(() => props.currentSortType, () => {
  tasksForDraggableMutable.value.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1

    switch (props.currentSortType) {
      case 'Date':
        return new Date(a.dueDate || 0) - new Date(b.dueDate || 0)
      case 'Priority':
        const order = { red: 1, yellow: 2, sky: 3, green: 4, null: 5 }
        return (order[a.priority] || 5) - (order[b.priority] || 5)
      case 'Tag':
        return (a.tagId || 0) - (b.tagId || 0)
      default:
        return b.id - a.id
    }
  })
})

</script>

<template>
    <div v-if="loading" class="text-gray-500 mb-2">Loading tasks...</div>
    <div v-if="error" class="text-red-500 mb-2">{{ error }}</div>
    <draggable 
    v-model="tasksForDraggableMutable" 
    item-key="id" 
    class="space-y-2" 
    handle=".drag-handle" 
    :animation="200" 
    ghost-class="drag-ghost"
    chosen-class="drag-chosen" 
    @end="onDragEnd"
    :disabled="currentSortType !== 'None'"
    >
    <template #item="{ element: t }">
      <div v-if="t" :key="t.id" class="flex items-center">
        <button class="drag-handle icon-btn">
          <i class='bx bx-menu text-2xl'></i>
        </button>
        <button @click="toggleComplete(t)">
          <i class='bx bx-checkbox checkbox'></i>
        </button>
        <div class="task">
          <div class="max-w-[50%] flex items-center gap-4">
            <i v-if="t.pinned" class="bx bx-pin text-xl text-purple-400"></i>
            <span v-if="editID !== t.id" @click="$emit('edit-task', t)" class="w-full cursor-pointer select-none">{{ t.title}}</span>
            <input 
            v-else 
            v-model="t.title"
            :tasks="tasks"
            class="w-full bg-transparent outline-none border-none focus:ring-0"
            @keyup.enter="$emit('edit-save', t, t.title)"
            @blur="editTaskTitle(t, t.title)" 
            :ref="el => { if (t.id === editID) editInput.value = el }"
            />
          </div>
          <div class="max-w-[50%] flex items-center gap-3">
              <div v-if="t.dueDate && !isNaN(new Date(t.dueDate).getTime())" class="flex items-center">
                {{ new Date(t.dueDate).toLocaleDateString('th-TH',{day:'numeric', month:'short',year:'numeric'}) }}
              </div>
              <span v-if="tagsList && t.tagId" class="bg-teal-300 p-1 rounded-lg text-lg">
                {{ tagsList.find(tag => String(tag.id) === String(t.tagId))?.text || '' }}
              </span>
              <i v-if="t.priority" :class="flagClass(t.priority)"></i>
          </div>
        </div>
        <div class="relative">
          <button @click="togglePopup(t.id, $event)">
            <i class='bx bx-dots-horizontal-rounded text-2xl text-zinc-300 ml-3'></i>
          </button>
          <div v-if="taskMenu === t.id" @click.self="taskMenu = null"
                class="absolute z-50 right-0" :class="[popupPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2']">
                <TaskPopup 
                v-model="t.dueDate"
                @update:modelValue="(newDate) => editTaskDueDate(t, newDate)"
                @pin-task="() => editTaskPinned(t)"
                @set-priority="(priority) => editTaskPriority(t, priority)"
                @delete="$emit('delete-task', t.id)"
                :tags="tagsList" 
                @select-tag="(tag) => handleSelectTag(t, tag)"
          
                />
          </div>
        </div>
      </div>
    </template>
  </draggable>
</template>
<style>
.drag-chosen  {
   @apply  opacity-100 scale-100 z-50 shadow-2xl ;
}
.drag-ghost {
   @apply opacity-0 pointer-events-none overflow-hidden;
}
.task{
  @apply w-full flex justify-between p-2 border-b border-gray-300 mb-2 text-lg focus-within:border-orange-300 ;
}
.checkbox{
  @apply text-4xl text-zinc-300;
}
.icon-btn {
  @apply flex items-center text-zinc-300 cursor-pointer;
}
</style>