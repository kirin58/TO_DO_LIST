<script setup>
import { ref, watch , onMounted } from 'vue'
import draggable from 'vuedraggable'
import TaskPopup from '../TaskPopup.vue'

const props = defineProps({
  tasks: Array,
  editID: Number,
  editText: String,
  lists: Array
})

const emit = defineEmits([
  'update:tasks',
  'complete-task',
  'edit-task',
  'edit-save',
  'edit-date',
  'pin-task',
  'set-priority',
  'delete-task',
])

const taskMenu = ref(null)
const popupPosition = ref('bottom')
const editInput = ref(null)
const lists = ref([])

function togglePopup(id, event) {
  taskMenu.value = taskMenu.value === id ? null : id;
  if (event?.target) {
    const top = event.target.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
    popupPosition.value = top < screenHeight / 2 ? 'bottom' : 'top';
  }
}

const tasksForDraggableMutable = ref([...props.tasks])

watch(() => props.tasks, (newTasks) => {
  tasksForDraggableMutable.value = [...newTasks]
}, { deep: true })

function onDragEnd() {
  emit('update:tasks', tasksForDraggableMutable.value)
}

function flagClass(priority) {
  switch (priority) {
    case 'red': return 'bx bx-flag text-red-500 text-xl'
    case 'yellow': return 'bx bx-flag text-yellow-300 text-xl'
    case 'sky': return 'bx bx-flag text-sky-500 text-xl'
    case 'green': return 'bx bx-flag text-green-400 text-xl'
    default: return ''
  }
}

const localEditText = ref(props.editText)
watch(() => props.editText, (val) => {
  localEditText.value = val
})

</script>

<template>
    <draggable v-model="tasksForDraggableMutable" item-key="id" 
    class="space-y-2" handle=".drag-handle" :animation="200" 
    ghost-class="drag-ghost"chosen-class="drag-chosen"@end="onDragEnd">
    <template #item="{ element: t }">
      <div v-if="t" :key="t.id" class="flex items-center">
        <button class="drag-handle icon-btn"><i class='bx bx-menu text-2xl'></i></button>
        <button @click="$emit('complete-task', t)"><i class='bx bx-checkbox checkbox'></i></button>
        <div class="task">
          <div class="flex items-center gap-4">
            <i v-if="t.pinned" class="bx bx-pin text-xl text-purple-400"></i>
            <span v-if="editID !== t.id" @click="$emit('edit-task', t)" class="w-full cursor-pointer select-none">{{ t.text }}</span>
            <input v-else v-model="localEditText" class="w-full bg-transparent outline-none border-none focus:ring-0"
                @keyup.enter="$emit('edit-save', t, localEditText)"
                @blur="$emit('edit-save', t, localEditText)" ref="editInput"/>
          </div>
          <div v-if="t.dueDate && !isNaN(new Date(t.dueDate).getTime())" class="w-full flex justify-end pr-4">
            {{ new Date(t.dueDate).toLocaleDateString('th-TH',{day:'numeric', month:'short',year:'numeric'}) }}
          </div>
          <i v-if="t.priority" :class="flagClass(t.priority)"></i>
        </div>
        <div class="relative">
          <button @click="togglePopup(t.id, $event)">
            <i class='bx bx-dots-horizontal-rounded text-2xl text-zinc-300 ml-3'></i>
          </button>
          <div v-if="taskMenu === t.id" @click.self="taskMenu = null"
                class="absolute z-50 right-0" :class="[popupPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2']">
                <TaskPopup v-model="t.dueDate"@update:modelValue="$emit('edit-date', t, $event)"
                @pin-task="$emit('pin-task', t)"@set-priority="$emit('set-priority', t, $event)"
                @delete="$emit('delete-task', t.id)":lists="lists"/>
          </div>
        </div>
      </div>
    </template>
  </draggable>
</template>