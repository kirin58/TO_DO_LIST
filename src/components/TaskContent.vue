<script setup>
defineProps({
    title: String
})
</script>
<template>
    <div class="w-3/5">
        <div class="flex flex-col p-6">
            <div class="flex items-center p-2 mb-2 justify-between">
                <p class="text-2xl font-black text-stone-600">{{ title }}</p>
                <div class="w-1/2 flex justify-end gap-4 text-stone-400 text-2xl">
                    <button><i class='bx  bx-shuffle'  ></i></button>
                    <button><i class='bx  bx-dots-horizontal'  ></i> </button>
                </div>
            </div>
            <div class="w-full"><input placeholder="+ Add task" class="w-full  text-slate-500 bg-gray-300 
                rounded-lg p-1.5 border border-transparent focus:borde-orange-300 outline-none" />
            </div>
        </div>
    </div>
</template>