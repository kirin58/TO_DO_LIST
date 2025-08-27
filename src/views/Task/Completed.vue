<script setup>
import NavBar from '@/components/NavBar.vue';
import TaskBar from '@/components/Task/TaskBar.vue';
import TaskContent from '@/components/Task/TaskContent.vue';
import emptytask from '@/assets/NoCompleted.png';

const title = "Completed"
</script>
<template>
    <div class="h-screen w-screen flex flex-row">
        <NavBar />
        <TaskBar />
        <TaskContent :emptytask="emptytask" :title="title" :empty="'No tasks completed yet'" :emptydis="'keep it up'" mode="completed"/>
    </div>
</template>