<script setup>
import {ref,onMounted,watch} from 'vue'
import Listcomp from '../Lists/Listcomp.vue';
import tagcomp from '../tags/tagcomp.vue';
import Listspopup from '../Lists/Listspopup.vue';
import Tagpopup from '../tags/tagpopup.vue';

const props = defineProps({
    lists: Array,
    tags: Array
})

const lists = ref([])
const tags = ref([])

const showListInput = ref(false)
const showTagInput = ref(false)
const showList = ref(false)
const showTag = ref(false)

function handleAddList(newList){
    lists.value.push({
        id: Date.now(),
        text: newList
    })
}
function handleAddTag(newTag){
    tags.value.push({
        id: Date.now(),
        text: newTag
    })
}

function deleteList(id) {
  lists.value = lists.value.filter(l => l.id !== id)
}
function deleteTags(id){
    tags.value = tags.value.filter(t => t.id !== id) 
}

onMounted(() => {
  const savedLists = localStorage.getItem('myLists')
  if (savedLists) lists.value = JSON.parse(savedLists)

  const savedTags = localStorage.getItem('myTags')
  if (savedTags) tags.value = JSON.parse(savedTags)
})

watch(lists, (newVal) => {
  localStorage.setItem('myLists', JSON.stringify(newVal))
}, { deep: true })

watch(tags, (newVal) => {
  localStorage.setItem('myTags', JSON.stringify(newVal))
}, { deep: true })
</script>
<template>
    <div class="min-h-screen w-64 bg-orange-100 flex flex-col items-center p-4">
        <div class="bar">
            <div>
                <router-link to="/Today" class="taskmenu " active-class="task_active"><i class='bx  bxs-calendar-heart'  ></i><p class="text-base">Today</p></router-link>
                <router-link to="/Next7" class="taskmenu" active-class="task_active"><i class='bx  bxs-calendar-minus'  ></i><p class="text-base">Next 7 Days</p></router-link>
                <router-link to="/Inbox" class="taskmenu" active-class="task_active"><i class='bx  bxs-inbox'  ></i> <p class="text-base">Inbox</p></router-link>
            </div>
            <div>
                <div class="line"><div></div></div>
                <div class="list">
                    <div class="flex items-center"><i @click="showList = !showList" :class="showList ?'bx bx-chevron-down text-2xl' : 'bx bx-chevron-right text-2xl' "></i><p class="text-md">List</p></div>
                    <div><i class='bx  bx-plus cursor-pointer'  @click="showListInput = true" ></i></div>
                </div>
                <listcomp v-if="showListInput"  @closeInput="showListInput = false" @addList="handleAddList"></listcomp>
                <listspopup v-if="showList" :lists="lists" :Listbar="true" :Listpopup="false" @delete-list="deleteList"></listspopup>
                
                <div class="list">
                    <div class="flex items-center"><i @click="showTag = !showTag" :class="showTag ?'bx bx-chevron-down text-2xl' : 'bx bx-chevron-right text-2xl' "></i> <p class="text-md">Tags</p></div>
                    <div><i class='bx  bx-plus cursor-pointer'  @click="showTagInput = true"  ></i> </div>
                </div>
                <tagcomp v-if="showTagInput" @closeInput="showTagInput = false" @addTag="handleAddTag"></tagcomp>
                <Tagpopup v-if="showTag" :tags="tags" :tagbar="true" :tagpopup="false" @delete-tag="deleteTags"/>
            </div>
        </div>
        
        <div class="bar justify-end mb-10">
            <div class="line"><div></div></div>
            <router-link to="/Completed" class="taskmenu" active-class="task_active"><i class='bx  bx-check-square'  exact-active-class="task_active"></i> <p class="text-base">Completed</p></router-link>
            <router-link to="/Trash" class="taskmenu" active-class="task_active"><i class='bx  bx-trash'  exact-active-class="task_active"></i> <p class="text-base">Trash</p></router-link>
        </div>
    </div>
</template>
<style>
.bar {
    @apply h-1/2 w-full flex flex-col;
}
.line {
    @apply h-px w-full flex flex-col bg-orange-300 ;
}
.taskmenu{
    @apply flex items-center  gap-2 hover:bg-orange-200 m-1 mb-2 p-2 rounded-md text-2xl text-gray-700;
}
.list{
    @apply flex flex-row items-center justify-between hover:bg-orange-200 m-1 mb-2 p-1 rounded-md text-base text-gray-700;
}
.task_active{
  @apply bg-orange-200;
}
</style>