<script setup>
import { ref, watch , onMounted } from 'vue'
import draggable from 'vuedraggable'
import TaskPopup from '../TaskPopup.vue'

const props = defineProps({
  tasks: { type: Array, default: () => [] },
  editID: Number,
  editText: String,
  tags: { type: Array, default: () => [] } 
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
])

const taskMenu = ref(null)
const popupPosition = ref('bottom')
const editInput = ref(null)
const tagsList = ref([...props.tags])

function togglePopup(id, event) {
  taskMenu.value = taskMenu.value === id ? null : id;
  if (event?.target) {
    const top = event.target.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
    popupPosition.value = top < screenHeight / 2 ? 'bottom' : 'top';
  }
}

const tasksForDraggableMutable = ref([...(props.tasks || [])])

watch(() => props.tasks, (newTasks) => {
  tasksForDraggableMutable.value = [...(newTasks || [])]
}, { deep: true })

function onDragEnd() {
  emit('update:tasks', tasksForDraggableMutable.value)
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

const localEditText = ref(props.editText)
watch(() => props.editText, (val) => {
  localEditText.value = val
})

function handleSelectTag(task, tag) {
  task.tagId = tag ? tag.id : null

  const index = tasksForDraggableMutable.value.findIndex(t => t.id === task.id)
  if (index !== -1) {
    tasksForDraggableMutable.value[index] = { ...task }
  }

  emit('update:tasks', tasksForDraggableMutable.value)

  localStorage.setItem('myTasks', JSON.stringify(tasksForDraggableMutable.value))
}

function handleUpdateTag(updatedTag) {
  const index = tagsList.value.findIndex(t => t.id === updatedTag.id)
  if (index !== -1) {
    tagsList.value[index] = { ...updatedTag }
  } else {
    tagsList.value.push(updatedTag)
  }
  localStorage.setItem('myTags', JSON.stringify(tagsList.value))
}

function handleDeleteTag(id) {
  tagsList.value = tagsList.value.filter(t => t.id !== id)
  localStorage.setItem('myTags', JSON.stringify(tagsList.value))
}

onMounted(() => {
  const savedTasks = JSON.parse(localStorage.getItem('myTasks')) || []
  if (savedTasks.length > 0) {
    tasksForDraggableMutable.value = savedTasks
  } else {
    tasksForDraggableMutable.value = [...props.tasks]
  }
})
onMounted(() => {
  const savedTags = JSON.parse(localStorage.getItem('myTags')) || []
  if (savedTags.length > 0) {
    tagsList.value = savedTags
  }
})
</script>

<template>
    <draggable 
    v-model="tasksForDraggableMutable" 
    item-key="id" 
    class="space-y-2" 
    handle=".drag-handle" 
    :animation="200" 
    ghost-class="drag-ghost"
    chosen-class="drag-chosen" 
    @end="onDragEnd"
    >
    <template #item="{ element: t }">
      <div v-if="t" :key="t.id" class="flex items-center">
        <button class="drag-handle icon-btn"><i class='bx bx-menu text-2xl'></i></button>
        <button @click="$emit('complete-task', t)"><i class='bx bx-checkbox checkbox'></i></button>
        <div class="task">
          <div class="max-w-[50%] flex items-center gap-4">
            <i v-if="t.pinned" class="bx bx-pin text-xl text-purple-400"></i>
            <span v-if="editID !== t.id" @click="$emit('edit-task', t)" class="w-full cursor-pointer select-none">{{ t.text }}</span>
            <input 
            v-else 
            v-model="localEditText" 
            class="w-full bg-transparent outline-none border-none focus:ring-0"
            @keyup.enter="$emit('edit-save', t, localEditText)"
            @blur="$emit('edit-save', t, localEditText)" 
            ref="editInput"
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
                @update:modelValue="$emit('edit-date', t, $event)"
                @pin-task="$emit('pin-task', t)"
                @set-priority="$emit('set-priority', t, $event)"
                @delete="$emit('delete-task', t.id)"
                :tags="tagsList" 
                @select-tag="(tag) => handleSelectTag(t, tag)"
                @update-tag="handleUpdateTag"
                @delete-tag="handleDeleteTag"
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