
<template>
    
  <div class="min-h-screen bg-[#fff8f7] flex flex-col items-center justify-center">
    <!-- Logo -->
    <div class="absolute top-8 left-8 flex items-center space-x-2">
      <img src="../assets/Logo.png" alt="logo" class="w-21 h-21" />
    </div>

    <!-- Card -->
    <div class="bg-white shadow-md rounded-2xl px-8 py-10 w-96 text-center">
      <h1 class="text-2xl font-serif mb-6">sing in</h1>

      <!-- Email input -->
      <input
        type="email"
        placeholder="Email"
        class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none"
      />

      <!-- Password input -->
      <div class="relative mb-4">
        <input
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <i class='bx  bx-eye text-gray-950 ml-12'  ></i> 
        
      </div>

      <!-- Sign In Button -->
      <button
        class="w-full bg-[#ffd89f] hover:bg-[#ffcb70] text-black font-medium py-2 rounded-lg mb-2"
      >
        sing in
      </button>

      <!-- Forgot Password -->
      <p class="text-sm text-gray-400 mb-4 cursor-pointer hover:underline">
        Forgot Password
      </p>

      <hr class="mb-4" />

      <!-- Continue with Google -->
      <button
        class="w-full flex items-center justify-center bg-[#ffe2b5] hover:bg-[#ffd89f] text-black py-2 rounded-lg mb-2"
      >
        <span class="mr-2">🟢</span> Continue with Google
      </button>

      <!-- Continue with Facebook -->
      <button
        class="w-full flex items-center justify-center bg-[#ffe2b5] hover:bg-[#ffd89f] text-black py-2 rounded-lg"
      >
        <span class="mr-2">⚫</span> Continue with Facebook
      </button>
    </div>

    <!-- Sign Up -->
    <p class="text-sm text-gray-600 mt-4">
      Don’t have an account?
    </p>
    <button
      class="mt-1 bg-[#ffd89f] hover:bg-[#ffcb70] text-black py-1 px-6 rounded-lg"
    >
      sing up
    </button>
  </div>
</template>

<script setup>
// ยังไม่ต้องมี logic ด้านหลัง สำหรับ UI เท่านั้น
</script>

<style scoped>
/* ปรับ font ถ้าอยากใช้ font serif แบบในภาพ */
</style>
