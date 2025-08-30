<template>
  <div v-if="showSearch" class="search-box">
    <button class="flex w-full justify-end mb-3 pr-3" @click="closeSearch"><p class="text-red-500">Close</p></button>
    <input
        ref="searchInput"
        type="text"
        placeholder="Search tasks, tags, lists and filters..."
        v-model="query"
    />
    
    <p style="margin-top:15px; text-align:center; color:#888;">
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

<style scoped>
.search-box {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 600px;
  max-width: 90%;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}
.search-box input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.close-btn {
  float: right;
  cursor: pointer;
  font-size: 20px;
  color: #888;
}
</style>
