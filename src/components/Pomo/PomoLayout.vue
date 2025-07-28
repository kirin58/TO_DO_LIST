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
            <button class="bg-orange-200 rounded-full px-6 py-2 text-orange-800">Pomo</button>
            <button class="bg-gray-200 rounded-full px-6 py-2 text-gray-500 cursor-not-allowed ml-2" disabled>Stopwatch</button>
        </div>
        <div class="justify-center flex items-center px-6 py-5 mt-4 text-xl text-stone-400 font-semibold">
            <p>
                Focus
            </p>
            <button class="ml-2 mt-1 text-2xl">
                <i class='bx  bx-chevron-right'></i> 
            </button>
            
        </div>
        <!-- นาฬิกา Pomodoro หรือ Relax -->
        <div class="w-full flex flex-col items-center justify-center " v-if="!showRelaxModal">
            <div class="flex flex-col items-center">
                <div class="flex items-center justify-center rounded-full border-4 border-gray-200 w-[400px] h-[400px] mb-8 mt-10">
                    <span class="text-8xl font-light select-none">
                        {{ minutes < 10 ? '0' + minutes : minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}
                    </span>
                </div>
            </div>
            <!-- Pomodoro Mode -->
            <template v-if="!isRelaxing">
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
        </div>
        <!-- Relax Modal -->
        <div v-if="showRelaxModal" class="inset-0 flex flex-col items-center justify-center z-50">
            <img src="/public/tomato.png" alt="tomato" class="w-1/3  mt-10" />
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
            minutes: 25, // เริ่มต้น 25 นาที
            seconds: 0,
            timer: null,
            running: false,
            isPaused: false,
            showRelaxModal: false,
            isRelaxing: false, // โหมดพัก
        };
    },
    methods: {
        startTimer() {
            if (this.running) return;
            this.running = true;
            this.isPaused = false;
            this.timer = setInterval(() => {
                if (this.seconds === 0) {
                    if (this.minutes === 0) {
                        clearInterval(this.timer);
                        this.running = false;
                        if (this.isRelaxing) {
                            // จบช่วงพัก
                            this.isRelaxing = false;
                            this.minutes = 25;
                            this.seconds = 0;
                        } else {
                            // จบ Pomodoro
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
            this.minutes = 25;
            this.seconds = 0;
            this.running = false;
            this.isPaused = false;
        },
        endRelax() {
            clearInterval(this.timer);
            this.isRelaxing = false;
            this.minutes = 25;
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
        }
    },
    mounted() {
        this.minutes = 25;
        this.seconds = 0;
    }
};
</script>