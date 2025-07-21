<template>
    <div class="w-2/3">
        <div class="flex items-center justify-between px-6 py-8 h-28">
            <div class="font-semibold text-3xl text-stone-800">Pomodoro</div>
        </div>
        <div class="flex justify-center mt-4 font-bold text-xl ">
            <button class="bg-orange-200 rounded-full px-6 py-2 text-orange-800">Pomo</button>
            <button class="bg-gray-200 rounded-full px-6 py-2 text-gray-500 cursor-not-allowed ml-2" disabled>Stopwatch</button>
        </div>
        <!-- เพิ่มนาฬิกา Pomodoro แบบวงกลม -->
        <div class="w-full flex flex-col items-center justify-center mt-12">
            <div class="flex flex-col items-center">
                <div class="flex items-center justify-center rounded-full border-4 border-gray-200 w-[500px] h-[500px] mb-8">
                    <span class="text-6xl font-light select-none">
                        {{ minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}
                    </span>
                </div>
            </div>
            <!-- Start/Continue -->
            <button
                v-if="!running"
                class="w-50 bg-orange-400 hover:bg-orange-500 text-white font-semibold text-xl rounded-full px-10 py-3 transition mb-4"
                @click="startTimer"
            >
                {{ isPaused ? 'Continue' : 'Start' }}
            </button>
            <!-- End (แสดงเฉพาะตอน pause) -->
            <button
                v-if="!running && isPaused"
                class="w-50 bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition"
                @click="endTimer"
            >
                End
            </button>
            <!-- Pause (แสดงเฉพาะตอนจับเวลา) -->
            <button
                v-if="running"
                class="w-50 bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition"
                @click="pauseTimer"
            >
                Pause
            </button>
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
            minutes: 25,
            seconds: 0,
            timer: null,
            running: false,
            isPaused: false,
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
        }
    },
    mounted() {
        this.minutes = 25;
        this.seconds = 0;
    }
};
</script>