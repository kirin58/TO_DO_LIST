<template>
    <div class="w-3/4 min-h-screen">
        <div class="flex items-center justify-start px-6 py-8 h-28">
            <div class="font-semibold text-3xl text-stone-800">Pomodoro</div>
        </div>
        <div class="flex justify-center mt-4 mb-20 font-bold text-xl ">
            <button
                :class="['rounded-full px-6 py-2', mode === 'pomo' ? 'bg-orange-200 text-orange-800' : 'bg-gray-200 text-gray-500']"
                @click="switchMode('pomo')"
            >
                Pomo
            </button>
            <button
                :class="['rounded-full px-6 py-2 ml-2', mode === 'stopwatch' ? 'bg-orange-200 text-orange-800' : 'bg-gray-200 text-gray-500']"
                @click="switchMode('stopwatch')"
            >
                Stopwatch
            </button>
        </div>

        <!-- นาฬิกา Pomodoro หรือ Relax หรือ Stopwatch -->
        <div class="w-full flex flex-col items-center justify-center text-xl" v-if="!showRelaxModal">
            <div class="flex flex-col items-center">
                <div class="flex items-center justify-center rounded-full border-4 border-gray-200 w-[400px] h-[400px] mb-8 mt-10 relative">
                    <span
                        class="font-light select-none flex items-center justify-center w-full h-full text-7xl leading-none"
                        style="line-height: 1; text-align: center;"
                    >
                        <!-- แสดงเวลาตามโหมด -->
                        <template v-if="mode === 'pomo'">
                            {{ minutes < 10 ? '0' + minutes : minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}
                        </template>
                        <template v-else>
                            {{ swMinutes < 10 ? '0' + swMinutes : swMinutes }}:{{ swSeconds < 10 ? '0' + swSeconds : swSeconds }}
                        </template>
                    </span>
                    <!-- ปุ่มตั้งเวลา (เฉพาะ Pomodoro) -->
                    <button v-if="mode === 'pomo'" @click="openTimePopup" class="absolute right-6 bottom-6 text-zinc-400 hover:text-orange-400">
                        <i class='bx bx-cog text-3xl'></i>
                    </button>
                    <!-- Popup ตั้งเวลา -->
                    <div v-if="showTimePopup && mode === 'pomo'" class="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2">
                        <div
                            class="bg-white rounded-full shadow-lg flex flex-col items-center justify-center  gray-200"
                            style="width:150px; height:150px; display: flex; justify-content: center; align-items: center;"
                        >
                            <div class="flex flex-col items-center justify-center h-full w-full">
                                <div class="flex items-center justify-center gap-0 mb-0 w-full">
                                    <input
                                        type="number"
                                        min="1"
                                        max="99"
                                        v-model.number="inputMinutes"
                                        class="text-center border-b border-gray-300 outline-none font-semibold"
                                        style="font-size:1.8rem; width: 45px; height: 2.5rem; line-height: 2.2rem;"
                                    />
                                    <span class="text-gray-500 text-xl ml-1">Min</span>
                                </div>
                                <div class="flex gap-2 mt-2">
                                    <button @click="closeTimePopup" class="px-2 py-1 rounded bg-gray-100 text-gray-500 text-sm">Cancel</button>
                                    <button @click="setTime" class="px-3 py-1 rounded bg-orange-400 text-white text-sm font-semibold">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Pomodoro Mode -->
            <template v-if="mode === 'pomo'">
                <template v-if="!isRelaxing">
                    <button
                        v-if="!running"
                        class="w-56 bg-orange-400 hover:bg-orange-500 text-white font-semibold text-xl rounded-full px-10 py-3 transition mb-4 mt-10"
                        @click="startTimer"
                    >
                        {{ isPaused ? 'Continue' : 'Start' }}
                    </button>
                    <button
                        v-if="!running && (isPaused || (minutes !== inputMinutes || seconds !== 0))"
                        class="w-56 bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition "
                        @click="endTimer"
                    >
                        End
                    </button>
                    <button
                        v-if="running"
                        class="w-56 bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition mt-10"
                        @click="pauseTimer"
                    >
                        Pause
                    </button>
                </template>
                <!-- Relax Mode -->
                <template v-else>
                    <button
                        v-if="!running"
                        class="w-56 bg-orange-400 hover:bg-orange-500 text-white font-semibold text-xl rounded-full px-10 py-3 transition mb-4"
                        @click="startTimer"
                    >
                        {{ isPaused ? 'Continue' : 'Start' }}
                    </button>
                    <button
                        v-if="!running && isPaused"
                        class="w-56 bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition"
                        @click="endRelax"
                    >
                        End
                    </button>
                    <button
                        v-if="running"
                        class="w-56 bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition"
                        @click="pauseTimer"
                    >
                        Pause
                    </button>
                </template>
            </template>
            <!-- Stopwatch Mode -->
            <template v-else>
                <button
                    v-if="!swRunning"
                    class="w-56 bg-orange-400 hover:bg-orange-500 text-white font-semibold text-xl rounded-full px-10 py-3 transition mb-4 mt-10"
                    @click="startStopwatch"
                >
                    {{ swPaused ? 'Continue' : 'Start' }}
                </button>
                <button
                    v-if="swRunning"
                    class="w-56 bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition mt-10"
                    @click="pauseStopwatch"
                >
                    Pause
                </button>
                <button
                    v-if="!swRunning && (swMinutes > 0 || swSeconds > 0)"
                    class="w-56 bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition mt-2"
                    @click="resetStopwatch"
                >
                    Reset
                </button>
            </template>
        </div>
        <!-- Relax Modal -->
        <div v-if="showRelaxModal" class="inset-0 flex flex-col items-center justify-center">
            <img src="/public/tomato.png" alt="tomato" class="w-1/4  mt-10" />
            <div class="text-2xl font-bold mb-2">You've got a Pomo.</div>
            <div class="text-gray-500 mb-6">Relax for 5 minutes</div>
            <button class="w-56 bg-emerald-300 hover:bg-emerald-400 text-white font-semibold text-xl rounded-full px-10 py-3 mb-3" @click="relax">Relax</button>
            <button class="w-56 bg-white border border-emerald-400 text-emerald-500 font-semibold text-xl rounded-full px-10 py-3 mb-3" @click="skip">skip</button>
            <button class="w-56 bg-white border border-emerald-400 text-emerald-500 font-semibold text-xl rounded-full px-10 py-3" @click="exit">Exit</button>
        </div>
    </div>
    <div>
        <div class="bg-zinc-300 h-screen w-px"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/supabase'

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
      payload => {
        callback(payload.new)
      }
    )
    .subscribe()
  return subscription
}

// --- Pomodoro methods ---
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
    await addSession(session)   // save to Supabase
  } catch (err) {
    console.error('Error saving session:', err)
  }

  emit('pomoEnded', session)
  sessionStart.value = null
}

onMounted(() => { minutes.value = 25; seconds.value = 0 })
</script>

