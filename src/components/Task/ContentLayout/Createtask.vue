<script setup>
import { ref} from 'vue'
import { supabase } from '@/supabase/supabase'
// state
const task = ref('')
const dueDate = ref('')
const loading = ref(false)
const error = ref(null)
const emit = defineEmits(['add-task'])

// function
async function addTask() {
  if (!task.value.trim()) return
  loading.value = true
  error.value = null

  try {
    // สร้างข้อมูล task ตาม schema
    const { data, error: insertError } = await supabase
      .from('tasks')
      .insert([
        {
          title: task.value,
          due_date: dueDate.value || null,
          completed: false,
          pinned: false,
          priority: null,
          tag_id: null
        }
      ])
      .select() // เพื่อให้ Supabase return row ที่เพิ่ง insert

    if (insertError) throw insertError

    // ส่งข้อมูลกลับไปยัง parent ถ้าจำเป็น
    emit('add-task', data[0])

    // เคลียร์ input
    task.value = ''
    dueDate.value = ''
  } catch (err) {
    console.error('Error inserting task:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
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