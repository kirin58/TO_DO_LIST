<template>
    <div class="w-2/3">
        <div class="flex items-center justify-between px-6 py-8 h-28">
            <div class="font-semibold text-3xl text-stone-800">Pomodoro</div>
        </div>
        <div class="flex justify-center mt-4 font-bold text-xl ">
            <button class="bg-orange-200 rounded-full px-6 py-2 text-orange-800  ">Pomo</button>
            <button class="bg-gray-200 rounded-full px-6 py-2 text-gray-500  cursor-not-allowed ml-2" disabled>Stopwatch</button>
        </div>
            <!-- เพิ่มนาฬิกา Pomodoro แบบวงกลม -->
        <div class="w-full flex flex-col items-center justify-center mt-12">
            <div class="flex flex-col items-center">
                <div class="flex items-center justify-center rounded-full border-4 border-gray-200 w-80 h-80 mb-8">
                    <span class="text-6xl font-light select-none">
                        {{ minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}
                    </span>
                </div>
            </div>
            <button
                :class="running 
                ? 'bg-white border border-orange-300 text-orange-400 font-semibold text-xl rounded-full px-10 py-3 transition' 
                : 'bg-orange-300 hover:bg-orange-400 text-white font-semibold text-xl rounded-full px-10 py-3 transition'"
                @click="running ? pauseTimer() : startTimer()"
                >
                {{ running ? 'Pause' : 'Start' }}
            </button>
        </div>
    </div>
    <div>
        <div class="bg-zinc-300 h-screen w-px">
        </div>
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
        };
    },
    methods: {
        startTimer() {
            if (this.running) return;
            this.running = true;
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
        }
    },
    beforeUnmount() {
        clearInterval(this.timer);
    }
};
</script>