<template>
    <div class="w-1/4 min-h-screen">
        <div class="font-semibold text-2xl text-stone-800  px-6 py-10">
            Overview
        </div>
        <div class="overview">
            <div class="timer">
                <p class="text">Today's Pomo</p>
                <p class="minute">{{ todayPomo }}</p>
            </div>
            <div class="timer">
                <p class="text">Today's Focus</p>
                <p class="minute">{{ todayFocus }}</p>
            </div>
            <div class="timer">
                <p class="text">Total Pomo</p>
                <p class="minute">{{ totalPomo }}</p>
            </div>
            <div class="timer">
                <p class="text">Total Focus Duration</p>
                <p class="minute">
                    {{ totalFocus.minutes }}m{{ totalFocus.seconds > 0 ? ' ' + totalFocus.seconds + 's' : '' }}
                </p>
            </div>
        </div>

        <div class="flex items-center justify-between px-6 py-8 h-28 mt-10">
            <div class="font-semibold text-2xl text-stone-800  py-10 ">
                Focus Record
            </div>
        </div>
        <div class="flex items-center justify-center h-1/2" v-if="pomoSessions.length === 0">
            <div class="relative w-56 h-56">
                <img
                src="/public/tomatoglass.png"
                alt="Tomato Glass"
                class="w-full h-full object-contain opacity-80"
                />
            </div>
        </div>
        <div class="px-6" v-if="pomoSessions.length > 0">
            <div v-for="(session, idx) in reversedSessions" :key="idx" class="flex items-center justify-between py-1">
                <span class="text-orange-400 font-bold">
                    <i class='bx bx-timer'></i>
                </span>
                <span class="ml-2 text-gray-700 text-sm">
                    {{ formatSession(session) }}
                </span>
                <span class="ml-auto text-gray-400 text-xs">
                    {{ session.minutes }}m{{ session.seconds > 0 ? ' ' + session.seconds + 's' : '' }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .overview {
        @apply grid grid-cols-2 
        gap-5  
        ml-6 mr-6
        ;
    }
    .timer {
        @apply bg-orange-100 
        p-4 
        rounded-md 
        w-full;
    }
    .text {
        @apply text-sm 
        text-gray-600;
    }
    .minute {
        @apply text-2xl 
        font-semibold 
        text-gray-800;
    }
</style>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

// --- Supabase setup ---
const SUPABASE_URL = 'https://your-project-ref.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// --- Pomodoro state ---
const minutes = ref(25)
const seconds = ref(0)
const timer = ref(null)
const running = ref(false)
const isPaused = ref(false)
const inputMinutes = ref(25)
const sessionStart = ref(null)
const showTimePopup = ref(false)
const mode = ref('pomo')
const isRelaxing = ref(false)
const emit = defineEmits(['pomoEnded'])

// --- Sessions state ---
const sessions = ref([])

// --- Supabase functions ---
async function addSession(session) {
  const { data, error } = await supabase
    .from('sessions')
    .insert([session])
    .select()
  if (error) {
    console.error('❌ Supabase addSession error:', error.message)
    return null
  }
  return data[0]
}

async function getAllSessions() {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .order('end', { ascending: false })
  if (error) {
    console.error('❌ Supabase getAllSessions error:', error.message)
    return []
  }
  return data
}

function subscribeSessions(callback) {
  const subscription = supabase
    .channel('public:sessions')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'sessions' },
      payload => callback(payload.new)
    )
    .subscribe()
  return subscription
}

// --- Pomodoro Methods ---
function switchMode(newMode) { mode.value = newMode }
function openTimePopup() { showTimePopup.value = true }
function closeTimePopup() { showTimePopup.value = false }
function setTime() { minutes.value = inputMinutes.value; seconds.value = 0; closeTimePopup() }

function startTimer() {
  if (running.value) return
  running.value = true
  isPaused.value = false
  if (!sessionStart.value) sessionStart.value = new Date()
  minutes.value = inputMinutes.value
  seconds.value = 0

  timer.value = setInterval(() => {
    if (seconds.value === 0 && minutes.value === 0) {
      clearInterval(timer.value)
      running.value = false
      emitSession()
    } else if (seconds.value === 0) {
      minutes.value--
      seconds.value = 59
    } else {
      seconds.value--
    }
  }, 1000)
}

function pauseTimer() {
  clearInterval(timer.value)
  running.value = false
  isPaused.value = true
}

function endTimer() {
  clearInterval(timer.value)
  emitSession()
  minutes.value = inputMinutes.value
  seconds.value = 0
  running.value = false
  isPaused.value = false
  sessionStart.value = null
}

async function emitSession() {
  if (!sessionStart.value) return
  const end = new Date()
  const diffMs = end - sessionStart.value
  const usedMinutes = Math.floor(diffMs / 60000)
  const usedSeconds = Math.floor((diffMs % 60000) / 1000)

  const session = {
    start: sessionStart.value.toISOString(),
    end: end.toISOString(),
    minutes: usedMinutes,
    seconds: usedSeconds
  }

  try {
    const saved = await addSession(session)
    if (saved) sessions.value.unshift(saved)
  } catch (err) {
    console.error(err)
  }

  emit('pomoEnded', session)
  sessionStart.value = null
}

// --- Computed ---
const todayPomo = computed(() => {
  const today = new Date().toDateString()
  return sessions.value.filter(s => new Date(s.end).toDateString() === today).length
})

const todayFocus = computed(() => {
  const today = new Date().toDateString()
  const totalSeconds = sessions.value
    .filter(s => new Date(s.end).toDateString() === today)
    .reduce((sum, s) => sum + (s.minutes * 60 + (s.seconds || 0)), 0)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`
})

const totalPomo = computed(() => sessions.value.length)

const totalFocus = computed(() => {
  const totalSeconds = sessions.value.reduce((sum, s) => sum + (s.minutes * 60 + (s.seconds || 0)), 0)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return { minutes, seconds }
})

const reversedSessions = computed(() => [...sessions.value].reverse())

function formatSession(s) {
  const start = new Date(s.start)
  const end = new Date(s.end)
  return `${start.getHours()}:${start.getMinutes().toString().padStart(2,'0')} - ${end.getHours()}:${end.getMinutes().toString().padStart(2,'0')}`
}

// --- Lifecycle ---
onMounted(async () => {
  sessions.value = await getAllSessions()
  subscribeSessions(newSession => sessions.value.unshift(newSession))
})
</script>

