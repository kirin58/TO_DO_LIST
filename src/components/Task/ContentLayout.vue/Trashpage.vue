<script setup>
import { ref } from 'vue'

const props = defineProps({
  trashTasks: Array,
  selectTrash: Boolean
})

const emit = defineEmits(['toggleselectTrash', 'restoreTasks', 'deleteForever'])
</script>

<template>
    <div class="flex flex-col space-y-2 w-full  p-5">
      <div class="flex items-center justify-between" >
        <div class="flex items-center gap-2">
          <button @click="$emit('toggleselectTrash')"><i :class="selectTrash ? 'bx bx-checkbox-checked checkbox' : 'bx bx-checkbox checkbox'"></i></button>
          <p class="text-lg text-stone-500">All</p>
        </div>
        <div class="flex items-center gap-2">
          <button @click="$emit('restoreTasks')"><i class='bx bx-undo text-3xl text-zinc-400'></i> </button>
          <button @click="$emit('deleteForever')"><i class='bx  bx-trash text-2xl text-zinc-400'  ></i> </button>
        </div>
      </div>
      <div v-for="t in trashTasks" :key="t.id" class="flex items-center">
        <button @click="t.isDeleted = !t.isDeleted"><i :class="t.isDeleted ? 'bx bx-checkbox-checked checkbox' : 'bx bx-checkbox checkbox'"></i></button>
        <span class="text-lg text-stone-500">{{ t.text }}</span>
      </div>
    </div>
</template>

<style scoped>
.checkbox{
  @apply text-4xl text-zinc-300;
}
</style>