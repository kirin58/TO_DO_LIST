
<template>

  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
    <!-- Logo -->
    <div class="absolute top-0 left-10 flex items-center space-x-2">
      <img src="../assets/Logo.png" alt="logo" class="w-36 h-36" />
    </div>

    <!-- Card -->
    <div class="bg-white shadow-md rounded-2xl px-8 py-10 w-96 text-center mt-20">
      <h1 class="text-2xl font-serif mb-6">Sign up</h1>

      <!-- Email input -->
      <input
        type="email"
        placeholder="Email"
        class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none"
      />

      <!-- Password input -->
    <div class="relative mb-4">
        <input
            :type="showPassword ? 'text' : 'password '"
            placeholder="Password 8-15 characters"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <i
            :class="showPassword ? 'bx bx-show' : 'bx bx-hide'"
            class="absolute right-3 top-2.5 text-xl text-gray-500 cursor-pointer"
            @click="togglePassword"
          ></i>
    </div>


      <!-- Sign Up Button -->
      <router-link to="/Login"><button
        class="w-40 bg-orange-300 hover:bg-orange-200 text-black font-medium py-2 rounded-lg mb-5"
      >
        Sign up
      </button></router-link>



      <hr class="mb-4" />

      <!-- Continue with Google -->
      <router-link to="#"><button
        class="w-full flex items-center justify-center bg-orange-300 hover:bg-orange-200 text-black py-2 rounded-lg mb-2"
      >
        <span class="mr-2"><i class='bx  bxl-google text-2xl'  ></i> </span> Continue with Google
      </button></router-link>

      <!-- Continue with Facebook -->
      <router-link to="#"><button
        class="w-full flex items-center justify-center bg-orange-300 hover:bg-orange-200 text-black py-2 rounded-lg"
      >
        <span class="mr-2"><i class='bx bxl-facebook-circle text-2xl'></i></span> Continue with Facebook
      </button></router-link>
    </div>

    <!-- Sign Up -->
    <p class="text-sm text-black mt-5 mb-5">
      Already have an account?
    </p>
    <router-link to="/Login"><button
      class="w-40 bg-orange-300 hover:bg-orange-200 text-black font-medium py-2 rounded-lg mb-2">
      Sign in
    </button></router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>


