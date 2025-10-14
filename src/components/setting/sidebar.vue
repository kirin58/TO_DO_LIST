<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const show = ref(false)
const wrapper = ref(null)

function toggle() {
  show.value = !show.value
}

function goSettings() {
  show.value = false
  // เปลี่ยนเป็น router push ถ้าต้องการ
  window.location.href = '/setting'
}

function signOut() {
  show.value = false
  // ใส่ logic sign out จริงที่นี่
  alert('Signed out')
}

function handleClickOutside(e) {
  if (show.value && wrapper.value && !wrapper.value.contains(e.target)) {
    show.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<template>
  <div ref="wrapper" class="relative inline-block">
    <img
      src="https://i.pravatar.cc/40"
      alt="profile"
      class="w-10 h-10 rounded-sm cursor-pointer border border-gray-300"
      @click="toggle"
    />

    <transition name="fade">
      <div
        v-if="show"
        class="absolute left-12 -top-1 bg-white rounded-md shadow-lg border z-50 w-40"
        style="transform-origin: left top;"
      >
        <!-- little arrow -->
        <div class="absolute -left-2 top-3 w-2 h-2 bg-white rotate-45 border-t border-l border-gray-200"></div>

        <div class="px-3 py-2 text-xs text-gray-500 font-medium">Menu</div>
        <button
          class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          @click="goSettings"
        >
          <i class="bx bx-cog mr-2 text-base"></i> Settings
        </button>
        <button
          class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          @click="signOut"
        >
          <i class="bx bx-log-out mr-2 text-base"></i> Sign out
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .12s ease, transform .12s ease; }
.fade-enter-from { opacity: 0; transform: translateY(-4px) scale(.98); }
.fade-enter-to { opacity: 1; transform: translateY(0) scale(1); }
.fade-leave-from { opacity: 1; transform: translateY(0) scale(1); }
.fade-leave-to { opacity: 0; transform: translateY(-4px) scale(.98); }
</style>