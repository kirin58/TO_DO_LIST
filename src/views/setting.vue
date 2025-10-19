<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/setting/sidebar.vue'
const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['close'])

const wrapper = ref(null)
const router = useRouter()

function signOut() {
  emit('close')
  alert('Signed out')
  router.push({ path: '/' })
}

const showSidebar = ref(false)
function closeSidebar() {
  showSidebar.value = false
}
function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

function handleClickOutside(e) {
  if (props.show && wrapper.value && !wrapper.value.contains(e.target)) {
    emit('close')
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<template>
  <div ref="wrapper" class="relative inline-block">
    <transition name="fade">
      <div
        v-if="show"
        class="absolute left-12 top-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg border z-50 w-40"
        style="transform-origin: left center;"
      >
        <!-- little arrow -->
        <div class="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-t border-l border-gray-200"></div>

        <div class="px-3 py-2 text-xs text-gray-500 font-medium">Menu</div>

        <button
          class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          @click="toggleSidebar"
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
  <Sidebar
    v-if="showSidebar"
    :show="showSidebar"
    @close="closeSidebar"
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
  />
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .12s ease, transform .12s ease; }
.fade-enter-from { opacity: 0; transform: translateY(-4px) scale(.98); }
.fade-enter-to { opacity: 1; transform: translateY(0) scale(1); }
.fade-leave-from { opacity: 1; transform: translateY(0) scale(1); }
.fade-leave-to { opacity: 0; transform: translateY(-4px) scale(.98); }
</style>