<script setup>
import NavBar from '@/components/NavBar.vue';
import TaskBar from '@/components/Task/TaskBar.vue';
import TaskContent from '@/components/Task/TaskContent.vue';
import emptytask from '@/assets/NoNext7.png';

const title = "Next7"
</script>
<template>
    <div class="h-screen w-screen flex flex-row">
        <NavBar />
        <TaskBar />
        <TaskContent :emptytask="emptytask" :title="title" :mode="'next7'" :empty="'No tasks for the next 7 days'" :emptydis="'Have a nice weekend'" />
    </div>
</template>