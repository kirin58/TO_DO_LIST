<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import PomoLayout from '@/components/Pomo/PomoLayout.vue'
import Pomoright from '@/components/Pomo/Pomoright.vue'

const sessions = ref(JSON.parse(localStorage.getItem("sessions") || "[]"))

function addSession(session) {
  sessions.value.push(session)
  localStorage.setItem("sessions", JSON.stringify(sessions.value))
}
</script>

<template>
  <div class="w-screen flex flex-row">
    <NavBar />
    <PomoLayout @pomo-ended="addSession" />
    <Pomoright :pomoSessions="sessions" />
  </div>
</template>