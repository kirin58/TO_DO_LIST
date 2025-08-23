<script setup>
import { ref, onMounted} from 'vue'

const emit = defineEmits(['closeInput','addList'])
const list = ref('')

function addList(){
    if(!list.value.trim())return
    const newList = {id:Date.now(),text:list.value}
    emit('addList',newList)
    list.value=''
    emit('closeInput')
}
function cancel(){
    list.value = ''
    emit('closeInput')
}
</script>
<template>
  <div class="fixed inset-0 flex items-center justify-center" @click.self="cancel">
    <div class="content-between bg-slate-50 w-96 h-48 p-6 shadow-md ">
        <div class="w-full items-center flex justify-between"><h1 class="font-semibold">Create Lists</h1><i class='bx  bx-x text-2xl cursor-pointer' @click="cancel"></i> </div>
        <input type="text" v-model="list" @keyup.enter="addList" placeholder="+ Add List" 
        class="w-full bg-transparent my-4 p-2 rounded-lg text-slate-500 hover:bg-white border focus-within:border-orange-300 outline-none"/>
        <div class="w-full flex justify-end gap-2"><button class="btn bg-red-500" @click="cancel"><h1>Cancel</h1></button><button class="btn bg-sky-500" @click="addList"><h1>Confirm</h1></button></div>
    </div>
</div>
</template>
<style>
.btn{
    @apply p-1 rounded-lg ;
}
</style>