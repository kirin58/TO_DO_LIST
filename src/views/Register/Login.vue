<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
    <!-- Logo -->
    <div class="absolute top-0 left-10 flex items-center space-x-2">
      <img src="/src/assets/Logo.png" alt="logo" class="w-36 h-36" />
    </div>
    <div class="absolute top-12 right-10 flex items-center space-x-2">
      <p class="text-sm text-black mt-5 mb-5">
        Don’t have an account?
      </p>
      <router-link to="#">
        <button class="font-medium w-full flex items-center justify-center bg-orange-300 hover:bg-orange-200 text-black py-2 px-5 rounded-lg"
        >
          Sign Up
        </button>
    </router-link>
    </div>
    
    <!-- Card -->
    <div class="bg-white shadow-md rounded-2xl px-8 py-10 w-96 text-center mt-20">
      <h1 class="text-2xl font-serif mb-6">Sign In</h1>

      <!-- Email input -->
      <input
        type="email"
        placeholder="Email"
        class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none"
      />

      <!-- Password input -->
      <div class="relative mb-4">
        <input
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <i
          :class="showPassword ? 'bx bx-show' : 'bx bx-hide'"
          class="absolute right-3 top-2.5 text-xl text-gray-500 cursor-pointer"
          @click="togglePassword"
        ></i>
      </div>

      <!-- Sign In Button go to inbox -->
      <router-link to="/Inbox">
        <button
          class="w-40 bg-orange-300 hover:bg-orange-200 text-black font-medium py-2 rounded-lg mb-2"
        >
          Sign In
        </button>
      </router-link>

      <!-- Forgot Password -->
      <router-link to="/Resetpassword">
        <p class="text-sm text-gray-400 mb-4 cursor-pointer hover:underline">
          Forgot Password
        </p>
      </router-link>

      <hr class="mb-4" />

      <!-- Continue with Google -->
      <router-link to="#">
        <button
          class="w-full flex items-center justify-center bg-orange-300 hover:bg-orange-200 text-black py-2 rounded-lg mb-2"
        >
          <span class="mr-2">
            <i class="bx bxl-google text-2xl"></i>
          </span>
          Continue with Google
        </button>
      </router-link>

      <!-- Continue with Facebook -->
      <router-link to="#">
        <button
          class="w-full flex items-center justify-center bg-orange-300 hover:bg-orange-200 text-black py-2 rounded-lg"
        >
          <span class="mr-2">
            <i class="bx bxl-facebook-circle text-2xl"></i>
          </span>
          Continue with Facebook
        </button>
      </router-link>
    </div>

    <!-- Sign Up -->
    <div class="text-center mt-6 flex flex-row justify-center items-center">
      <p class="text-sm text-black mt-5 mb-5">
        Don’t have an account?
      </p>
      <router-link to="/Signup">
        <p class="text-orange-500 hover:underline ml-2">
          Sign Up
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>