<script setup>
import NavBar from '@/components/NavBar.vue';
import TaskBar from '@/components/Task/TaskBar.vue';
import TaskContent from '@/components/Task/TaskContent.vue';
import emptytask from '@/assets/NoInbox.png';

const title = "Next7"
const mode = 'next7'
</script>
<template>
    <div class="h-screen w-screen flex flex-row">
        <NavBar />
        <TaskBar />
        <TaskContent :emptytask="emptytask" :title="title" :mode="'next7'" />
    </div>
</template>