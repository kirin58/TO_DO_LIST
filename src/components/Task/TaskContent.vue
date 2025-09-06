<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import TaskList from './ContentLayout.vue/TaskList.vue'
import Taskshuffle from './Taskshuffle.vue'
import Rightcontent from './ContentLayout.vue/Rightcontent.vue'
import Createtask from './ContentLayout.vue/Createtask.vue'
import CompletedTasks from './ContentLayout.vue/Completetask.vue'
import Emptytask from './ContentLayout.vue/Emptytask.vue'
import Trashpage from './ContentLayout.vue/Trashpage.vue'

//state
const tasks = ref([])
const completedTasks = ref([])
const showShuffle = ref(false)
const tags = ref([])

//Edit State
const editID = ref(null)
const editText = ref('')
const editInput = ref(null)


// Sort State
const sortByDate = ref(false)
const sortByPriority = ref(false)
const sortByNone = ref(true)

const trashTasks = ref([])


//Props
const props = defineProps({
  emptytask: String,
  empty: String,
  emptydis: String,
  title: String,
  mode: { type: String, default: 'today' },
})

const pageTitle = computed(() => {
  if (props.title) return props.title
  switch (props.mode) {
    case 'today': return 'Today'
    case 'next7': return 'Next 7 Days'
    case 'inbox': return 'Inbox'
    case 'completed' : return 'Completed'
    case 'trash' : return 'Trash'
    default: return ''
  }
})

//Pageshow
const today = new Date()
today.setHours(0,0,0,0)

function isShowDatepage() {
  return props.mode !== 'completed' && props.mode !== 'trash'
}


function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify({
    incomplete: tasks.value,
    complete: completedTasks.value,
    trash: trashTasks.value
  }))
  localStorage.setItem('myTags', JSON.stringify(tags.value || []))
}

function fetchTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    const parsed = JSON.parse(saved);
    tasks.value = parsed.incomplete || [];
    completedTasks.value = parsed.complete || [];
    trashTasks.value = parsed.trash || [];
  }
}


onMounted(() => {
  const savedTags = localStorage.getItem('myTags')
  tags.value = savedTags ? JSON.parse(savedTags) : []
  fetchTasks()
})


function addTask(newTask) {
  tasks.value.push(newTask)
  saveTasks()
}

function deleteTask(taskId) {
  const t = tasks.value.find(x => x.id === taskId) || completedTasks.value.find(x => x.id === taskId)
  if (t) {
    trashTasks.value.push({...t,deletedAt: new Date()})
  }
  tasks.value = tasks.value.filter(t => t.id !== taskId)
  completedTasks.value = completedTasks.value.filter(t => t.id !== taskId)
  saveTasks()
}

function edit(t) {
  editID.value = t.id
  editText.value = t.text
}
function editSave(task, newText, cancel = false) {
  if (cancel || newText.trim() === '') {
    editID.value = null
    editText.value = ''
    return
  }
  task.text = newText
  editID.value = null
  editText.value = ''
  saveTasks()
}

watch(editID, async (newvalue) => {
  if (newvalue !== null) {
    await nextTick()
    editInput.value?.focus()
  }
})

function editDate(task, newDate) {
  task.dueDate = newDate
  saveTasks()
  fetchTasks()
}

function completeTask(task) {
  tasks.value = tasks.value.filter(t => t.id !== task.id)
  if (!completedTasks.value.find(t => t.id === task.id)) {
    completedTasks.value.push(task)
  }
  saveTasks()  
}

function uncompleteTask(task) {
  completedTasks.value = completedTasks.value.filter(t => t.id !== task.id)
  if (!tasks.value.find(t => t.id === task.id)) {
    tasks.value.push(task)
  }

  tasks.value.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })

  saveTasks()
}

function sortByDateFn(a, b) {
  if (!a.dueDate && !b.dueDate) return 0
  if (!a.dueDate) return 1
  if (!b.dueDate) return -1
  return new Date(a.dueDate) - new Date(b.dueDate)
}

function sortByPriorityFn(a, b) {
  const priorityOrder = { red: 1, yellow: 2, sky: 3, green: 4, "": 5 }
  return (priorityOrder[a.priority] || 5) - (priorityOrder[b.priority] || 5)
}

function toggleShuffle() {
  showShuffle.value = !showShuffle.value
}

function handleSelectType(type) {
  sortByDate.value = type === 'Date'
  sortByPriority.value = type === 'Priority'
  sortByNone.value = type === 'None'

  let sorted = [...tasksForDraggable.value]

  if (sortByDate.value) sorted.sort(sortByDateFn)
  else if (sortByPriority.value) sorted.sort(sortByPriorityFn)
}


function setPriority(task, color) {
  task.priority = color
  saveTasks()
  fetchTasks()
}

function togglePin(task) {
  const index = tasks.value.findIndex(t => t.id === task.id);
  if (index !== -1) {
    tasks.value[index] = { ...tasks.value[index], pinned: !tasks.value[index].pinned };
    tasks.value.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
  }
}

function handleSelectTag(task, tag) {
  const taskIndex = tasks.value.findIndex(t => t.id === task.id)
  if (taskIndex !== -1) {
    tasks.value[taskIndex].tagId = tag.id
    saveTasks()
  }
}

const selectTrash = ref(false)

function toggleselectTrash(){
  selectTrash.value = !selectTrash.value
  trashTasks.value.forEach(t => {t.isDeleted = selectTrash.value})
}

function restoreTasks() {
  const toRestore = trashTasks.value.filter(t => t.isDeleted)

  if (toRestore.length > 0) {
    toRestore.forEach(t => {
      if (t.completed) {
        completedTasks.value.push({ ...t, isDeleted: false })
      } else {
        tasks.value.push({ ...t, isDeleted: false })
      }
    })

    trashTasks.value = trashTasks.value.filter(t => !t.isDeleted)

    saveTasks()
  }
}

function deleteForever() {
  trashTasks.value = trashTasks.value.filter(t => !t.isDeleted)
  saveTasks()
}

//mode

function isTaskInMode(task) {
  if (props.mode === 'inbox') return true;
  if (props.mode === 'today') {
    if (!task.dueDate) return false;
    return new Date(task.dueDate).toDateString() === today.toDateString();
  }
  if (props.mode === 'next7') {
    const start = new Date(today);
    start.setDate(today.getDate() + 1);
    const end = new Date(today);
    end.setDate(today.getDate() + 8);
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return taskDate >= start && taskDate <= end;
  }
  return false;
}

const tasksForDraggableMutable = computed({
  get() {
    let result = tasks.value.filter(t => isTaskInMode(t))
    if (sortByDate.value) result.sort(sortByDateFn)
    else if (sortByPriority.value) result.sort(sortByPriorityFn)
    return result
  },
  set(newVal) {
    const otherTasks = tasks.value.filter(t => !isTaskInMode(t))
    tasks.value = [...newVal, ...otherTasks]
    saveTasks()
  }
})

const lists = ref([])
onMounted(() => {
  const savedLists = localStorage.getItem('myLists')
  if (savedLists) lists.value = JSON.parse(savedLists)
})
</script>

<template>
  <div class="w-[57%] h-screen pl-5">
    <div class="flex flex-col p-6 "
    :class="props.mode == 'completed' || props.mode == 'trash' ? 'h-[12%]' : 'h-[16%]'">
      <div class="flex items-center justify-between p-2 mb-2 ">
        <p  class="font-semibold text-3xl text-stone-800">{{ pageTitle}}</p>
        <div v-if="isShowDatepage()" class="text-stone-400 text-2xl">
          <button @click="toggleShuffle">
            <i class='bx  bx-shuffle'  ></i>
          </button>
          <Taskshuffle 
          v-if="showShuffle" 
          class="absolute z-50" 
          @selectType="handleSelectType"
          />
        </div>
      </div>
      <!-- Create Task -->
      <div v-if="isShowDatepage()">
        <Createtask @add-task="addTask"/>
      </div>
    </div>
    <!-- DatePage -->
    <div v-if="isShowDatepage()" class="h-[84%]">
      <div class="w-full overflow-y-auto  pr-14"
      :class="completedTasks.length > 0 ? 'h-[50%]' : 'h-[100%]'">
        <!-- TaskLists -->
        <div v-show="tasksForDraggableMutable.length > 0" >
          <TaskList 
          :key="props.mode" 
          :tasks="tasksForDraggableMutable" 
          :editID="editID" 
          :editText="editText" 
          :lists="lists" 
          :tags="tags" 
          @pin-task="togglePin" 
          @update:tasks="tasks = $event" 
          @edit-task="edit" 
          @edit-date="editDate" 
          @edit-save="editSave" 
          @complete-task="completeTask" 
          @set-priority="setPriority" 
          @delete-task="deleteTask" 
          @select-tag="handleSelectTag"
          />
        </div>
        <Emptytask 
        v-show="tasksForDraggableMutable.length === 0" 
        :emptytask="emptytask" 
        :empty="empty" 
        :emptydis="emptydis"
        />
      </div>
      <!-- Complete -->
      <div v-if="completedTasks.length > 0" class="w-full h-[50%]">
        <CompletedTasks 
        :completedTasks="completedTasks" 
        @uncomplete-task="uncompleteTask"  
        @saveTasks="saveTasks"
        />
      </div>
    </div>
    
    <!-- CompletePage -->
    <div v-if="props.mode == 'completed'" class="w-full h-[84%]">
      <div v-if="completedTasks.length > 0" class="h-full pl-6">
        <CompletedTasks 
        :completedTasks="completedTasks" 
        @uncomplete-task="uncompleteTask"  
        @saveTasks="saveTasks"
        />
      </div>
      <div v-else class="h-full">
        <Emptytask 
        :emptytask="emptytask" 
        :empty="empty" 
        :emptydis="emptydis"
        />
      </div>
    </div>

    <!-- TrashPage -->
    <div v-if="props.mode == 'trash'" class="w-full h-[84%]">
      <div v-if="trashTasks.length > 0" class="h-full pl-6">
        <Trashpage 
        :trashTasks="trashTasks" 
        :selectTrash="selectTrash" 
        @toggleselectTrash="toggleselectTrash" 
        @restoreTasks="restoreTasks" 
        @deleteForever="deleteForever"
        />
      </div>
      <div v-else class="h-full">
        <Emptytask 
        :emptytask="emptytask" 
        :empty="empty" 
        :emptydis="emptydis"
        />
      </div>
    </div>
  </div>
  <div class="h-screen flex">
    <Rightcontent/>
  </div>
</template>