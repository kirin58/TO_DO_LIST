<script>
  import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <body class="w-screen h-screen flex flex-row bg-gray-100">
    <!-- Sidebar -->
    <NavBar />

    <!-- Main Content -->
    <div class="flex-1 p-8 flex justify-center items-center">
      <!-- Calendar Container -->
      <div class="bg-white rounded-lg shadow-lg w-[1749px] h-[821px] flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-xl font-bold">Calendar</h2>
          <div class="flex items-center gap-3">
            <button class="px-3 py-1 border rounded-md">Month</button>
            <div class="flex items-center">
              <div class="flex items-center justify-between w-[250px]">
                <button @click="prevMonth" class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">&#8592;</button>
                <span class="font-semibold text-lg w-[150px] text-center">{{ monthName }} {{ currentYear }}</span>
                <button @click="nextMonth" class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">&#8594;</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Calendar -->
        <div class="flex flex-col flex-1">
          <!-- Header Days -->
          <div class="grid grid-cols-7">
            <div
              v-for="(day, index) in weekDays"
              :key="index"
              class="text-center font-medium bg-gray-50 h-10 flex items-center justify-center"
            >
              {{ day }}
            </div>
          </div>

          <!-- Calendar Cells -->
          <div class="grid grid-cols-7 grid-rows-6 flex-1 gap-[1px] bg-gray-100">
            <div
              v-for="(day, index) in daysInMonthView"
              :key="index"
              class="relative bg-white p-2 flex flex-col"
            >
              <div class="flex items-center gap-2">
                <!-- Highlight Today - Left side -->
                <div
                  v-if="day.isToday"
                  class="w-5 h-5 flex items-center justify-center rounded-full bg-orange-400 text-white text-xs"
                >
                  {{ day.date }}
                </div>
                <!-- Date Number -->
                <div class="text-sm text-gray-500" :class="{ 'ml-0': !day.isToday }">
                  {{ !day.isToday ? day.date : '' }}
                </div>
              </div>

              <!-- Events -->
              <div
                v-for="(event, eIndex) in day.events"
                :key="eIndex"
                class="mt-1 text-xs px-2 py-1 rounded-sm text-white cursor-pointer"
                :class="event.color"
              >
                {{ event.title }}
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

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const events = [
  // Add your events here
];

const monthName = computed(() =>
  new Date(currentYear.value, currentMonth.value).toLocaleString("en-US", {
    month: "long",
  })
);

const daysInMonthView = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);

  const days = [];

  // Fill empty days before first day of month
  for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
    days.push({ date: "", events: [] });
  }

  // Fill days of month
  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push({
      date: d,
      isToday:
        d === today.getDate() &&
        currentMonth.value === today.getMonth() &&
        currentYear.value === today.getFullYear(),
      events: events.filter((e) => e.date === dateStr),
    });
  }

  // Fill remaining cells to complete 42 cells (6x7 grid)
  while (days.length < 42) {
    days.push({ date: "", events: [] });
  }

  return days;
});

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
}
</script>