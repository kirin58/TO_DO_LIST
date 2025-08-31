<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import TaskPopup from './TaskPopup.vue'
import draggable from 'vuedraggable'
import Taskshuffle from './Taskshuffle.vue'

defineProps({
  emptytask: String
})

const task = ref('')
const tasks = ref([])
const completedTasks = ref([])
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

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify({
    incomplete: tasks.value,
    complete: completedTasks.value
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
  task.completed = true
  tasks.value = tasks.value.filter(t => t.id !== task.id)
  completedTasks.value.push(task)
  saveTasks()
}
function uncompleteTask(task) {
  task.completed = false
  completedTasks.value = completedTasks.value.filter(t => t.id !== task.id)
  tasks.value.push(task)
  saveTasks()
  fetchTasks()
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
  <div class="w-[57%] h-screen">
    <div class="flex flex-col p-6 ">
      <div class="f-center justify-between p-2 mb-2 ">
        <p class="text-2xl font-black text-stone-600">Inbox</p>
        <div class="text-stone-400 text-2xl">
          <button @click="toggleShuffle"><i class='bx  bx-shuffle'  ></i></button>
          <Taskshuffle v-if="showShuffle" class="absolute z-50" @selectType="handleSelectType"></Taskshuffle>
        </div>
      </div>
      <div class="f-center bg-zinc-100 rounded-lg p-1 hover:bg-white border border-white focus-within:border-orange-300">
        <input type="text" v-model="task" @keyup.enter="addTask" placeholder="+ Add task" class="w-3/5 bg-transparent text-slate-500 outline-none"/>
        <i v-if="newTaskPriority" :class="flagClass(newTaskPriority)" class="w-1/5 ml-2"></i>
        <input type="date" v-model="dueDate" locale="th" class="w-1/5 flex items-end ml-2 text-slate-500 bg-transparent outline-none border-none focus:ring-0" />
        <div class="relative">
          <button @click="(e) => togglePopup('new',e)">
            <i class='bx  bx-chevron-down text-3xl'  ></i> 
          </button>
          <div v-if="taskMenu === 'new'" @click.self="closePopup" class="absolute z-99" 
          :class="[popupPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2', 'right-0']"> 
            <TaskPopup isNew @set-priority="(color) => { newTaskPriority.value = color; closePopup(); }" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-3/5 overflow-y-auto pl-5 pr-14">
      <div v-if="tasks.length" >
        <draggable v-model="tasks" item-key="id" class="space-y-2 " handle=".drag-handle"   :animation="200" ghost-class="drag-ghost" chosen-class="drag-chosen">
          <template #item="{ element: t }">
            <div class="w-full f-center">
              <button class="drag-handle icon-btn"><i class='bx bx-menu text-2xl'></i></button>
              <button @click="completeTask(t)"><i class='bx bx-checkbox checkbox'></i></button>
              <div class="task">
                <span v-if="editID !== t.id" @click="edit(t)" class="w-full cursor-pointer select-none">{{ t.text }}</span>
                <input v-else v-model="editText" class="w-full bg-transparent outline-none border-none focus:ring-0" @keyup.enter="editSave(t)" @blur="editSave(t)" ref="editInput"/>
                <div v-if ="t.dueDate && !isNaN(new Date(t.dueDate).getTime()) " class="w-full flex justify-end pr-4" >
                  {{ new Date(t.dueDate).toLocaleDateString('th-TH',{day:'numeric', month:'short',year:'numeric'}) }}</div>
                <i v-if="t.priority" :class="flagClass(t.priority)"></i>
              </div>
              <div class="relative">
                <button @click="(e) => togglePopup(t.id,e)">
                  <i class='bx bx-dots-horizontal-rounded text-2xl text-zinc-300 ml-3'></i>
                </button>
                <div v-if="taskMenu === t.id" @click.self="closePopup" class="absolute z-50" :class="popupPosition === 'top' ? 
                'bottom-full mb-2' : 'top-full mt-2' ,'right-0'">
                  <TaskPopup v-model="t.dueDate" @update:modelValue="(newDate) => editDate(t,newDate)" 
                    @set-priority="(color) => setPriority(t, color)" @delete="deleteTask(t.id)"/>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
      <div v-else class="f-center h-full justify-center ">
            <img :src="emptytask" alt="Empty Inbox" class="w-64 h-auto object-contain opacity-50"/>
      </div>
    </div>
    <div class="pl-5">
      <div class="f-center">
        <i class='bx  bx-chevron-down text-2xl'  ></i> 
        <h1>Completed</h1>
      </div>
      <div v-if="completedTasks.length" class="space-y-2">
        <div  v-for="t in completedTasks" :key="t.id" class="f-center" >
          <button @click="uncompleteTask(t)"><i class='bx  bx-checkbox-checked checkbox'></i> </button>
          <span class="line-through text-lg">{{ t.text }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="h-screen flex justify-end">
    <div class="h-screen w-px bg-zinc-300 "></div>
    <img src="/src/assets/RightBG.png" class="h-screen ">
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