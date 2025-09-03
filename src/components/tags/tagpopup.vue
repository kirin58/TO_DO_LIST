<script setup lang="ts">
import {ref,onMounted , nextTick, watch} from 'vue'

const props = defineProps({ 
    tags: Array,
    tagpopup: {type: Boolean, default: true},
    tagbar: {type: Boolean, default: true}
})

const emit = defineEmits(['delete-tag','update-tag'])

const localtags = ref([])
const editingId = ref(null)
const editText = ref('')

watch(() => props.tags, (newVal) => {
  localtags.value = [...newVal]
}, { immediate: true })

function deleteTags(id) {
    emit('delete-tag', id)
}

function startEdit(tag) {
  editingId.value = tag.id
  editText.value = tag.text
  nextTick(() => {
    const input = document.getElementById(`input-${tag.id}`)
    if (input) input.focus()
  })
}

function saveEdit(tag) {
  if (!editText.value.trim()) return
  
  const index = localtags.value.findIndex(t => t.id === tag.id)
  if (index !== -1) {
    localtags.value[index].text = editText.value.trim()

    localStorage.setItem('myTags', JSON.stringify(localtags.value))
    emit('update-tag', localtags.value[index])
  }

  editingId.value = null
  editText.value = ''
}

onMounted(() => {
    const saved = JSON.parse(localStorage.getItem('myTags')) || []
    if (saved.length > 0) {
        localtags.value = saved
    } else {
        localtags.value = [...props.tags]
    }
})

</script>

<template>
    <template v-if="props.tagbar">
        <div v-for="t in props.tags" :key="t.id" class="tagstyle ">
            <template v-if="editingId === t.id">
                <input :id="`input-${t.id}`" v-model="editText"
                @keyup.enter="saveEdit(t)" @blur="saveEdit(t)"
                class="bg-transparent border-b border-gray-400 focus:outline-none"/>
            </template>
            <template v-else>    
                <span @click="startEdit(t)" class="cursor-text select-none">{{ t.text }}</span>
            </template>
            <button @click="deleteTags(t.id)"><i class='bx  bx-trash text-red-500'></i></button>
        </div>
    </template>
    <template v-if="props.tagpopup">
        <div v-for="t in props.tags" :key="t.id" class="tagstyle">
            <span class="mb-2">{{ t.text }}</span>
        </div>
    </template>
</template>
<style scoped>
.tagstyle {
    @apply flex items-center gap-2 m-2  px-1 text-base justify-between;
}
</style>