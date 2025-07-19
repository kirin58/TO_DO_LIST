<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="flex items-center justify-between w-full max-w-5xl px-4">
      
      <!-- Left Illustration -->
      <div class="hidden md:flex flex-col items-center">
        <img
          src="/src/assets/Logo.png"
          alt="img"
          class="w-64"
        />
      </div>

      <!-- Center: Logo and Button -->
      <div class="flex flex-col items-center space-y-6">
        <img src="/src/assets/Logo.png" alt="logo" class="w-36 h-36" />
        <button
          class="px-6 py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded shadow"
        >
          Sign in
        </button>
      </div>

      <!-- Right Illustration -->
      <div class="hidden md:flex flex-col items-center">
        <img
          src="/src/assets/Logo.png"
          alt="img"
          class="w-64"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// ไม่มี logic JS พิเศษในหน้า static นี้
</script>

<style scoped>
/* เพิ่มเติมถ้าต้องการ custom styles */
</style>
