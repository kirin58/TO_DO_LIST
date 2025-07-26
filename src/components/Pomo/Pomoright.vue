<template>
    <div class="w-1/4 min-h-screen">
        <div class="font-semibold text-2xl text-stone-800  px-6 py-10">
            Overview
        </div>
        <div class="overview">
            <div class="timer">
                <p class="text">Today's Pomo</p>
                <p class="minute">0</p>
            </div>
            <div class="timer">
                <p class="text">Today's Focus</p>
                <p class="minute">0m</p>
            </div>
            <div class="timer">
                <p class="text">Total Pomo</p>
                <p class="minute">0</p>
            </div>
            <div class="timer">
                <p class="text">Total Focus Duration</p>
                <p class="minute">0m</p>
            </div>
        </div>


        <div class="flex items-center justify-between px-6 py-8 h-28 mt-10">
            <div class="font-semibold text-2xl text-stone-800  px-6 py-10 ">
                Focus Record
            </div>
            <div class="flex space-x-4 text-2xl text-stone-400">
                <button>
                    <i class='bx  bx-plus'  ></i> 
                </button>
            </div>
        </div>
        <div class="flex items-center justify-center h-1/2">
            <div class="relative w-56 h-56">
                <img
                src="/public/tomatoglass.png"
                alt="Tomato Glass"
                class="w-full h-full object-contain opacity-80"
                />
            </div>
        </div>
  </div>
</template>

<style scoped>
    .overview {
        @apply grid grid-cols-2 
        gap-5  
        ml-5 mr-5
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