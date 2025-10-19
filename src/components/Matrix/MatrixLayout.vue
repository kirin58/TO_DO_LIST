<template>
  <div class="w-screen h-screen flex flex-row bg-[#f8f6f4]">
    <NavBar />
    <div class="flex-1 p-6">
      <h2 class="font-semibold text-3xl text-stone-800 mb-4">Eisenhower Matrix</h2>
      <div class="grid grid-cols-2 grid-rows-2 gap-6 h-[92vh]">
        <!-- Not Urgent & Important (ซ้ายบน) -->
        <div class="bg-white rounded-[8px] shadow-md p-6 min-h-[270px] flex flex-col h-full">
          <div class="flex justify-between items-center mb-2">
            <span class="text-base font-semibold text-orange-500">Not Urgent & Important</span>
            <div class="flex gap-2">
              <button class="text-gray-400 hover:text-gray-600 text-xl">+</button>
              <button class="text-gray-400 hover:text-gray-600 text-xl">…</button>
            </div>
          </div>
          <div class="flex-1 flex items-center justify-center text-gray-200 select-none text-lg">
            No Tasks
          </div>
        </div>

        <!-- Urgent & Important (ขวาบน) -->
        <div class="bg-white rounded-[8px] shadow-md p-6 min-h-[270px] flex flex-col h-full">
          <div class="flex justify-between items-center mb-2">
            <span class="text-base font-semibold text-red-500">Urgent & Important</span>
            <div class="flex gap-2">
              <button class="text-gray-400 hover:text-gray-600 text-xl">+</button>
              <button class="text-gray-400 hover:text-gray-600 text-xl">…</button>
            </div>
          </div>
          <div class="flex-1 flex items-center justify-center text-gray-200 select-none text-lg">
            No Tasks
          </div>
        </div>

        <!-- Urgent & Not Important (ซ้ายล่าง) -->
        <div class="bg-white rounded-[8px] shadow-md p-6 min-h-[270px] flex flex-col h-full">
          <div class="flex justify-between items-center mb-2">
            <span class="text-base font-semibold text-blue-500">Urgent & Not Important</span>
            <div class="flex gap-2">
              <button class="text-gray-400 hover:text-gray-600 text-xl">+</button>
              <button class="text-gray-400 hover:text-gray-600 text-xl">…</button>
            </div>
          </div>
          <div class="flex-1 flex items-center justify-center text-gray-200 select-none text-lg">
            No Tasks
          </div>
        </div>

        <!-- Not Urgent & Not Important (ขวาล่าง) -->
        <div class="bg-white rounded-[8px] shadow-md p-6 min-h-[270px] flex flex-col h-full">
          <div class="flex justify-between items-center mb-2">
            <span class="text-base font-semibold text-green-500">Not&nbsp; Urgent & Not Important</span>
            <div class="flex gap-2">
              <button class="text-gray-600 hover:text-gray-800 text-xl">+</button>
              <button class="text-gray-600 hover:text-gray-800 text-xl">…</button>
            </div>
          </div>
          <!-- Section: Leter -->
          <div>
            <div class="font-semibold text-[15px] text-black mb-1 mt-2 flex items-center">
              <span class="mr-2">&#9660;</span> Leter
            </div>
            <div class="flex items-center gap-2 mb-2">
              <input type="checkbox" class="w-5 h-5" />
              <span class="text-[15px]">ทำงานรายวิชา xxx วิชา xxx <b>“project”</b></span>
              <span class="ml-auto text-xs text-gray-400">inbox</span>
              <span class="ml-2 text-xs text-blue-600 font-medium">Jul 9</span>
            </div>
          </div>
          <hr class="my-2" />
          <!-- Section: No Data -->
          <div>
            <div class="font-semibold text-[15px] text-black mb-1 flex items-center">
              <span class="mr-2">&#9660;</span> No Data
            </div>
            <div class="flex items-center gap-2 mb-2">
              <input type="checkbox" class="w-5 h-5" />
              <span class="text-[15px]">งานย่อย xxx วิชา xxx</span>
              <span class="ml-auto text-xs text-gray-400">inbox</span>
            </div>
          </div>
          <hr class="my-2" />
          <!-- Section: Completed -->
          <div>
            <div class="font-semibold text-[15px] text-black mb-1 flex items-center">
              <span class="mr-2">&#9660;</span> Completed
            </div>
            <div class="flex items-center gap-2 mb-2">
              <input type="checkbox" checked class="w-5 h-5 accent-gray-400" />
              <span class="text-[15px] line-through text-gray-500">งานย่อย xxx วิชา xxxx</span>
              <span class="ml-auto text-xs text-gray-400">inbox</span>
              <span class="ml-2 text-xs text-blue-600 font-medium">Jul 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>