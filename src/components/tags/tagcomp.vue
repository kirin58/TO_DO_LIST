<script setup>
import { ref} from 'vue'
import {supabase} from '../../supabase/supabase'

const emit = defineEmits(['closeInput','addTag'])
const tag = ref('')

async function addTag() {
  const trimmedTag = tag.value.trim()
  if (!trimmedTag) return

  const { data, error } = await supabase
    .from('tags')
    .insert([{ text: trimmedTag }])
    .select('*')  // รับทุก column

  if (error) {
    console.error('Error adding tag:', error)
    return
  }

  if (data && data.length > 0) {
    emit('addTag', data[0])
    tag.value = ''
    emit('closeInput')
  }
}

function cancel() {
  tag.value = ''
  emit('closeInput')
}
</script>
<template>
  <div class="fixed inset-0 flex items-center justify-center" @click.self="cancel">
    <div class="content-between bg-slate-50 w-96 h-48 p-6 shadow-md ">
        <div class="w-full items-center flex justify-between">
            <h1 class="font-semibold">Create Tags</h1>
            <i class='bx  bx-x text-2xl cursor-pointer' @click="cancel"></i> 
        </div>
        <input 
        type="text" 
        v-model="tag" 
        @keyup.enter="addTag" 
        placeholder="+ Add Tag" 
        class="w-full bg-transparent my-4 p-2 rounded-lg text-slate-500 hover:bg-white border focus-within:border-orange-300 outline-none"
        />
        <div class="w-full flex justify-end gap-2">
            <button class="btn bg-red-500" @click="cancel">
                <h1>Cancel</h1>
            </button>
            <button class="btn bg-sky-500" @click="addTag">
                <h1>Confirm</h1>
            </button>
        </div>
    </div>
</div>
</template>
<style>
.btn{
    @apply p-1 rounded-lg ;
}
</style>