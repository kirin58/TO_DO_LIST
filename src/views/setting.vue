<script setup>
import NavBar from '@/components/NavBar.vue'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

// ตัวแปรควบคุม popup menu (เหมือน Search)
const show = ref(false)
const wrapper = ref(null)
const searchInput = ref(null)
const query = ref('')

// ✅ ตัวแปรควบคุม popup settings ก่อนเปลี่ยนหน้า
const showSettingsPage = ref(false)

// --- ฟังก์ชันสลับ popup หลัก (เมนูโปรไฟล์) ---
function toggle() {
  show.value = !show.value

  if (show.value) {
    nextTick(() => {
      if (searchInput.value) searchInput.value.focus()
    })
  }
}

// --- ปิด popup ปัจจุบัน ---
function closeSearch() {
  show.value = false
  showSettingsPage.value = false
}

// --- ไปหน้า settings จริง ---
function goSettings() {
  show.value = false
  showSettingsPage.value = true // ✅ แสดงหน้า popup เหมือน Search ก่อนเปลี่ยนหน้า

  // จำลองเหมือนเปิด popup "หน้าเชื่อม" ก่อนเข้า settings
  setTimeout(() => {
    window.location.href = '/setting'
  }, 800) // popup แสดงสั้น ๆ ก่อน redirect
}

// --- ปุ่ม sign out ---
function signOut() {
  show.value = false
  alert('Signed out')
}

// --- คลิกข้างนอกแล้วปิด popup ---
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

        <!-- ปุ่มปิดเหมือน Search -->
        <button
          class="flex justify-center text-xs text-red-500 w-full mt-2 pb-2"
          @click="closeSearch"
        >
          Close
        </button>
      </div>
    </transition>

    <!-- ✅ popup หน้าเชื่อมก่อนเข้าสู่ settings -->
    <transition name="fade">
      <div
        v-if="showSettingsPage"
        class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[999]"
      >
        <div class="bg-white p-6 rounded-xl shadow-lg w-[400px] text-center">
          <p class="text-gray-700 font-medium text-lg mb-2">Opening Settings...</p>
          <p class="text-gray-500 text-sm">Please wait</p>
        </div>
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
