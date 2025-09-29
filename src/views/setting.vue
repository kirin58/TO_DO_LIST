<template>
  <div class="h-screen flex justify-center items-center bg-gray-100">
    <div class="relative">
      <!-- รูปโปรไฟล์ -->
      <img
        src="https://i.pravatar.cc/40"
        alt="profile"
        class="w-12 h-12 rounded-full cursor-pointer border-2 border-gray-400"
        @click="toggleMenu"
      />

      <!-- เมนู dropdown ข้างขวา -->
      <div
        v-if="showMenu"
        ref="menuRef"
        class="absolute top-0 left-14 bg-white rounded-md shadow-lg py-2 w-40 z-50 border"
      >
        <p class="px-4 py-2 text-sm font-bold text-gray-700">✅ TEST MENU</p>
        <button
          class="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
          @click="goToSettings"
        >
          <i class="bx bx-cog mr-2"></i> Settings
        </button>
        <button
          class="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
          @click="signOut"
        >
          <i class="bx bx-log-out mr-2"></i> Sign out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showMenu = ref(false)
const menuRef = ref(null)

function toggleMenu() {
  showMenu.value = !showMenu.value
  console.log("showMenu =", showMenu.value) // ดูใน console ว่าทำงานมั้ย
}

function goToSettings() {
  showMenu.value = false
  alert('ไปหน้า Settings!')
}

function signOut() {
  showMenu.value = false
  alert('Signed out!')
}

function handleClickOutside(event) {
  if (
    showMenu.value &&
    menuRef.value &&
    !menuRef.value.contains(event.target) &&
    event.target.tagName !== 'IMG'
  ) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
