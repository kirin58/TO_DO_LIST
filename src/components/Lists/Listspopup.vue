<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({ 
    lists: Array,
    Listpopup: {type: Boolean, default: true},
    Listbar: {type: Boolean, default: true}
})

const lists = ref([])
const emit  = defineEmits(['delete-list', 'update-list'])
function deleteList(id){
  emit('delete-list', id)
}

const editingId = ref(null)
const editingText = ref("")


function startEdit(list) {
  editingId.value = list.id
  editingText.value = list.text
}

function saveEdit(list) {
  if (editingText.value.trim() !== "") {
    emit('update-list', { id: list.id, text: editingText.value })
  }
  editingId.value = null
}
</script>

<template>
    <div class="w-full">
        <div v-if="props.Listbar" v-for="l in props.lists" :key="l.id" class="liststyle justify-between">
            <template v-if="editingId === l.id">
                <input v-model="editingText" class="border px-1 rounded" @keyup.enter="saveEdit(l)" @blur="saveEdit(l)"/>
            </template>
            <template v-else><span @click="startEdit(l)" class="mb-2 cursor-pointer">{{ l.text }}</span></template>
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
