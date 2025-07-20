<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-50">
    <div class="flex items-center justify-between w-full max-w-7xl px-4 ">

      <!-- Left Illustration -->
      <div class="hidden md:flex flex-col items-center mr-20">
      <img src="/public/8.png" alt="left" />
      </div>

      <!-- Center: Logo and Button -->
      <div class="flex flex-col items-center space-y-10 ">
        <img src="/src/assets/Logo.png" alt="logo" class="w-46 h-46 mt-10" />
        <router-link to="/Login">
        <button
          class="w-40 bg-orange-300 hover:bg-orange-200 text-black font-medium py-2 rounded-lg mb-20 -mt-2"
        >
          Sign In
        </button>
      </router-link>
      </div>

      <!-- Right Illustration -->
      <div class="hidden md:flex flex-col items-center ml-20">
        <img src="/public/7.png" alt="right" />
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

