<script setup>
const props = defineProps({
  emptytask: { type: String, required: true },
  empty: String, 
  emptydis : String,
})
</script>
<template>
    <div class="flex flex-col text-center items-center justify-center w-full h-full">
        <img :src="emptytask" alt="Empty Trash" class="w-64 h-auto object-contain opacity-50"/>
        <h1 class="font-semibold text-stone-500">{{empty}}</h1>
        <p class="text-stone-400">{{ emptydis }}</p>
      </div>
</template>