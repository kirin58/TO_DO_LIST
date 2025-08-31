<template>
  <header class="min-h-screen w-16 bg-orange-300 flex flex-col items-center justify-between p-2 gap-2">
    <div class="h-4/6 w-full flex flex-col items-center gap-10">
      <button class="w-10 h-10 bg-slate-200 rounded-lg"></button>
      <nav class="h-1/2 w-full flex flex-col items-center justify-between">
        
        <!-- Inbox -->
        <div class="relative group flex items-center">
          <router-link to="/Inbox" exact-active-class="menu_active">
            <i class='menu bx bxs-check-square'></i>
          </router-link>
          <span class="absolute left-12 px-2 py-1 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition">
            Task
          </span>
        </div>

        <!-- Search -->
        <div class="relative group flex items-center">
          <button @click="toggleSearch">
            <i class='menu bx bx-search'></i>
          </button>
          <span class="absolute left-12 px-2 py-1 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition">
            Search
          </span>
        </div>
        <Search v-if="showSearch" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"></Search>

        <!-- Calendar -->
        <div class="relative group flex items-center">
          <router-link to="/Calender" exact-active-class="menu_active">
            <i class='menu bx bx-calendar'></i>
          </router-link>
          <span class="absolute left-12 px-2 py-1 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition">
            Calendar
          </span>
        </div>

        <!-- Pomodoro -->
        <div class="relative group flex items-center">
          <router-link to="/Pomodoro" exact-active-class="menu_active">
            <i class='menu bx bxs-alarm'></i>
          </router-link>
          <span class="absolute left-12 px-2 py-1 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition">
            Pomodoro
          </span>
        </div>

        <!-- Matrix -->
        <div class="relative group flex items-center">
          <router-link to="/Matrix" exact-active-class="menu_active">
            <i class='menu bx bxs-grid'></i>
          </router-link>
          <span class="absolute left-12 px-2 py-1 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition">
            Matrix
          </span>
        </div>
      </nav>
    </div>

    <div class="h-1/5 flex flex-col justify-between">
      <!-- Sync -->
      <div class="relative group flex items-center">
        <router-link to="#" exact-active-class="menu_active">
          <i class="menu bx bx-refresh"></i>
        </router-link>
        <span class="absolute left-12 px-2 py-1 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition">
          Sync
        </span>
      </div>

      <!-- Bell -->
      <div class="relative group flex items-center">
        <router-link to="#" exact-active-class="menu_active">
          <i class='menu bx bxs-bell'></i>
        </router-link>
        <span class="absolute left-12 px-2 py-1 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition">
          Notifications
        </span>
      </div>

      <!-- Help -->
      <div class="relative group flex items-center">
        <router-link to="#" exact-active-class="menu_active">
          <i class='menu bx bxs-help-circle'></i>
        </router-link>
        <span class="absolute left-12 px-2 py-1 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition">
          Help
        </span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import Search from '@/views/Search.vue';

const showSearch = ref(false);
function toggleSearch() {
  showSearch.value = !showSearch.value;
}
</script>

<style>
.menu {
  @apply text-3xl text-slate-200 hover:text-slate-100;
}
.menu_active .menu {
  @apply text-white;
}
</style>
