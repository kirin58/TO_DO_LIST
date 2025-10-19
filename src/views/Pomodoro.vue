<script setup>
import { ref, watch } from 'vue'
import NavBar from '@/components/NavBar.vue'
import PomoLayout from '@/components/Pomo/PomoLayout.vue'
import PomoRight from '@/components/Pomo/Pomoright.vue'

// โหลดจาก localStorage
const sessions = ref(JSON.parse(localStorage.getItem('sessions') || '[]'))

// อัปเดตลง localStorage อัตโนมัติเมื่อ sessions เปลี่ยน
watch(sessions, (val) => {
  localStorage.setItem('sessions', JSON.stringify(val))
}, { deep: true })

// รับข้อมูลจาก PomoLayout ตอนจับเวลาจบ
function addSession(session) {
  sessions.value.unshift(session)
}
</script>

<template>
  <div class="w-screen flex flex-row">
    <NavBar />
    <!-- ส่วนกลาง: เพิ่มเส้นคั่นขวา -->
    <div class="flex-1 flex border-r border-gray-200">
      <PomoLayout @sessionEnded="addSession" class="flex-1" />
    </div>

    <!-- ฝั่งขวา -->
    <PomoRight :sessions="sessions" />
  </div>
</template>
