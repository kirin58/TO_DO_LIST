<script setup>
import {ref,onMounted , nextTick, watch} from 'vue'
import { supabase } from '../../supabase/supabase'

const props = defineProps({ 
    tags: Array,
    tagpopup: {type: Boolean, default: true},
    tagbar: {type: Boolean, default: true}
})

const emit = defineEmits(['delete-tag','update-tag','select'])

const editingId = ref(null)
const editText = ref('')
const selectedTagId = ref(null) 

function startEdit(tag) {
  editingId.value = tag.id
  editText.value = tag.text
  nextTick(() => {
    const input = document.getElementById(`input-${tag.id}`)
    if (input) input.focus()
  })
}

async function saveEdit(tag) {
  if (!editText.value.trim()) return

  const { data, error } = await supabase
    .from('tags')
    .update({ text: editText.value.trim() })
    .eq('id', tag.id)
    .select()
  if (error) return console.error(error)
  
  emit('update-tag', data[0])
  editingId.value = null
  editText.value = ''
}

async function deleteTags(id) {
  const { error } = await supabase.from('tags').delete().eq('id', id)
  if (error) return console.error(error)
  emit('delete-tag', id)
}

function handleSelect(tag) {
  if (selectedTagId.value === tag.id) {
    selectedTagId.value = null
    emit('select', null)
  } else {
    selectedTagId.value = tag.id
    emit('select', tag)
  }
}
</script>

<template>
    <template v-if="props.tagbar">
        <div v-for="t in props.tags" :key="t.id" class="tagstyle justify-between">
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
        <div v-for="t in localtags" :key="t.id" class="tagstyle cursor-pointer"
        @click="handleSelect(t)"
        :class="selectedTagId === t.id ? 'bg-teal-300 text-white' : ''">
            <i class='bx bx-menu text-2xl'></i>
            <span>{{ t.text }}</span>
        </div>
    </template>
</template>
<style scoped>
.tagstyle {
    @apply flex items-center gap-2 m-2  px-1 text-base;
}
</style>