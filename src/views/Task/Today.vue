<script setup>
import NavBar from '@/components/NavBar.vue';
import TaskBar from '@/components/Task/TaskBar.vue';
import TaskContent from '@/components/Task/TaskContent.vue';
import emptytask from '@/assets/NoToday.png';

const title = "Today"
</script>
<template>
    <div class="h-screen w-screen flex flex-row">
        <NavBar />
        <TaskBar />
        <TaskContent :emptytask="emptytask" :title="title" :mode="'today'" :empty="'No tasks today'" :emptydis="'It is time to relax'"/>
    </div>
</template>