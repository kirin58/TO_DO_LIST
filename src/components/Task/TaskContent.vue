<script setup>
import { ref, onMounted  } from 'vue';
import { collection, getDocs, addDoc, updateDoc , doc } from 'firebase/firestore'
import { db } from '@/firebase'
import TaskPopup from './TaskPopup.vue';
import draggable from 'vuedraggable'
import { watch,nextTick } from 'vue';

defineProps({
    title: String,
    emptytask : String
})
const task = ref('')
const dueDate = ref('')
const tasks = ref([])

async function addTask() {
  if (!task.value.trim()) return
  await addDoc(collection(db, 'tasks'), {
    text: task.value,
    dueDate: dueDate.value,
    createdAt: new Date()
  })
  task.value = ''
  fetchTasks()
}

async function fetchTasks() {
  const querySnapshot = await getDocs(collection(db, 'tasks'))
  tasks.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}
onMounted(async () => {
  fetchTasks()
})

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

const taskMenu = ref(null)

const togglePopup = (id) => {
  taskMenu.value = taskMenu.value === id ? null : id
}
const closePopup = () => {
  taskMenu.value = null
}
</script>
<template>
  <div class="w-3/5 min-h-screen">
    <div class="flex flex-col p-6 ">
      <div class="flex items-center p-2 mb-2 justify-between">
        <p class="text-2xl font-black text-stone-600">{{ title }}</p>
        <div class="w-1/2 flex justify-end gap-4 text-stone-400 text-2xl">
          <button><i class='bx  bx-shuffle'  ></i></button>
          <button><i class='bx  bx-dots-horizontal-rounded'  ></i></button>
        </div>
      </div>
      <div class="flex items-center bg-zinc-100 rounded-lg p-1 hover:bg-white border border-white focus-within:border-orange-300">
        <input type="text" v-model="task" @keyup.enter="addTask" placeholder="+ Add task" class="flex-1 bg-transparent text-slate-500 outline-none"/>
        <input type="date" v-model="dueDate" locale="th" class="ml-2 text-slate-500 bg-transparent outline-none border-none focus:ring-0" />
        <i class='bx  bx-chevron-down text-3xl'  ></i> 
      </div>
    </div>
    <div class="w-full h-5/6 overflow-y-auto p-5 pr-14">
      <div v-if="tasks.length" >
        <draggable v-model="tasks" item-key="id" class="space-y-2 " handle=".drag-handle"   :animation="200" ghost-class="drag-ghost" chosen-class="drag-chosen">
          <template #item="{ element: t }">
            <div class="w-full flex items-center ">
              <button class="drag-handle"><i class='bx bx-menu text-xl text-zinc-300'></i></button>
              <button><i class='bx bx-checkbox text-4xl text-zinc-300'></i></button>
              <div class="w-full flex justify-between p-2 border-b border-gray-300 mb-2 text-black text-lg focus-within:border-orange-300 ">
                <div v-if="editID !== t.id" @click="edit(t)" class="w-ful cursor-pointer select-none">{{ t.text }}</div>
                <input v-else v-model="editText" class="w-full bg-transparent outline-none border-none focus:ring-0" @keyup.enter="editSave(t)" @blur="editSave(t)" ref="editInput"/>
                <div v-if="t.dueDate">{{ new Date(t.dueDate).toLocaleDateString('th-TH',{day:'numeric', month:'short',year:'numeric'}) }}</div>
              </div>
              <div>
                <button @click="() => togglePopup(t.id)">
                  <i class='bx bx-dots-horizontal-rounded text-2xl text-zinc-300 ml-3'></i>
                </button>
                <div v-if="taskMenu === t.id" @click.self="closePopup" class="absolute">
                  <TaskPopup v-model="t.dueDate" @update:modelValue="(newDate) => editDate(t,newDate)" />
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
          <div v-else class="flex items-center justify-center h-full">
            <img :src="emptytask" alt="Empty Inbox" class="w-64 h-auto object-contain opacity-50"/>
          </div>
    </div>
  </div>
  <div class="w-1/4 h-screen flex">
    <div class="h-screen w-px bg-zinc-300"></div>
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

</style>