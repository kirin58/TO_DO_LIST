<script setup lang="ts">
import {ref,onMounted} from 'vue'

const props = defineProps({ 
    tags: Array,
    tagpopup: {type: Boolean, default: true},
    tagbar: {type: Boolean, default: true}
})

const emit = defineEmits(['delete-tag'])

const tags = ref([])

function fetchtags() {
  tags.value = JSON.parse(localStorage.getItem('myTags')) || []
}

function deleteTags(id) {
  let saved = JSON.parse(localStorage.getItem('myTags')) || []
  saved = saved.filter(t => t.id !== id)
  localStorage.setItem('myTags', JSON.stringify(saved))

  emit('delete-tag', id)
  fetchtags()
}


onMounted(() => {
  fetchtags()
})

</script>

<template>
    <template v-if="props.tagbar">
        <div v-for="t in tags" :key="t.id" class="tagstyle ">
            <span class="mb-2">{{ t.text }}</span>
            <button @click="deleteTags(t.id)"><i class='bx  bx-trash text-red-500'></i></button>
        </div>
    </template>
    <template v-if="props.tagpopup">
        <div v-for="t in tags" :key="t.id" class="tagstyle">
            <span class="mb-2">{{ t.text }}</span>
        </div>
    </template>
</template>
<style scoped>
.tagstyle {
    @apply flex items-center gap-2 m-2  px-1 text-base justify-between;
}
</style>