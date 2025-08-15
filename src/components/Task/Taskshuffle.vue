<script setup>
import { ref } from 'vue'

const selectedType = ref('None')
const showTypes = ref(false) 

function selectType(type) {
  selectedType.value = type
  showTypes.value = false
}

function toggleMenu() {
  showTypes.value = !showTypes.value
}
</script>

<template>
  <div class="flex items-start gap-4">
    <div @click="toggleMenu" class="shuffle shuffle-bg">
      <p>Group by</p>
      <button>{{ selectedType }}</button>
      <i class='bx bxs-chevron-right'></i>
    </div>

    <div class="shuffle-bg" v-if="showTypes">
      <button class="shuffle" @click="selectType('Custom')">
        <i class='bx bx-grid'></i><p>Custom</p>
      </button>
      <button class="shuffle" @click="selectType('Day')">
        <i class='bx bx-calendar-event'></i><p>Day</p>
      </button>
      <button class="shuffle" @click="selectType('Priority')">
        <i class='bx bx-flag'></i><p>Priority</p>
      </button>
      <button class="shuffle" @click="selectType('Tag')">
        <p>#</p><p>Tag</p>
      </button>
      <button class="shuffle" @click="selectType('None')">
        <i class='bx bx-block'></i><p>None</p>
      </button>
    </div>
  </div>
</template>

<style>
.shuffle{
    @apply w-full flex items-center p-2 gap-2 text-gray-700 text-lg focus:text-orange-300 hover:bg-slate-100;
}
.shuffle-bg{
    @apply shadow-lg bg-white rounded-md;
}
</style>