<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-10">
    <!-- Logo -->
    <div class="absolute top-0 left-10 flex items-center space-x-2">
      <img src="../assets/Logo.png" alt="logo" class="w-36 h-36" />
    </div>

    <!-- Card -->
    <div class="bg-white shadow-md rounded-2xl px-8 py-10 w-96 text-center mt-20">
      <h1 class="text-2xl font-serif mb-10">Reset Password</h1>
      <h1 class="text-xl font-serif mb-2">xxxxxxxxxxx@xxxxxxx.com</h1>

      <!-- Password input -->
      <div class="relative mb-4">
        <input
          :type="showPassword1 ? 'text' : 'password'"
          placeholder="Password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <i
          :class="[showPassword1 ? 'bx bx-show' : 'bx bx-hide', 'absolute right-3 top-2.5 text-xl text-gray-500 cursor-pointer']"
          @click="togglePassword(1)"
        ></i>
      </div>

      <!-- Confirm Password input -->
      <div class="relative mb-4">
        <input
          :type="showPassword2 ? 'text' : 'password'"
          placeholder="Confirm Password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <i
          :class="[showPassword2 ? 'bx bx-show' : 'bx bx-hide', 'absolute right-3 top-2.5 text-xl text-gray-500 cursor-pointer']"
          @click="togglePassword(2)"
        ></i>
      </div>

      <router-link to="#">
        <button
          class="w-40 bg-orange-300 hover:bg-orange-200 text-black font-medium py-2 rounded-lg mt-5 mb-20"
        >
          Reset Password
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showPassword1 = ref(false)
const showPassword2 = ref(false)

function togglePassword(index) {
  if (index === 1) showPassword1.value = !showPassword1.value
  if (index === 2) showPassword2.value = !showPassword2.value
}
</script>
