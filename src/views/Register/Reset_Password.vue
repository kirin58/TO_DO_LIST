<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-10">
    <!-- Logo -->
    <div class="absolute top-0 left-10 flex items-center space-x-2">
      <img src="/src/assets/Logo.png" alt="logo" class="w-36 h-36" />
    </div>

    <!-- Card -->
    <div class="bg-white shadow-md rounded-2xl px-8 py-10 w-96 text-center mt-20">
        <h1 class="text-2xl font-serif mb-6">Reset Password</h1>
        <!-- Email input -->
      <input
        type="email"
        placeholder="Email"
        class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none"
      />

        <!-- Reset Password Button -->
        <button
            class="bg-orange-300 text-gray-900 px-10 py-2 rounded-lg font-medium mt-2 mb-10 hover:bg-orange-200 transition"
        >
            Reset Password
        </button>

        <!-- Line -->
        <hr class="w-full max-w-sm border-t border-gray-200 mb-6" />

        <!-- Sign in / Sign up -->
        <div class="flex gap-4 justify-center">
            <router-link to="/Login">
              <button class="btn">
                Sign in
              </button>
            </router-link>
            <router-link to="/Signup">
              <button class="btn">
                  Sign up
              </button>
            </router-link>
        </div>
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

<style scoped>
    .btn{
        @apply
        bg-orange-300
        text-gray-900 
        px-12 py-2 
        rounded-lg 
        font-medium 
        hover:bg-orange-200 transition
        mt-5 mb-24
        ;
    }
</style>
