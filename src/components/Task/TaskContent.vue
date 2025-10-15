<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { supabase } from '../../supabase/supabase'

import Createtask from './ContentLayout/Createtask.vue'
import TaskList from './ContentLayout/TaskList.vue'
import CompletedTasks from './ContentLayout/Completetask.vue'
import Rightcontent from './ContentLayout/Rightcontent.vue'

import Taskshuffle from './Taskshuffle.vue'
import Emptytask from './ContentLayout/Emptytask.vue'
import Trashpage from './ContentLayout/Trashpage.vue'

//state
const tasks = ref([])
const loading = ref(false)
const completedTasks = ref([])
const editID = ref(null)
const editText = ref('')
const editInput = ref(null)
const trashTasks = ref([])
const showShuffle = ref(false)
const currentSortType = ref('None')

const emit = defineEmits(['selectTag'])

async function fetchTasks() {
  loading.value = true
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('id', { ascending: false })

  if (!error && data) {
    tasks.value = data.filter(t => !t.completed && !t.is_trashed).map(mapTask)
    completedTasks.value = data.filter(t => t.completed && !t.is_trashed).map(mapTask)
    trashTasks.value = data.filter(t => t.is_trashed).map(mapTask)
  } else {
    console.error(error)
  }
  loading.value = false
}

function handleTaskAdded(newTask) {
  tasks.value.unshift(mapTask(newTask)) 
}

function mapTask(task) {
  return {
    id: task.id,
    title: task.title,
    dueDate: task.due_date,
    completed: task.completed,
    pinned: task.pinned,
    priority: task.priority,
    tagId: task.tag_id
  }
}

async function completeTask(task) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ completed: true }) 
    .eq('id', task.id)
    .select()

  if (!error) {
    tasks.value = tasks.value.filter(t => t.id !== task.id)
    completedTasks.value.push(mapTask(data[0]))
  }
}

async function uncompleteTask(task) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ completed: false })
    .eq('id', task.id)
    .select()

  if (!error) {
    completedTasks.value = completedTasks.value.filter(t => t.id !== task.id)
    tasks.value.push(mapTask(data[0]))
  }
}

function edit(task) {
  editID.value = task.id
  editText.value = task.text
}

onMounted(fetchTasks)

//Props
const props = defineProps({
  emptytask: String,
  empty: String,
  emptydis: String,
  title: String,
  mode: { type: String, default: 'inbox' }
})

function isTaskInMode(task) {
  if (!task.dueDate) return props.mode === 'inbox'; // Inbox แสดง task ที่ไม่มี dueDate

  const taskDate = new Date(task.dueDate);
  taskDate.setHours(0,0,0,0); // reset เวลา

  const today = new Date();
  today.setHours(0,0,0,0);

  if (props.mode === 'today') {
    return taskDate.getTime() === today.getTime();
  }

  if (props.mode === 'next7') {
    const start = new Date(today);
    start.setDate(start.getDate() + 1); // พรุ่งนี้
    const end = new Date(today);
    end.setDate(end.getDate() + 7); // 7 วันถัดไป
    return taskDate >= start && taskDate <= end;
  }

  if (props.mode === 'inbox') return true; // Inbox แสดงทั้งหมด

  return false;
}


const pageTitle = computed(() => {
  if (props.title) return props.title
  switch (props.mode) {
    case 'today': return 'Today'
    case 'next7': return 'Next 7 Days'
    case 'inbox': return 'Inbox'
    case 'completed' : return 'Completed'
    case 'trash' : return 'Trash'
    default: return ''
  }
})

//Pageshow
const today = new Date()
today.setHours(0,0,0,0)

function isShowDatepage() {
  return props.mode !== 'completed' && props.mode !== 'trash'
}


function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify({
    incomplete: tasks.value,
    complete: completedTasks.value,
    trash: trashTasks.value
  }))
  localStorage.setItem('myTags', JSON.stringify(tags.value || []))
}

async function deleteTask(taskId) {
  const t = tasks.value.find(x => x.id === taskId) || completedTasks.value.find(x => x.id === taskId)
  if (!t) return

  const { data, error } = await supabase
    .from('tasks')
    .update({ is_trashed: true }) 
    .eq('id', taskId)
    .select()

  if (!error) {
    tasks.value = tasks.value.filter(t => t.id !== taskId)
    completedTasks.value = completedTasks.value.filter(t => t.id !== taskId)
    trashTasks.value.push(data[0])
  }
}


async function editSave(task, newText, cancel = false) {
  if (cancel || newText.trim() === '') {
    editID.value = null
    editText.value = ''
    return
  }

  const { data, error } = await supabase
    .from('tasks')
    .update({ title: newText })
    .eq('id', task.id)
    .select()

  if (!error) Object.assign(task, data[0])
  editID.value = null
  editText.value = ''
}

watch(editID, async (newvalue) => {
  if (newvalue !== null) {
    await nextTick()
    editInput.value?.focus()
  }
})

function editDate(task, newDate) {
  task.dueDate = newDate
  saveTasks()
  fetchTasks()
}

function toggleShuffle() {
  showShuffle.value = !showShuffle.value
}

function sortByDateFn(a, b) {
  if (!a.dueDate && b.dueDate) return 1
  if (a.dueDate && !b.dueDate) return -1
  if (!a.dueDate && !b.dueDate) return 0
  return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
}

function sortByPriorityFn(a, b) {
  const priorityOrder = { red: 1, yellow: 2, sky: 3, green: 4, "": 5 }
  return (priorityOrder[a.priority] || 5) - (priorityOrder[b.priority] || 5)
}

function handleSelectType(type) {
  currentSortType.value = type
  tasksForDraggableMutable.value = [...tasksForDraggableMutable.value]
}

async function editTaskPinned(task) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ pinned: !task.pinned })
    .eq('id', task.id)
    .select()

  if (!error && data) {
    task.pinned = data[0].pinned
    saveTasks()
  }
}

async function setPriority(task, priority) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ priority })
    .eq('id', task.id)
    .select()

  if (!error && data) {
    // อัปเดต priority ใน tasks array ของ frontend
    const t = tasks.value.find(t => t.id === task.id)
    if (t) t.priority = data[0].priority

    // อัปเดต priority ใน completedTasks ถ้าอยู่ในนั้น
    const ct = completedTasks.value.find(t => t.id === task.id)
    if (ct) ct.priority = data[0].priority

    saveTasks()
  }
}


const tags = ref([])

async function fetchTags() {
  const { data, error } = await supabase.from('tags').select('*')
  if (!error && data) {
    tags.value = data
    localStorage.setItem('myTags', JSON.stringify(tags.value))
  }
}
onMounted(() => {
  fetchTasks()
  fetchTags()
})



function handleSelectTag(task, tag) {
  const taskIndex = tasks.value.findIndex(t => t.id === task.id)
  if (taskIndex !== -1) {
    tasks.value[taskIndex].tagId = tag.id
    saveTasks()
  }
}

const selectTrash = ref(false)

function toggleselectTrash(){
  selectTrash.value = !selectTrash.value
  trashTasks.value.forEach(t => {t.isDeleted = selectTrash.value})
}

async function restoreTasks() {
  const toRestore = trashTasks.value.filter(t => t.isDeleted)

  for (let task of toRestore) {
    const { data, error } = await supabase
      .from('tasks')
      .update({ is_trashed: false }) 
      .eq('id', task.id)
      .select()

    if (!error) {
      trashTasks.value = trashTasks.value.filter(t => t.id !== task.id)
      if (task.completed) completedTasks.value.push(data[0])
      else tasks.value.push(data[0])
    }
  }
}

async function deleteForever() {
  // เลือก task ที่ถูกติ๊กเพื่อลบ
  const toDelete = trashTasks.value.filter(t => t.isDeleted)

  if (toDelete.length === 0) return

  // ลบจาก Supabase
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .in('id', toDelete.map(t => t.id))

  if (error) {
    console.error('Error deleting tasks forever:', error)
    return
  }

  // ลบออกจาก trashTasks ใน frontend
  trashTasks.value = trashTasks.value.filter(t => !t.isDeleted)
  saveTasks()
}

const tasksForDraggableMutable = computed({
  get() {
    let filteredTasks = tasks.value.filter(t => isTaskInMode(t))

    const pinnedSort = (a, b) => (a.pinned && !b.pinned ? -1 : !a.pinned && b.pinned ? 1 : 0)
    const sortByDateFn = (a, b) => {
      if (!a.dueDate && b.dueDate) return 1
      if (a.dueDate && !b.dueDate) return -1
      if (!a.dueDate && !b.dueDate) return 0
      return new Date(a.dueDate) - new Date(b.dueDate)
    }
    const sortByPriorityFn = (a, b) => {
      const priorityOrder = { red: 1, yellow: 2, sky: 3, green: 4, "": 5 }
      return (priorityOrder[a.priority] || 5) - (priorityOrder[b.priority] || 5)
    }
    const sortByTagFn = (a, b) => {
      if (!a.tagId && b.tagId) return 1
      if (a.tagId && !b.tagId) return -1
      if (!a.tagId && !b.tagId) return 0
      return a.tagId - b.tagId
    }

    // เลือก sort ตาม type ที่เลือก
    switch (currentSortType.value) {
      case 'Date':
        filteredTasks.sort((a, b) => pinnedSort(a, b) || sortByDateFn(a, b))
        break
      case 'Priority':
        filteredTasks.sort((a, b) => pinnedSort(a, b) || sortByPriorityFn(a, b))
        break
      case 'Tag':
        filteredTasks.sort((a, b) => pinnedSort(a, b) || sortByTagFn(a, b))
        break
      default:
        filteredTasks.sort((a, b) => pinnedSort(a, b) || b.id - a.id)
    }

    return filteredTasks
  },
  set(newVal) {
    const otherTasks = tasks.value.filter(t => !isTaskInMode(t))
    tasks.value = [...newVal, ...otherTasks]
    saveTask
  }
})
</script>

<template>
  <div class="w-[57%] h-screen pl-5">
    <div class="flex flex-col p-6 "
    :class="props.mode == 'completed' || props.mode == 'trash' ? 'h-[12%]' : 'h-[16%]'">
      <div class="flex items-center justify-between p-2 mb-2 ">
        <p  class="text-2xl font-black text-stone-600">     {{ pageTitle}}</p>
        <div v-if="isShowDatepage()" class="text-stone-400 text-2xl relative">
          <button @click="toggleShuffle">
            <i class='bx  bx-shuffle'  ></i>
          </button>
          <Taskshuffle 
          v-if="showShuffle" 
          class="absolute z-50"
          :selectedType="currentSortType"
          @selectType="handleSelectType"
          />
        </div>
      </div>
      <!-- Create Task -->
      <div v-if="isShowDatepage()">
        <Createtask @add-task="handleTaskAdded"/>
        <div v-if="loading" class="mt-4 text-gray-500">Loading tasks...</div>
      </div>
    </div>
    <!-- DatePage -->
    <div v-if="isShowDatepage()" class="h-[84%]">
      <div class="w-full overflow-y-auto  pr-14"
      :class="completedTasks.length > 0 ? 'h-[50%]' : 'h-[100%]'">
        <!-- TaskLists -->
        <div v-show="tasksForDraggableMutable.length > 0" >
          <TaskList 
          :mode="props.mode"
          :tasks="tasksForDraggableMutable"  
          :editID="editID" 
          :editText="editText" 
          :tags="tags" 
          @pin-task="editTaskPinned"
          @update:tasks="tasksForDraggableMutable = $event" 
          @edit-task="edit" 
          @edit-date="editDate" 
          @edit-save="editSave" 
          @complete-task="completeTask" 
          @set-priority="setPriority" 
          @delete-task="deleteTask" 
          @select-tag="handleSelectTag"
          />
        </div>
        <Emptytask 
        v-show="tasksForDraggableMutable.length === 0" 
        :emptytask="emptytask" 
        :empty="empty" 
        :emptydis="emptydis"
        />
      </div>
      <!-- Complete -->
      <div v-if="completedTasks.length > 0" class="w-full h-[50%]">
        <CompletedTasks 
        :completedTasks="completedTasks" 
        @uncomplete-task="uncompleteTask"  
        @saveTasks="saveTasks"
        />
      </div>
    </div>
    
    <!-- CompletePage -->
    <div v-if="props.mode == 'completed'" class="w-full h-[84%]">
      <div v-if="completedTasks.length > 0" class="h-full pl-6">
        <CompletedTasks 
        :completedTasks="completedTasks" 
        @uncomplete-task="uncompleteTask"  
        @saveTasks="saveTasks"
        />
      </div>
      <div v-else class="h-full">
        <Emptytask 
        :emptytask="emptytask" 
        :empty="empty" 
        :emptydis="emptydis"
        />
      </div>
    </div>

    <!-- TrashPage -->
    <div v-if="props.mode == 'trash'" class="w-full h-[84%]">
      <div v-if="trashTasks.length > 0" class="h-full pl-6">
        <Trashpage 
        :trashTasks="trashTasks" 
        :selectTrash="selectTrash" 
        @toggleselectTrash="toggleselectTrash" 
        @restoreTasks="restoreTasks" 
        @deleteForever="deleteForever"
        />
      </div>
      <div v-else class="h-full">
        <Emptytask 
        :emptytask="emptytask" 
        :empty="empty" 
        :emptydis="emptydis"
        />
      </div>
    </div>
  </div>
  <div class="h-screen flex">
    <Rightcontent/>
  </div>
</template>