<template>
  <header class="min-h-screen w-16 bg-orange-300 flex flex-col items-center justify-between p-2 gap-2">
    <div class="h-4/6 w-full flex flex-col items-center gap-10">
      <!-- ✅ ปุ่มนี้คือปุ่มเปิดหน้า Settings (ก่อนเข้าสู่หน้า settings จริง) -->
      <button class="w-10 h-10 rounded-lg  mt-2 overflow-hidden" @click="toggleSettings">
        <img src="https://i.pravatar.cc/40" alt="profile" class="w-full h-full object-cover" />
      </button>

      <nav class="h-1/2 w-full flex flex-col items-center justify-between">
        
        <!-- Inbox -->
        <div class="flex items-center">
          <router-link to="/Inbox" exact-active-class="menu_active" class="relative inline-flex group w-fit">
            <i class='menu bx bxs-check-square'></i>
            <span class="absolute left-8 px-2 py-1 text-sm text-white bg-black rounded-md 
                         opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Task
            </span>
          </router-link>
        </div>

        <!-- Search -->
        <div class="flex items-center">
          <button @click="toggleSearch" class="relative inline-flex group w-fit">
            <i class='menu bx bx-search'></i>
            <span class="absolute left-8 px-2 py-1 text-sm text-white bg-black rounded-md 
                         opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Search
            </span>
          </button>
        </div>

        <!-- ✅ popup Search -->
        <Search
          v-if="showSearch"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        />

        <!-- ✅ popup Settings (ใหม่ เพิ่มเหมือน Search) -->
        <Settings
          :show="showSettings"
          @close="showSettings = false"
          class="absolute bottom-1/2 transform -translate-x-1/2 z-50"
        />

        <!-- Calendar -->
        <div class="flex items-center">
          <router-link to="/Calender" exact-active-class="menu_active" class="relative inline-flex group w-fit">
            <i class='menu bx bx-calendar'></i>
            <span class="absolute left-8 px-2 py-1 text-sm text-white bg-black rounded-md 
                         opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Calendar
            </span>
          </router-link>
        </div>

        <!-- Pomodoro -->
       <div class="flex items-center">
          <router-link to="/Pomodoro" exact-active-class="menu_active" class="relative inline-flex group w-fit">
            <i class='menu bx bxs-alarm'></i>
            <span class="tooltip absolute left-8 px-2 py-1 text-sm text-white bg-black rounded-md 
                       opacity-0 group-hover:opacity-100 transition pointer-events-none z-[1000]">
              Pomodoro
            </span>
          </router-link>
        </div>

        <!-- Matrix -->
        <div class="flex items-center">
          <router-link to="/Matrix" exact-active-class="menu_active" class="relative inline-flex group w-fit">
            <i class='menu bx bxs-grid'></i>
            <span class="absolute left-8 px-2 py-1 text-sm text-white bg-black rounded-md 
                         opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Matrix
            </span>
          </router-link>
        </div>
      </nav>
    </div>

    <div class="h-1/5 flex flex-col justify-between">
      <!-- Sync -->
      <div class="flex items-center">
        <router-link to="#" exact-active-class="menu_active" class="relative inline-flex group w-fit">
          <i class="menu bx bx-refresh"></i>
          <span class="absolute left-8 px-2 py-1 text-sm text-white bg-black rounded-md 
                       opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Sync
          </span>
        </router-link>
      </div>

      <!-- Bell -->
      <div class="flex items-center">
        <router-link to="#" exact-active-class="menu_active" class="relative inline-flex group w-fit">
          <i class='menu bx bxs-bell'></i>
          <span class="absolute left-8 px-2 py-1 text-sm text-white bg-black rounded-md 
                       opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Notifications
          </span>
        </router-link>
      </div>

      <!-- Help -->
      <div class="flex items-center">
        <router-link to="#" exact-active-class="menu_active" class="relative inline-flex group w-fit">
          <i class='menu bx bxs-help-circle'></i>
          <span class="absolute left-8 px-2 py-1 text-sm text-white bg-black rounded-md 
                       opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Help
          </span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import Search from '@/views/Search.vue'
import Settings from '@/views/setting.vue' // ✅ import Settings.vue

const showSearch = ref(false)
const showSettings = ref(false)

function toggleSearch() {
  showSearch.value = !showSearch.value
  if (showSettings.value) showSettings.value = false
}

function toggleSettings() {
  showSettings.value = !showSettings.value
  if (showSearch.value) showSearch.value = false
}
</script>

<style>
.menu {
  @apply text-3xl text-slate-200 hover:text-slate-100;
}
.menu_active .menu {
  @apply text-white;
}
.tooltip {
  z-index: 1000;
}
.group:hover .tooltip {
  z-index: 1000;
}
</style>
