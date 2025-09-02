<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import TaskList from './ContentLayout.vue/TaskList.vue'
import Taskshuffle from './Taskshuffle.vue'
import { useRoute } from 'vue-router'
import Rightcontent from './ContentLayout.vue/Rightcontent.vue'
import Createtask from './ContentLayout.vue/Createtask.vue'
import CompletedTasks from './ContentLayout.vue/Completetask.vue'
import Emptytask from './ContentLayout.vue/Emptytask.vue'

//state
const tasks = ref([])
const completedTasks = ref([])
const showShuffle = ref(false)
const trashTasks = ref([])
const editID = ref(null)
const editText = ref('')
const editInput = ref(null)
const sortByDate = ref(false)
const sortByPriority = ref(false)

const props = defineProps({
  emptytask: String,
  empty: String,
  emptydis: String,
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

  return []
})

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify({
    incomplete: tasks.value,
    complete: completedTasks.value,
    trash: trashTasks.value
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

function fetchTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    const parsed = JSON.parse(saved);
    tasks.value = parsed.incomplete || [];
    completedTasks.value = parsed.complete || [];
    trashTasks.value = parsed.trash || [];
  }
}


onMounted(() => {
  fetchTasks()
})


function addTask(newTask) {
  tasks.value.push(newTask)
  saveTasks()
}

function deleteTask(taskId) {
  const t = tasks.value.find(x => x.id === taskId) || completedTasks.value.find(x => x.id === taskId)
  if (t) {
    trashTasks.value.push({...t,deletedAt: new Date()})
  }
  tasks.value = tasks.value.filter(t => t.id !== taskId)
  completedTasks.value = completedTasks.value.filter(t => t.id !== taskId)
  saveTasks()
}

function edit(t) {
  editID.value = t.id
  editText.value = t.text
}
function editSave(task, newText, cancel = false) {
  if (cancel || newText.trim() === '') {
    editID.value = null
    editText.value = ''
    return
  }
  task.text = newText
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
  tasks.value = tasks.value.filter(t => t.id !== task.id)
  if (!completedTasks.value.find(t => t.id === task.id)) {
    completedTasks.value.push(task)
  }
  saveTasks()  
}

function uncompleteTask(task) {
  completedTasks.value = completedTasks.value.filter(t => t.id !== task.id)
  if (!tasks.value.find(t => t.id === task.id)) {
    tasks.value.push(task)
  }

  tasks.value.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })

  saveTasks()
}

function toggleShuffle() {
  showShuffle.value = !showShuffle.value
}

function handleSelectType(type) {
  sortByDate.value = type === 'Date'
  sortByPriority.value = type === 'Priority'

  let sorted = [...tasksForDraggable.value]

  if (sortByDate.value) sorted.sort(sortByDateFn)
  else if (sortByPriority.value) sorted.sort(sortByPriorityFn)
}


function setPriority(task, color) {
  task.priority = color
  saveTasks()
  fetchTasks()
}

function togglePin(task) {
  const index = tasks.value.findIndex(t => t.id === task.id);
  if (index !== -1) {
    tasks.value[index] = { ...tasks.value[index], pinned: !tasks.value[index].pinned };
    tasks.value.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
  }
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

//mode

function isTaskInMode(task) {
  if (props.mode === 'inbox') return true;
  if (props.mode === 'today') {
    if (!task.dueDate) return false;
    return new Date(task.dueDate).toDateString() === today.toDateString();
  }
  if (props.mode === 'next7') {
    const start = new Date(today);
    start.setDate(today.getDate() + 1);
    const end = new Date(today);
    end.setDate(today.getDate() + 8);
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return taskDate >= start && taskDate <= end;
  }
  return false;
}

const tasksForMode = computed(() => tasks.value.filter(t => isTaskInMode(t)))

const tasksForDraggableMutable = computed({
  get() {
    let result = tasks.value.filter(t => isTaskInMode(t))
    if (sortByDate.value) result.sort(sortByDateFn)
    else if (sortByPriority.value) result.sort(sortByPriorityFn)
    return result
  },
  set(newVal) {
    const otherTasks = tasks.value.filter(t => !isTaskInMode(t))
    tasks.value = [...newVal, ...otherTasks]
    saveTasks()
  }
})

const sortedTasks = computed(() => {
  let result = [...tasksForDraggable.value]
  if (sortByDate.value) result.sort(sortByDateFn)
  else if (sortByPriority.value) result.sort(sortByPriorityFn)
  return result
})

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
        <p  class="text-2xl font-black text-stone-600">     {{ pageTitle}}</p>
        <div class="text-stone-400 text-2xl">
          <button @click="toggleShuffle"><i class='bx  bx-shuffle'  ></i></button>
          <Taskshuffle v-if="showShuffle" class="absolute z-50" @selectType="handleSelectType"></Taskshuffle>
        </div>
      </div>
      <!-- Create Task -->
      <div>
        <Createtask @add-task="addTask"></Createtask>
      </div>
    </div>
    <div class="w-full h-3/6 overflow-y-auto pl-5 pr-14">
      <!-- TaskLists -->
      <div v-show="tasksForDraggableMutable.length > 0" >
        <TaskList :key="props.mode" :tasks="tasksForDraggableMutable" 
        :editID="editID" :editText="editText" :lists="lists"
        @update:tasks="tasks = $event"
        @complete-task="completeTask" @edit-task="edit"
        @edit-save="editSave" @edit-date="editDate"
        @pin-task="togglePin" @set-priority="setPriority" @delete-task="deleteTask"/>
      </div>
      <Emptytask v-show="tasksForDraggableMutable.length === 0" :emptytask="emptytask" :empty="empty" :emptydis="emptydis"/>
    </div>
    <!-- Complete -->
    <div v-if="completedTasks.length > 0">
      <CompletedTasks :completedTasks="completedTasks" @uncomplete-task="uncompleteTask"  @saveTasks="saveTasks"/>
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
    </div>
  </div>
  <div class="h-screen flex">
    <Rightcontent></Rightcontent>
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
/* เดี๋ยวลบ */
.f-center{
  @apply flex items-center;
}
.icon-btn {
  @apply flex items-center text-zinc-300 cursor-pointer;
}
</style>