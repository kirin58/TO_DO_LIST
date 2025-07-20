<script setup>
defineProps({
    title: String,
    emptytask : String
})
import { ref, onMounted  } from 'vue';
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'
const task = ref('')
const dueDate = ref('')
const tasks = ref([])
async function addTask() {
  if (!task.value.trim()) return
  await addDoc(collection(db, 'tasks'), {
    text: task.value,
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
  await addDoc(collection(db, 'tasks'), {
    text: 'ตัวอย่าง task',
    createdAt: new Date()
  })
  fetchTasks()
})
</script>
<template>
    <div class="w-3/5">
        <div class="h-1/6 flex flex-col p-6">
            <div class="flex items-center p-2 mb-2 justify-between">
                <p class="text-2xl font-black text-stone-600">{{ title }}</p>
                <div class="w-1/2 flex justify-end gap-4 text-stone-400 text-2xl">
                    <button><i class='bx  bx-shuffle'  ></i></button>
                    <button><i class='bx  bx-dots-horizontal'  ></i> </button>
                </div>
            </div>
            <div class="w-full flex items-center bg-gray-200 rounded-lg p-1.5 border focus-within:border-orange-300">
                <input type="text" v-model="task" @keyup.enter="addTask" placeholder="+ Add task" class="flex-1 bg-transparent text-slate-500 outline-none"/>
                <input type="date" v-model="dueDate" class="ml-2 text-slate-500 bg-transparent outline-none border-none focus:ring-0" />
            </div>
        </div>
        <div class="w-full h-5/6 overflow-y-auto p-4">
            <div v-if="tasks.length">
                <div
                v-for="t in tasks"
                :key="t.id"
                class="bg-white p-3 mb-2 rounded shadow text-slate-700"
                >
                {{ t.text }}
                </div>
            </div>
            <div v-else class="flex items-center justify-center h-full">
                <img :src="emptytask" alt="Empty Inbox" class="w-64 h-auto object-contain opacity-50"/>
            </div>
        </div>
    </div>
</template>