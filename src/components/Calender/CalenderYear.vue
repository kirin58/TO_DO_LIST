<template>
  <body class="w-screen h-screen flex flex-row bg-gray-100">
    <NavBar />
    <!-- Main Content -->
    <div class="flex-1 p-8 flex justify-center items-start">
      <!-- Calendar Container -->
      <div class="bg-white rounded-lg shadow-lg w-[1749px] h-[821px] p-8">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold">Calendar</h2>
          <div class="flex items-center gap-3">
            <div class="relative">
              <button @click="CalenderMonth" class="px-3 py-1 border rounded-md">Year</button>
            </div>
            <div class="flex items-center">
              <button
                @click="prevYear"
                class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
              >
                &#8592;
              </button>
              <span class="font-semibold text-lg w-[100px] text-center">
                {{ currentYear }}
              </span>
              <button
                @click="nextYear"
                class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>

        <!-- Year Calendar -->
        <div class="grid grid-cols-4 grid-rows-3 gap-x-16 gap-y-10">
          <div
            v-for="(month, index) in months"
            :key="index"
            class="flex flex-col"
          >
            <!-- Month Name -->
            <h3 class="font-semibold mb-2 text-sm text-center">{{ monthNames[index] }}</h3>

            <!-- Days header -->
            <div class="grid grid-cols-7 text-xs text-gray-500 mb-1">
              <div
                v-for="(d, i) in weekDays"
                :key="i"
                class="text-center"
              >
                {{ d }}
              </div>
            </div>

            <!-- Days -->
            <div class="grid grid-cols-7 text-[13px] leading-6">
              <div
                v-for="(day, i) in month"
                :key="i"
                class="h-6 text-center"
                :class="{
                  'text-gray-300': !day.inMonth,
                  'bg-orange-200 text-black rounded-full': day.isToday
                }"
              >
                {{ day.date }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router'
import NavBar from "../NavBar.vue";
const router = useRouter()

function CalenderMonth() {
  router.push('/calendar-month')
}
const today = new Date();
const currentYear = ref(today.getFullYear());

const weekDays = ["Su", "M", "Tu", "W", "Th", "F", "Se"];
const monthNames = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

// สร้างปฏิทินทั้งปี
const months = computed(() => {
  const year = currentYear.value;
  const result = [];

  for (let m = 0; m < 12; m++) {
    const firstDay = new Date(year, m, 1);
    const lastDay = new Date(year, m + 1, 0);

    const days = [];

    // เติมช่องว่างก่อนวันแรก
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({ date: "", inMonth: false });
    }

    // เติมวันในเดือน
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push({
        date: d,
        inMonth: true,
        isToday:
          d === today.getDate() &&
          m === today.getMonth() &&
          year === today.getFullYear(),
      });
    }

    result.push(days);
  }

  return result;
});

function prevYear() {
  currentYear.value -= 1;
}
function nextYear() {
  currentYear.value += 1;
}
</script>


