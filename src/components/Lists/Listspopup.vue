<script setup>
const props = defineProps({ 
    lists: Array,
    showTrash: { type: Boolean, default: true }
})
const emit  = defineEmits(['delete-list'])
function deleteList(id){
    emit('delete-list', id) 
}
</script>

<template>
    <div class="w-full">
        <div v-for="l in props.lists" :key="l.id" class="flex items-center justify-between mx-3 my-2 text-md">
            <span class="mb-2">{{ l.text }}</span>
            <button v-if="props.showTrash" @click="deleteList(l.id)"><i class='bx  bx-trash text-red-500'></i></button>
        </div>
    </div>
</template>
