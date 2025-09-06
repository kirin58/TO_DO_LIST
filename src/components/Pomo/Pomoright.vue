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
<script>
export default {
    props: {
        pomoSessions: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        todayPomo() {
            const today = new Date().toDateString();
            return this.pomoSessions.filter(
                s => new Date(s.end).toDateString() === today
            ).length;
        },
        todayFocus() {
            // รวมเวลาทั้งหมดของวันนี้ (นาที + วินาที)
            const today = new Date().toDateString();
            const totalSeconds = this.pomoSessions
                .filter(s => new Date(s.end).toDateString() === today)
                .reduce((sum, s) => sum + (s.minutes * 60 + (s.seconds || 0)), 0);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
        },
        totalPomo() {
            return this.pomoSessions.length;
        },
        totalFocus() {
            // รวมเวลาทั้งหมด (นาที + วินาที)
            const totalSeconds = this.pomoSessions
                .reduce((sum, s) => sum + (s.minutes * 60 + (s.seconds || 0)), 0);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return { minutes, seconds };
        },
        reversedSessions() {
            return [...this.pomoSessions].reverse();
        }
    },
    methods: {
        formatSession(session) {
            const start = new Date(session.start);
            const end = new Date(session.end);
            return `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')} - ${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`;
        }
    }
}
</script>