<script setup>
import { ref} from 'vue'
// state
const task = ref('')
// const tasks = ref([])
const dueDate = ref('')

const emit = defineEmits(['add-task'])

// function
function addTask() {
  if (!task.value.trim()) return
  const newTask = {
    id: Date.now(),
    text: task.value,
    dueDate: dueDate.value || '',
    completed: false,
  }
  emit('add-task',newTask)
  task.value = ''
  dueDate.value = ''
}
</script>
<template>
    <div class="flex items-center justify-between bg-zinc-100 rounded-lg p-1 hover:bg-white border border-white focus-within:border-orange-300">
        <input 
        type="text" 
        v-model="task" 
        @keyup.enter="addTask" 
        placeholder="+ Add task" 
        class="bg-transparent 
        text-slate-500 
        outline-none"/>
        <input type="date" 
        v-model="dueDate" locale="th" 
        class="flex items-end ml-2 
        text-slate-500 
        bg-transparent 
        outline-none 
        border-none 
        focus:ring-0" 
        />
    </div>
</template>