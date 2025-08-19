<script setup>
import { ref ,watch} from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
    modelValue: String
})
const popupPosition = ref('bottom')
const emit = defineEmits(['update:modelValue','delete'])

const selectDate = ref(props.modelValue || undefined)
//เลือกวันที่
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
//เลือกธง
function setPriority(color) {
  emit('update:priority', color)
}
</script>
<template>
    <div class="w-48 top-0 z-[9999] p-2 px-4 text-stone-600 bg-stone-50 shadow-xl">
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
                    <Datepicker :placement="'left-start'" :auto-apply="true":enable-time-picker="false"locale="th"
                    input-class-name="text-sm border-none bg-transparent focus:ring-0" v-model="selectDate">
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
            <button><i class='bx  bx-pin'  ></i></button>
            <p>Pin</p>
        </div>
        <div class="taskpopup_func justify-between">
            <div class="flex gap-2">
                <button><i class='bx  bx-chevron-right-square'  ></i> </button>
                <p>Move To</p>
            </div>
            <button><i class='bx  bxs-chevron-right '></i></button>
        </div>
        <div class="taskpopup_func">
            <button>#</button>
            <p>Tags</p>
        </div>
        <div class="taskpopup_line"></div>
        <div @click="emit('delete')" class="taskpopup_func text-red-500">
            <button ><i class='bx  bx-trash'></i></button>
            <p>Delete</p>
        </div>
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
    @apply flex my-2 gap-2;
}
</style>