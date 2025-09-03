<script setup>
import NavBar from '@/components/NavBar.vue';
import TaskBar from '@/components/Task/TaskBar.vue';
import TaskContent from '@/components/Task/TaskContent.vue';

const title = "Completed"
</script>
<template>
    <div class="h-screen w-screen flex flex-row">
        <NavBar />
        <TaskBar />
        <TaskContent :title="title"  mode="completed" :emptytask="emptytask" :empty="'No tasks completed yet'" :emptydis="'keep it up'"/>
    </div>
</template>