<script setup>
import { ref, defineEmits, defineProps,watch } from 'vue'
import draggable from 'vuedraggable'

//props
const props = defineProps({
    completedTasks: {
    type: Array,
    default: () => []
  }
})

//state
const emit = defineEmits(['saveTasks','uncomplete-task'])
const showCompleted = ref(true)
const localCompletedTasks = ref([...props.completedTasks])

watch(() => props.completedTasks, (newVal) => {
  localCompletedTasks.value = [...newVal]
}, { deep: true })

//function
function uncompleteTask(task) {
  emit('uncomplete-task', task)
}

function onDragEnd() {
  emit('saveTasks', localCompletedTasks.value)
}
</script>
<template>
    <div class="flex flex-col h-full">
        <div class="flex items-center" @click="showCompleted = !showCompleted">
            <i :class="showCompleted ? 'bx bx-chevron-down text-2xl' : 'bx bx-chevron-right text-2xl'"></i>
            <h1>{{ showCompleted ? 'Hide Completed' : 'Show Completed' }} ({{ props.completedTasks.length }})</h1>
        </div>
        <div v-show="showCompleted" class="flex-1 overflow-y-auto ">
            <draggable 
            v-model="localCompletedTasks" 
            item-key="id" 
            class="space-y-2" 
            handle=".drag-handle"   
            :animation="200" 
            ghost-class="drag-ghost" 
            chosen-class="drag-chosen" 
            @end="onDragEnd"
            >
                <template #item="{ element: t }">
                    <div :key="t.id" class="flex items-center">
                    <button class="drag-handle icon-btn">
                        <i class='bx bx-menu text-2xl'></i>
                    </button>
                    <button  @click="uncompleteTask(t)">
                        <i class='bx bx-checkbox-checked checkbox'></i>
                    </button>
                    <span class="line-through text-lg">{{ t.text }}</span>
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>
<style>
.drag-chosen  {
   @apply  opacity-100 scale-100 z-50 shadow-2xl ;
}
.drag-ghost {
   @apply opacity-0 pointer-events-none overflow-hidden;
}
.icon-btn {
  @apply flex items-center text-zinc-300 cursor-pointer;
}
</style>