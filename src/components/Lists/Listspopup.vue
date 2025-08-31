<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({ 
    lists: Array,
    Listpopup: {type: Boolean, default: true},
    Listbar: {type: Boolean, default: true}
})

const emit  = defineEmits(['delete-list'])
// function deleteList(id){
//     emit('delete-list', id) 
// }

const lists = ref([])

function fetchLists() {
  lists.value = JSON.parse(localStorage.getItem('myLists')) || []
}

function deleteList(id){
  let saved = JSON.parse(localStorage.getItem('myLists')) || []
  saved = saved.filter(l => l.id !== id)
  localStorage.setItem('myLists', JSON.stringify(saved))
  fetchLists()
}

onMounted(() => {
  fetchLists()
})
</script>

<template>
    <div class="w-full">
        <div v-if="props.Listbar" v-for="l in props.lists" :key="l.id" class="liststyle justify-between">
            <span class="mb-2">{{ l.text }}</span>
            <button  @click="deleteList(l.id)"><i class='bx  bx-trash text-red-500'></i></button>
        </div>
    </div>
    <div v-if="props.Listpopup" class="w-full">
        <div v-for="l in props.lists" :key="l.id" class="liststyle">
            <i class='bx bx-menu text-xl'></i>
            <span>{{ l.text }}</span>
        </div>
    </div>
</template>

<style scoped>
.liststyle {
    @apply flex items-center gap-2 m-2  px-1 text-base;
}
</style>
