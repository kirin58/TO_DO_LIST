<template>
    <div class="w-3/4 min-h-screen">
        <div class="flex items-center justify-between px-6 py-8 h-28">
            <div class="font-semibold text-3xl text-stone-800">Pomodoro</div>
            <div class="flex space-x-4 text-2xl text-stone-400">
                <button>
                    <i class='bx  bx-plus'></i> 
                </button>
                <button>
                    <i class='bx  bx-dots-horizontal-rounded'></i>
                </button>
            </div>
        </div>
        <div class="flex justify-center mt-4 font-bold text-xl ">
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
        <div class="justify-center flex items-center px-6 py-5 mt-4 text-xl text-stone-400 font-semibold">
            <p>
                Focus
            </p>
            <button class="ml-2 mt-1 text-2xl">
                <i class='bx  bx-chevron-right'></i> 
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
                                        class="text-center border-b border-gray-500 outline-none font-semibold"
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
                        class="w-56 bg-orange-400 hover:bg-orange-500 text-white font-semibold text-xl rounded-full px-10 py-3 transition mb-4"
                        @click="startTimer"
                    >
                        {{ isPaused ? 'Continue' : 'Start' }}
                    </button>
                    <button
                        v-if="!running && (isPaused || (minutes !== inputMinutes || seconds !== 0))"
                        class="w-56 bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition"
                        @click="endTimer"
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
                    class="w-56 bg-orange-400 hover:bg-orange-500 text-white font-semibold text-xl rounded-full px-10 py-3 transition mb-4"
                    @click="startStopwatch"
                >
                    {{ swPaused ? 'Continue' : 'Start' }}
                </button>
                <button
                    v-if="swRunning"
                    class="w-56 bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition"
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

<script>
export default {
    data() {
        return {
            // Pomodoro
            minutes: 25,
            seconds: 0,
            timer: null,
            running: false,
            isPaused: false,
            showRelaxModal: false,
            isRelaxing: false,
            showTimePopup: false,
            inputMinutes: 25,
            sessionStart: null,
            // Stopwatch
            mode: 'pomo',
            swMinutes: 0,
            swSeconds: 0,
            swTimer: null,
            swRunning: false,
            swPaused: false,

            sessions: JSON.parse(localStorage.getItem("sessions") || "[]")
        };
    },
    methods: {
        switchMode(mode) {
            this.mode = mode;
        },
        // Pomodoro
        startTimer() {
            if (this.running) return;
            this.running = true;
            this.isPaused = false;
            if (!this.sessionStart){
                this.sessionStart = new Date();
            }
            this.timer = setInterval(() => {
                if (this.seconds === 0) {
                    if (this.minutes === 0) {
                        clearInterval(this.timer);
                        this.running = false;
                        // Emit session เมื่อจับเวลาจบเอง
                        this.emitSession();
                        if (this.isRelaxing) {
                            this.isRelaxing = false;
                            this.minutes = this.inputMinutes;
                            this.seconds = 0;
                        } else {
                            this.showRelaxModal = true;
                        }
                    } else {
                        this.minutes--;
                        this.seconds = 59;
                    }
                } else {
                    this.seconds--;
                }
            }, 1000);
        },
        pauseTimer() {
            clearInterval(this.timer);
            this.running = false;
            this.isPaused = true;
        },
        endTimer() {
            clearInterval(this.timer);
            this.emitSession();
            this.minutes = this.inputMinutes;
            this.seconds = 0;
            this.running = false;
            this.isPaused = false;
            this.sessionStart = null;
        },
        emitSession() {
            if (this.sessionStart) {
                const end = new Date();
                // เวลาที่ผ่านไปจริง
                const diffMs = end - this.sessionStart;
                const usedMinutes = Math.floor(diffMs / 60000);
                const usedSeconds = Math.floor((diffMs % 60000) / 1000);

                const session = {
                    minutes: usedMinutes,
                    seconds: usedSeconds,
                    start: this.sessionStart,
                    end: end,
                };

                this.sessions.push(session);
                localStorage.setItem("sessions",JSON.stringify(this.sessions));

                this.$emit('pomo-ended', session);
                this.sessionStart = null;
            }
        },
        endRelax() {
            clearInterval(this.timer);
            this.isRelaxing = false;
            this.minutes = this.inputMinutes;
            this.seconds = 0;
            this.running = false;
            this.isPaused = false;
        },
        relax() {
            this.showRelaxModal = false;
            this.isRelaxing = true;
            this.minutes = 5;
            this.seconds = 0;
            this.running = false;
            this.isPaused = false;
        },
        skip() {
            this.showRelaxModal = false;
            this.endTimer();
        },
        exit() {
            this.showRelaxModal = false;
            this.endTimer();
        },
        openTimePopup() {
            this.inputMinutes = this.minutes;
            this.showTimePopup = true;
        },
        closeTimePopup() {
            this.showTimePopup = false;
        },
        setTime() {
            if (this.inputMinutes > 0) {
                this.minutes = this.inputMinutes;
                this.seconds = 0;
            }
            this.showTimePopup = false;
        },
        // Stopwatch
        startStopwatch() {
            if (this.swRunning) return;
            this.swRunning = true;
            this.swPaused = false;
            this.swTimer = setInterval(() => {
                this.swSeconds++;
                if (this.swSeconds >= 60) {
                    this.swSeconds = 0;
                    this.swMinutes++;
                }
            }, 1000);
        },
        pauseStopwatch() {
            clearInterval(this.swTimer);
            this.swRunning = false;
            this.swPaused = true;
        },
        resetStopwatch() {
            clearInterval(this.swTimer);
            this.swMinutes = 0;
            this.swSeconds = 0;
            this.swRunning = false;
            this.swPaused = false;
        },
        stopStopwatch() {
            clearInterval(this.swTimer);
            this.swRunning = false;
            this.swPaused = false;
        },
    },
    mounted() {
        this.minutes = 25;
        this.seconds = 0;
    }
};
</script>