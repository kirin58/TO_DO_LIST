<template>
  <div v-if="showSearch" class="bg-white p-5 rounded-xl w-[600px] max-w-[90%] shadow-xl">
    <button class="flex w-full justify-end mb-3 pr-3" @click="closeSearch">
      <p class="text-red-500">Close</p>
    </button>

    <input
      ref="searchInput"
      type="text"
      placeholder="Search"
      v-model="query"
      class="w-full p-2 text-base rounded-md border-b outline-none placeholder-gray-400 text-gray-700"
    />

    <div class="flex items-center justify-center h-1/2">
      <div class="w-[150px] h-[150px] mt-8">
        <img 
          src="/public/1 .png"
          class="w-full h-full object-contain opacity-80"
        >
      </div>
    </div>      

    <p class="mt-4 mb-9 text-center text-gray-500">
      Search tasks, tags, lists and filters
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showSearch = ref(true);
const query = ref('');

function closeSearch() {
  showSearch.value = false;
}
</script>
