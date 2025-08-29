<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import TaskPopup from './TaskPopup.vue'
import draggable from 'vuedraggable'
import Taskshuffle from './Taskshuffle.vue'
import { useRoute } from 'vue-router'

const task = ref('')
const tasks = ref([])
const completedTasks = ref([])
const trashTasks = ref([])
const showCompleted = ref(true)
const dueDate = ref('')
const editID = ref(null)
const editText = ref('')
const editInput = ref(null)
const taskMenu = ref(null)
const newTaskPriority = ref('')
const showShuffle = ref(false)
const sortByDate = ref(false)
const sortByPriority = ref(false)
const sortByNone = ref(false)
const popupPosition = ref('bottom')

const props = defineProps({
  emptytask: { type: String, required: true },
  empty: String, 
  emptydis : String,
  title: String,
  mode: { type: String, default: 'today' }
})

const route = useRoute()
const routeMode = computed(() => {
  if (props.mode === 'inbox') return 'inbox'
  if (props.mode === 'next7') return 'next7'
  return 'today'
})

const pageTitle = computed(() => {
  if (props.title) return props.title
  switch (props.mode) {
    case 'today': return 'Today'
    case 'next7': return 'Next 7 Days'
    case 'inbox': return 'Inbox'
    case 'completed': return 'Completed'
    case 'trash': return 'Trash'
    default: return ''
  }
})

const today = new Date()
today.setHours(0,0,0,0)

const tasksToShow = computed(() => {
  if (props.mode === 'inbox') {
    return tasks.value 
  }

  if (props.mode === 'today') {
    return tasks.value.filter(t => {
      if (!t.dueDate) return false
      const taskDate = new Date(t.dueDate)
      return taskDate.toDateString() === today.toDateString()
    })
  }

  if (props.mode === 'next7') {
    const start = new Date(today)
    start.setDate(today.getDate() + 1)

    const end = new Date(today)
    end.setDate(today.getDate() + 8)

    return tasks.value.filter(t => {
      if (!t.dueDate) return false
      const taskDate = new Date(t.dueDate)
      return taskDate >= start && taskDate <= end
    })
  }
  if (props.mode === 'trash'){
    return trashTasks.value
  }

  return []
})

const showMainBlock = computed(() => {
  return props.mode !== 'completed' && props.mode !== 'trash'
})

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify({
    incomplete: tasks.value,
    complete: completedTasks.value,
    trash : trashTasks.value
  }))
}

function sortByDateFn(a, b) {
  if (!a.dueDate && !b.dueDate) return 0
  if (!a.dueDate) return 1
  if (!b.dueDate) return -1
  return new Date(a.dueDate) - new Date(b.dueDate)
}

function sortByPriorityFn(a, b) {
  const priorityOrder = { red: 1, yellow: 2, sky: 3, green: 4, "": 5 }
  return (priorityOrder[a.priority] || 5) - (priorityOrder[b.priority] || 5)
}

function sortByNoneFn(a,b){
  return 0;
}

function fetchTasks() {
  const stored = JSON.parse(localStorage.getItem('tasks') || '{}')
  tasks.value = stored.incomplete || []
  completedTasks.value = stored.complete || []
  trashTasks.value = stored.trash || []

  if (sortByDate.value) {
    tasks.value.sort(sortByDateFn)
    completedTasks.value.sort(sortByDateFn)
  } else if (sortByPriority.value) {
    tasks.value.sort(sortByPriorityFn)
    completedTasks.value.sort(sortByPriorityFn)
  } else if (sortByNone.value) {
    tasks.value.sort(sortByNoneFn)
    completedTasks.value.sort(sortByNoneFn)
  }
}

onMounted(fetchTasks)

function addTask() {
  if (!task.value.trim()) return
  tasks.value.push({
    id: Date.now(),
    text: task.value,
    dueDate: dueDate.value || '',
    completed: false,
    priority: newTaskPriority.value || ''
  })
  task.value = ''
  dueDate.value = ''
  newTaskPriority.value = ''
  saveTasks()
  fetchTasks()
}

function deleteTask(taskId) {
  const t = tasks.value.find(x => x.id === taskId) || completedTasks.value.find(x => x.id === taskId)
  if (t) {
    trashTasks.value.push({...t,deletedAt: new Date()})
  }
  tasks.value = tasks.value.filter(t => t.id !== taskId)
  completedTasks.value = completedTasks.value.filter(t => t.id !== taskId)
  saveTasks()
  fetchTasks()
}

function edit(t) {
  editID.value = t.id
  editText.value = t.text
}
function editSave(task, cancel = false) {
  if (cancel || editText.value.trim() === '') {
    editID.value = null
    editText.value = ''
    return
  }
  task.text = editText.value
  editID.value = null
  editText.value = ''
  saveTasks()
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

function completeTask(task) {
  const updatedTask = { ...task, completed: true }
  tasks.value = tasks.value.filter(t => t.id !== task.id)
  completedTasks.value.push(updatedTask)
  saveTasks()
}
function uncompleteTask(task) {
  const updatedTask = { ...task, completed: false }
  completedTasks.value = completedTasks.value.filter(t => t.id !== task.id)
  tasks.value.push(updatedTask)
  saveTasks()
}


function togglePopup(id, event) {
  taskMenu.value = taskMenu.value === id ? null : id
  if (event) {
    const top = event.target.getBoundingClientRect().top
    const screenHeight = window.innerHeight
    popupPosition.value = top < screenHeight / 2 ? 'bottom' : 'top'
  }
}
const closePopup = () => { taskMenu.value = null }

function toggleShuffle() {
  showShuffle.value = !showShuffle.value
}

function handleSelectType(type) {
  sortByDate.value = false
  sortByPriority.value = false
  sortByNone.value = false

  if (type === 'Date') sortByDate.value = true
  if (type === 'Priority') sortByPriority.value = true
  if (type === 'None') sortByNone.value = true

  fetchTasks()
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
function setPriority(task, color) {
  task.priority = color
  saveTasks()
  fetchTasks()
}
function togglePin(task) {
  task.pinned = !task.pinned
  tasks.value.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })
  saveTasks()
}

const selectTrash = ref(false)

function toggleselectTrash(){
  selectTrash.value = !selectTrash.value
  trashTasks.value.forEach(t => {t.isDeleted = selectTrash.value})
}

function restoreTasks() {
  const toRestore = trashTasks.value.filter(t => t.isDeleted)

  if (toRestore.length > 0) {
    toRestore.forEach(t => {
      if (t.completed) {
        completedTasks.value.push({ ...t, isDeleted: false })
      } else {
        tasks.value.push({ ...t, isDeleted: false })
      }
    })

    trashTasks.value = trashTasks.value.filter(t => !t.isDeleted)

    saveTasks()
  }
}

function deleteForever() {
  trashTasks.value = trashTasks.value.filter(t => !t.isDeleted)
  saveTasks()
}

const lists = ref([])
onMounted(() => {
  const savedLists = localStorage.getItem('myLists')
  if (savedLists) lists.value = JSON.parse(savedLists)
})
</script>

<template>
  <div class="w-3/5 h-screen">
    <div class="flex flex-col p-6 ">
      <div class="f-center justify-between p-2 mb-2 ">
        <p  class="text-2xl font-black text-stone-600">     {{ pageTitle}}</p>
        <div v-if="showMainBlock" class="text-stone-400 text-2xl">
          <button @click="toggleShuffle"><i class='bx  bx-shuffle'  ></i></button>
          <Taskshuffle v-if="showShuffle" class="absolute z-50" @selectType="handleSelectType"></Taskshuffle>
        </div>
      </div>
      <div v-if="showMainBlock " class="f-center justify-between bg-zinc-100 rounded-lg p-1 hover:bg-white border border-white focus-within:border-orange-300">
        <input type="text" v-model="task" @keyup.enter="addTask" placeholder="+ Add task" class="bg-transparent text-slate-500 outline-none"/>
        <input type="date" v-model="dueDate" locale="th" class="flex items-end ml-2 text-slate-500 bg-transparent outline-none border-none focus:ring-0" />
      </div>
    </div>
    <div v-if="showMainBlock " class="w-full h-3/6 overflow-y-auto pl-5 pr-14">
      <div v-if="tasksToShow.length" >
        <draggable :list="tasksToShow" item-key="id" class="space-y-2 " handle=".drag-handle"   :animation="200" ghost-class="drag-ghost" chosen-class="drag-chosen">
          <template #item="{ element: t }">
            <div class="w-full f-center">
              <button class="drag-handle icon-btn"><i class='bx bx-menu text-2xl'></i></button>
              <button @click="completeTask(t)"><i class='bx bx-checkbox checkbox'></i></button>
              <div class="task">
                <div class="flex items-center gap-4 ">
                  <i v-if="t.pinned" class="bx bx-pin text-xl text-purple-400"></i>
                  <span v-if="editID !== t.id" @click="edit(t)" class="w-full cursor-pointer select-none">{{ t.text }}</span>
                  <input v-else v-model="editText" class="w-full bg-transparent outline-none border-none focus:ring-0" @keyup.enter="editSave(t)" @blur="editSave(t)" ref="editInput"/>
                </div>
                <div v-if ="t.dueDate && !isNaN(new Date(t.dueDate).getTime()) " class="w-full flex justify-end pr-4" >
                  {{ new Date(t.dueDate).toLocaleDateString('th-TH',{day:'numeric', month:'short',year:'numeric'}) }}</div>
                <i v-if="t.priority" :class="flagClass(t.priority)"></i>
              </div>
              <div class="relative">
                <button @click="(e) => togglePopup(t.id,e)">
                  <i class='bx bx-dots-horizontal-rounded text-2xl text-zinc-300 ml-3'></i>
                </button>
                <div v-if="taskMenu === t.id" @click.self="closePopup" class="absolute z-50 right-12" :class="[popupPosition === 'top' ? 
                'bottom-full mb-2' : 'top-full mt-2' ,'right-0']">
                  <TaskPopup v-model="t.dueDate" @update:modelValue="(newDate) => editDate(t,newDate)"  @pin-task="togglePin(t)" 
                    @set-priority="(color) => setPriority(t, color)" @delete="deleteTask(t.id)" :lists="lists"/>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
      <div v-else class="flex flex-col text-center items-center justify-center w-full h-full">
            <img :src="emptytask" alt="Empty Inbox" class="w-64 h-auto object-contain opacity-50"/>
            <h1 class="font-semibold text-stone-500">{{empty}}</h1>
            <p class="text-stone-400">{{ emptydis }}</p>
      </div>
    </div>
    <div v-if="props.mode !== 'trash'" class="h-2/6 pl-5 overflow-y-auto">
      <div class="f-center" @click="showCompleted = !showCompleted">
        <i :class="showCompleted ? 'bx bx-chevron-down text-2xl' : 'bx bx-chevron-right text-2xl'"></i>
        <h1>{{ showCompleted ? 'Hide Completed' : 'Show Completed' }} ({{ completedTasks.length }})</h1>
      </div>
      <div v-show="showCompleted" class="space-y-2">
        <draggable v-model="completedTasks" item-key="id" class="space-y-2" handle=".drag-handle"   
          :animation="200" ghost-class="drag-ghost" chosen-class="drag-chosen">
          <template #item="{ element: t }">
            <div :key="t.id" class="f-center">
              <button class="drag-handle icon-btn">
                <i class='bx bx-menu text-2xl'></i>
              </button>
              <button @click="uncompleteTask(t)">
                <i class='bx bx-checkbox-checked checkbox'></i>
              </button>
              <span class="line-through text-lg">{{ t.text }}</span>
            </div>
          </template>
        </draggable>
      </div>
      <div v-if="props.mode == 'completed' && completedTasks.length === 0" class="flex flex-col text-center items-center justify-center w-full h-5/6">
        <img :src="emptytask" alt="Empty Inbox" class="w-64 h-auto object-contain opacity-50"/>
        <h1 class="font-semibold text-stone-500">{{empty}}</h1>
        <p class="text-stone-400">{{ emptydis }}</p>
      </div>
    </div>
    <div v-if="props.mode == 'trash'" class="flex flex-col space-y-2 w-full  p-5">
      <div class="f-center justify-between" >
        <div class="f-center gap-2">
          <button @click="toggleselectTrash"><i :class="selectTrash ? 'bx bx-checkbox-checked checkbox' : 'bx bx-checkbox checkbox'"></i></button>
          <p class="text-lg text-stone-500">All</p>
        </div>
        <div class="f-center gap-2">
          <button @click="restoreTasks"><i class='bx bx-undo text-3xl text-zinc-400'></i> </button>
          <button @click="deleteForever"><i class='bx  bx-trash text-2xl text-zinc-400'  ></i> </button>
        </div>
      </div>
      <div v-for="t in trashTasks" :key="t.id" class="f-center">
        <button @click="t.isDeleted = !t.isDeleted"><i :class="t.isDeleted ? 'bx bx-checkbox-checked checkbox' : 'bx bx-checkbox checkbox'"></i></button>
        <span class="text-lg text-stone-500">{{ t.text }}</span>
      </div>
      <div v-if="trashTasks.length === 0" class="flex flex-col text-center items-center justify-center w-full h-full">
        <img :src="emptytask" alt="Empty Trash" class="w-64 h-auto object-contain opacity-50"/>
        <h1 class="font-semibold text-stone-500">{{empty}}</h1>
        <p class="text-stone-400">{{ emptydis }}</p>
      </div>
    </div>
  </div>
  <div class="w-1/4 h-screen flex">
    <div class="h-screen w-px bg-zinc-300 "></div>
    <img src="/src/assets/RightBG.png" class="h-screen">
  </div>
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
.f-center{
  @apply flex items-center;
}
.icon-btn {
  @apply flex items-center text-zinc-300 cursor-pointer;
}
</style>