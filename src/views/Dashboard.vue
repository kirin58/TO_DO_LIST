<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-50">
    <div class="flex items-center justify-between w-full max-w-7xl px-4 ">

      <!-- Left Illustration -->
      <div class="hidden md:flex flex-col items-center mr-20">
        <img :src="new URL('@/assets/8.png', import.meta.url).href" alt="left" class="w-64" />

      </div>

      <!-- Center: Logo and Button -->
      <div class="flex flex-col items-center space-y-10">
        <img :src="new URL('@/assets/Logo.png', import.meta.url).href" alt="logo" class="w-40 h-40 mt-10" />
        <router-link to="#">
          <button
            class="w-40 bg-orange-300 hover:bg-orange-200 text-black font-medium py-2 rounded-lg mb-20 -mt-2"
          >
            Sign In
          </button>
        </router-link>
      </div>

      <!-- Right Illustration -->
      <div class="hidden md:flex flex-col items-center ml-20">
        <img :src="new URL('@/assets/7.png', import.meta.url).href" alt="right" class="w-64" />
      </div>

    </div>
  </div>
</template>
