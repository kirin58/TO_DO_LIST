<script setup>
import { ref, onMounted  } from 'vue';
import { collection, getDocs, addDoc, updateDoc ,deleteDoc, doc ,query , where} from 'firebase/firestore'
import { db } from '@/firebase'
import TaskPopup from './TaskPopup.vue';
import draggable from 'vuedraggable'
import Taskshuffle from './Taskshuffle.vue';
import { watch,nextTick } from 'vue';

defineProps({
    emptytask : String
})
const task = ref('')
const dueDate = ref('')
const tasks = ref([])
const completedTasks = ref([])
const taskMenu = ref(null)
const showShuffle = ref(false) 
//add
async function addTask() {
  if (!task.value.trim()) return
  await addDoc(collection(db, 'tasks'), {
    text: task.value,
    dueDate: dueDate.value,
    completed:false,
    priority: '',
    createdAt: new Date()
  })
  task.value = ''
  fetchTasks()
}

async function fetchTasks() {
  const incompleteQuery = query(collection(db, 'tasks'), where('completed', '!=', true))
  const completeQuery = query(collection(db, 'tasks'), where('completed', '==', true))

  const incompleteSnap = await getDocs(incompleteQuery)
  const completeSnap = await getDocs(completeQuery)

  tasks.value = incompleteSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  completedTasks.value = completeSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

//delete
async function deleteTask(taskId) {
  await deleteDoc(doc(db, 'tasks', taskId))
  fetchTasks()
}
onMounted(async () => {
  fetchTasks()
})

//edit
const editID = ref(null)
const editText = ref('')

function edit(task){
  editID.value = task.id
  editText.value = task.text
}
async function editSave(task,cancle = false) {
  if (cancle || editText.value.trim() === ''){
    editID.value = null
    editText.value = ''
    return
  }
  const taskDocRef = doc(db,'tasks',task.id)
  await updateDoc(taskDocRef,{
    text: editText.value
  })
  editID.value = null
  editText.value = ''
  fetchTasks()
}
const editInput = ref(null)

//editวันที่
watch(editID, async(newvalue) => {
  if (newvalue !== null) {
    await nextTick()
    editInput.value?.focus()
  }
})

async function editDate(task,newDate){
  const taskDocRef = doc(db,'tasks',task.id)
  await updateDoc(taskDocRef,{
    dueDate: newDate
  })
  task.dueDate = newDate
}

//complete
async function completeTask(task) {
  const taskDocRef = doc(db, 'tasks', task.id)
  await updateDoc(taskDocRef, {
    completed: true
  })
  fetchTasks()
}
async function uncompleteTask(task) {
  const taskDocRef = doc(db, 'tasks', task.id)
  await updateDoc(taskDocRef, {
    completed: false
  })
  fetchTasks()
}

function togglePopup(id,event) {
  taskMenu.value = taskMenu.value === id ? null : id
  if(event){
    const top = event.target.getBoundingClientRect().top
    const screenHeight = window.innerHeight
    popupPosition.value = top < screenHeight / 2 ? 'bottom' : 'top'
  }
}
const closePopup = () => {
  taskMenu.value = null
}
function toggleShuffle() {
  showShuffle.value = !showShuffle.value
}

//ธง
function flagClass(priority) {
  switch(priority) {
    case 'red': return 'bx bx-flag text-red-500 text-xl'
    case 'yellow': return 'bx bx-flag text-yellow-300 text-xl'
    case 'sky': return 'bx bx-flag text-sky-500 text-xl'
    case 'green': return 'bx bx-flag text-green-400 text-xl'
    default: return ''
  }
}
async function setPriority(task, color) {
  const taskDocRef = doc(db, 'tasks', task.id)
  await updateDoc(taskDocRef, { priority: color })
  fetchTasks()
}

</script>
<template>
  <div class="w-3/5 h-screen">
    <div class="flex flex-col p-6 ">
      <div class="f-center justify-between p-2 mb-2 ">
        <p class="text-2xl font-black text-stone-600">Inbox</p>
        <div class="w-1/2 flex justify-end gap-4 text-stone-400 text-2xl">
          <div>
            <button @click="toggleShuffle"><i class='bx  bx-shuffle'  ></i></button>
            <Taskshuffle v-if="showShuffle" class="absolute z-50"></Taskshuffle>
          </div>
          <button><i class='bx  bx-dots-horizontal-rounded'  ></i></button>
        </div>
      </div>
      <div class="f-center bg-zinc-100 rounded-lg p-1 hover:bg-white border border-white focus-within:border-orange-300">
        <input type="text" v-model="task" @keyup.enter="addTask" placeholder="+ Add task" class="flex-1 bg-transparent text-slate-500 outline-none"/>
        <input type="date" v-model="dueDate" locale="th" class="ml-2 text-slate-500 bg-transparent outline-none border-none focus:ring-0" />
        <i class='bx  bx-chevron-down text-3xl'  ></i> 
      </div>
    </div>
    <div class="w-full h-3/6 overflow-y-auto pl-5 pr-14">
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