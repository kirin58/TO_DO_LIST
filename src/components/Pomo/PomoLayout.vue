<template>
  <div class="w-3/4 min-h-screen">
    <div class="flex items-center justify-start px-6 py-8 h-28">
      <div class="font-semibold text-3xl text-stone-800">Pomodoro</div>
    </div>

    <!-- Switch Mode -->
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

    <!-- ================== CLOCK SECTION ================== -->
    <div class="w-full flex flex-col items-center justify-center text-xl">
      <!-- Pomodoro Normal Mode -->
      <template v-if="mode === 'pomo' && !isRelaxing && !showPomoDone">
        <div class="flex flex-col items-center">
          <div
            class="flex items-center justify-center rounded-full border-4 border-gray-200 w-[400px] h-[400px] mb-8 mt-10 relative"
          >
            <span class="font-light text-7xl select-none">
              {{ minutes < 10 ? '0' + minutes : minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}
            </span>
            <button
              @click="openTimePopup"
              class="absolute right-6 bottom-6 text-zinc-400 hover:text-orange-400"
            >
              <i class="bx bx-cog text-3xl"></i>
            </button>

            <!-- Time Setting Popup -->
            <div
              v-if="showTimePopup"
              class="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2"
            >
              <div
                class="bg-white rounded-full shadow-lg flex flex-col items-center justify-center"
                style="width:150px; height:150px;"
              >
                <div class="flex flex-col items-center justify-center h-full w-full">
                  <div class="flex items-center justify-center mb-0">
                    <input
                      type="number"
                      min="1"
                      max="99"
                      v-model.number="inputMinutes"
                      class="text-center border-b border-gray-300 outline-none font-semibold"
                      style="font-size:1.8rem; width: 45px; height: 2.5rem;"
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

          <!-- Buttons -->
          <button
            v-if="!running"
            class="w-56 bg-orange-400 hover:bg-orange-500 text-white font-semibold text-xl rounded-full px-10 py-3 transition mb-4 mt-10"
            @click="startTimer"
          >
            {{ isPaused ? 'Continue' : 'Start' }}
          </button>

          <button
            v-if="running"
            class="w-56 bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition mt-10"
            @click="pauseTimer"
          >
            Pause
          </button>

          <button
            v-if="!running && (isPaused || (minutes !== inputMinutes || seconds !== 0))"
            class="w-56 bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition"
            @click="endTimer"
          >
            End
          </button>
        </div>
      </template>

      <!-- ================== Pomo Done Screen ================== -->
      <template v-if="showPomoDone">
        <div class="flex flex-col items-center mt-10">
          <img src="/public/tomato.png" alt="tomato" class="w-40 mb-4" />
          <p class="font-semibold text-xl mb-2">You’ve got a Pomo.</p>
          <p class="text-gray-500 mb-6">Relax for 5 mint</p>

          <button
            class="w-32 bg-emerald-400 hover:bg-emerald-500 text-white font-semibold rounded-full px-6 py-2 mb-2"
            @click="startRelaxMode"
          >
            Relax
          </button>

          <button
            class="w-32 bg-white border border-gray-300 text-gray-500 font-semibold rounded-full px-6 py-2 mb-2"
            @click="skipRelax"
          >
            Skip
          </button>

          <button
            class="w-32 bg-white border border-gray-300 text-gray-500 font-semibold rounded-full px-6 py-2"
            @click="exitPomodoro"
          >
            Exit
          </button>
        </div>
      </template>

      <!-- ================== RELAX MODE ================== -->
      <template v-if="isRelaxing">
        <div class="flex flex-col items-center justify-center mt-10">
          <div
            class="flex items-center justify-center rounded-full border-4 border-gray-200 w-[400px] h-[400px] mb-8"
          >
            <span class="font-light select-none text-7xl">
              {{ relaxMinutes < 10 ? '0' + relaxMinutes : relaxMinutes }}:{{ relaxSeconds < 10 ? '0' + relaxSeconds : relaxSeconds }}
            </span>
          </div>

          <button
            class="w-40 bg-white border border-orange-400 text-orange-500 font-semibold text-lg rounded-full px-8 py-2 transition mb-3 hover:bg-orange-50"
            @click="finishRelax"
          >
            Finish
          </button>

          <button
            class="w-40 bg-white border border-orange-400 text-orange-500 font-semibold text-lg rounded-full px-8 py-2 transition hover:bg-orange-50"
            @click="exitRelax"
          >
            Exit
          </button>
        </div>
      </template>

      <!-- ================== STOPWATCH MODE ================== -->
      <template v-if="mode === 'stopwatch'">
        <div class="flex flex-col items-center">
          <div
            class="flex items-center justify-center rounded-full border-4 border-gray-200 w-[400px] h-[400px] mb-8 mt-10"
          >
            <span class="font-light text-7xl">
              {{ swMinutes < 10 ? '0' + swMinutes : swMinutes }}:{{ swSeconds < 10 ? '0' + swSeconds : swSeconds }}
            </span>
          </div>

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
        </div>
      </template>
    </div>
  </div>
  
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['sessionEnded']) // ✅ เพิ่ม emit เพื่อส่งข้อมูล session กลับไป App.vue

// ---------- STATE ----------
const minutes = ref(25)
const seconds = ref(0)
const inputMinutes = ref(25)
const running = ref(false)
const isPaused = ref(false)
const timer = ref(null)
const mode = ref('pomo')
const showTimePopup = ref(false)

const isRelaxing = ref(false)
const showPomoDone = ref(false)

const relaxMinutes = ref(5)
const relaxSeconds = ref(0)
const relaxTimer = ref(null)

// สำหรับบันทึกเวลาเริ่มจับ
const sessionStart = ref(null)

// ---------- POMO ----------
function switchMode(newMode) {
  mode.value = newMode
}
function openTimePopup() {
  showTimePopup.value = true
}
function closeTimePopup() {
  showTimePopup.value = false
}
function setTime() {
  minutes.value = inputMinutes.value
  seconds.value = 0
  closeTimePopup()
}

// ✅ เริ่มจับเวลา Pomodoro
function startTimer() {
  if (running.value) return
  running.value = true
  isPaused.value = false
  sessionStart.value = new Date() // จดเวลาที่เริ่มจับจริง

  timer.value = setInterval(() => {
    if (seconds.value === 0 && minutes.value === 0) {
      clearInterval(timer.value)
      running.value = false
      showPomoDone.value = true
      recordSession() // ✅ จับเวลาจบและส่งข้อมูลออก
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
  running.value = false
  isPaused.value = false
  minutes.value = inputMinutes.value
  seconds.value = 0
}

// ✅ เมื่อจบ Pomodoro — สร้าง session object แล้ว emit ไป App.vue
function recordSession() {
  if (!sessionStart.value) return
  const end = new Date()
  const diffMs = end - sessionStart.value
  const usedMinutes = Math.floor(diffMs / 60000)
  const usedSeconds = Math.floor((diffMs % 60000) / 1000)

  const sessionData = {
    start: sessionStart.value,
    end,
    minutes: usedMinutes,
    seconds: usedSeconds,
    type: 'pomodoro',
  }

  emit('sessionEnded', sessionData) // ส่งข้อมูลให้ App.vue
  sessionStart.value = null
}

function exitPomodoro() {
  showPomoDone.value = false
  minutes.value = inputMinutes.value
  seconds.value = 0
}

// ---------- RELAX ----------
function startRelaxMode() {
  showPomoDone.value = false
  isRelaxing.value = true
  relaxMinutes.value = 5
  relaxSeconds.value = 0
  running.value = true

  relaxTimer.value = setInterval(() => {
    if (relaxSeconds.value === 0 && relaxMinutes.value === 0) {
      clearInterval(relaxTimer.value)
      finishRelax()
    } else if (relaxSeconds.value === 0) {
      relaxMinutes.value--
      relaxSeconds.value = 59
    } else {
      relaxSeconds.value--
    }
  }, 1000)
}

function skipRelax() {
  showPomoDone.value = false
  isRelaxing.value = false
  minutes.value = inputMinutes.value
  seconds.value = 0
}

function finishRelax() {
  clearInterval(relaxTimer.value)
  isRelaxing.value = false
  running.value = false
  minutes.value = inputMinutes.value
  seconds.value = 0
}

function exitRelax() {
  clearInterval(relaxTimer.value)
  isRelaxing.value = false
  running.value = false
  minutes.value = inputMinutes.value
  seconds.value = 0
}

// ---------- STOPWATCH ----------
const swMinutes = ref(0)
const swSeconds = ref(0)
const swTimer = ref(null)
const swRunning = ref(false)
const swPaused = ref(false)
const swStart = ref(null)

function startStopwatch() {
  if (swRunning.value) return
  swRunning.value = true
  swPaused.value = false
  if (!swStart.value) swStart.value = new Date()

  swTimer.value = setInterval(() => {
    const now = new Date()
    const diffMs = now - swStart.value
    swMinutes.value = Math.floor(diffMs / 60000)
    swSeconds.value = Math.floor((diffMs % 60000) / 1000)
  }, 1000)
}

function pauseStopwatch() {
  clearInterval(swTimer.value)
  swRunning.value = false
  swPaused.value = true
}

function resetStopwatch() {
  clearInterval(swTimer.value)
  swMinutes.value = 0
  swSeconds.value = 0
  swRunning.value = false
  swPaused.value = false
  swStart.value = null
}
</script>
