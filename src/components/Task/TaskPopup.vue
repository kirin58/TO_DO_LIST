<script setup>
import { ref ,watch , onMounted} from 'vue'
import {supabase} from '../../supabase/supabase'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import TagPopup from '../tags/tagpopup.vue'

const props = defineProps({
    tags: Array,
    tasks: {type: Array,default: () => []},
    modelValue: String,
    isNew: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue','delete','set-priority','pin-task','select-tag','update-tag' ])

const selectDate = ref(props.modelValue || undefined)
watch(selectDate, (newValue) => {
    emit('update:modelValue', newValue)
})


const setDateOffset = (days) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    const iso = date.toISOString().split('T')[0]
    selectDate.value = iso
    emit('update:modelValue', iso)
}

// const tags = ref([])
const tagsList = ref([...props.tags])

const showTag = ref(false)

function updateTag(updatedtag) {
  const index = tagsList.value.findIndex(t => t.id === updatedtag.id)
  if (index !== -1) tagsList.value[index] = updatedtag
  emit('update-tag', updatedtag)
}

watch(() => props.tags, (newTags) => {
  tagsList.value = newTags
})

function selectTag(tag) {
  emit('select-tag', tag)
}

onMounted(async () => {
  const saved = JSON.parse(localStorage.getItem('myTags')) || []
  tagsList.value = saved.length ? saved : [...props.tags]

  const { data, error } = await supabase.from('tags').select('id,text')
  if (error) {
    console.error('Error fetching tags:', error)
  } else if (data) {
    const merged = [...tagsList.value]  
    data.forEach(d => {
      if (!merged.find(t => t.id === d.id)) merged.push(d)
    })
    tagsList.value = merged
  }
})
</script>
<template>
    <div class="w-48 top-0 z-[9999] p-2 px-4 text-stone-600 bg-stone-50 shadow-xl">
        <template v-if="!props.isNew">
            <div class="my-2">
                <div class="text-sm">Date</div>
                <div class="taskpopup">
                    <div class="relative flex items-center">
                        <button type="button" class="text-x" @click="setDateOffset(0)">
                            <i class='bx bxs-calendar-heart'></i>
                        </button>
                    </div>
                    <div class="relative flex items-center">
                        <button type="button" class="text-x" @click="setDateOffset(1)">
                            <i class='bx  bx-calendar-week'  ></i>
                        </button>
                    </div>
                    <div class="relative flex items-center">
                        <button type="button" class="text-x" @click="setDateOffset(7)">
                            <i class='bx  bxs-calendar-minus'  ></i>
                        </button>
                    </div>
                    <div class="relative flex items-center">
                        <Datepicker 
                        :placement="'left-start'" 
                        :auto-apply="true" 
                        :enable-time-picker="false" 
                        locale="th"
                        input-class-name="text-sm border-none bg-transparent focus:ring-0" 
                        v-model="selectDate"
                        >
                            <template #trigger>
                                <button type="button" class="text-x">
                                    <i class='bx  bxs-calendar'  ></i>
                                </button>
                            </template>
                        </Datepicker>
                    </div>    
                </div>
            </div>
            <div class="taskpopup_line"></div>
        </template>
        <div class="my-2">
            <div class="text-sm">Priority</div>
            <div class="taskpopup">
                <button @click="$emit('set-priority', 'red')">
                    <i class='bx  bx-flag text-red-500'></i>
                </button>
                <button @click="$emit('set-priority', 'yellow')">
                    <i class='bx  bx-flag text-yellow-300'></i>
                </button>
                <button @click="$emit('set-priority', 'sky')">
                    <i class='bx  bx-flag text-sky-500'></i>
                </button>
                <button @click="$emit('set-priority', 'green')">
                    <i class='bx  bx-flag text-green-400'></i>
                </button>
            </div>
        </div>
        <div class="taskpopup_line"></div>
        <div class="taskpopup_func">
            <button @click="emit('pin-task')">
                <i class='bx  bx-pin'  ></i>
            </button>
            <p>Pin</p>
        </div>
        <div>
            <div class="taskpopup_func justify-between">
                <div class="flex gap-2">
                    <button>#</button>
                    <p>Tags</p>
                </div>
                <i @click="showTag = !showTag" :class="showTag ?'bx bx-chevron-down text-2xl' : 'bx bx-chevron-right text-2xl' "></i>
            </div>
            <TagPopup 
            v-if="showTag" 
            :tags="tagsList" 
            :tagbar="false" 
            :tagpopup="true" 
            @select="selectTag"
            @update-tag="updateTag"
            />
        </div>
        <template v-if="!props.isNew">
            <div class="taskpopup_line"></div>
            <div @click="emit('delete')" class="taskpopup_func text-red-500">
                <button>
                    <i class='bx  bx-trash'></i>
                </button>
                <p>Delete</p>
            </div>
        </template>
    </div>
</template>
<style scoped>
.taskpopup{
    @apply flex justify-between ;
}
.taskpopup_line{
    @apply h-px my-2 bg-slate-300;
}
.taskpopup_func{
    @apply flex items-center my-2 gap-2;
}
.fade-enter-active, .fade-leave-active {
  @apply transition-opacity duration-200;
}
.fade-enter-from, .fade-leave-to {
  @apply opacity-0;
}
</style>