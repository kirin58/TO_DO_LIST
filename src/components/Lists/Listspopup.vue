<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'

const props = defineProps({ 
    lists: Array,
    Listpopup: {type: Boolean, default: true},
    Listbar: {type: Boolean, default: true}
})

const emit = defineEmits(['delete-list','update-list'])

const localLists = ref([])
const editingId = ref(null)
const editText = ref('')

watch(() => props.lists, (newVal) => {
  localLists.value = [...newVal]
}, { immediate: true })


function deleteList(id) {
  emit('delete-list', id)
}

function startEdit(list) {
  editingId.value = list.id
  editText.value = list.text
  nextTick(() => {
    const input = document.getElementById(`input-${list.id}`)
    if (input) input.focus()
  })

}

function saveEdit(list) {
  if (!editText.value.trim()) return
  
  const index = localLists.value.findIndex(l => l.id === list.id)
  if (index !== -1) {
    localLists.value[index].text = editText.value.trim()

    localStorage.setItem('myLists', JSON.stringify(localLists.value))
    emit('update-list', localLists.value[index])
  }

  editingId.value = null
  editText.value = ''
}

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('myLists')) || []
  if (saved.length > 0) {
    localLists.value = saved
  } else {
    localLists.value = [...props.lists]
  }
})

</script>

<template>
    <template v-if="props.Listbar">
        <div v-for="l in props.lists" :key="l.id" class="liststyle">
            <template v-if="editingId === l.id">
                <input :id="`input-${l.id}`" v-model="editText" 
                    @keyup.enter="saveEdit(l)" @blur="saveEdit(l)"
                    class="bg-transparent border-b border-gray-400 focus:outline-none"/>
            </template>
            <template v-else>
                <span @click="startEdit(l)" class="cursor-text select-none">{{ l.text }}</span>
            </template>
            <button @click="deleteList(l.id)"><i class='bx bx-trash text-red-500'></i></button>
        </div>
    </template>
    <template v-if="props.Listpopup">
        <div v-for="l in props.lists" :key="l.id" class="liststyle">
            <span class="mb-2">{{ l.text }}</span>
        </div>
    </template>
</template>

<style scoped>
.liststyle {
    @apply flex items-center gap-2 m-2  px-1 text-base justify-between;
}
</style>
