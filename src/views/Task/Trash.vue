<script setup>
import NavBar from '@/components/NavBar.vue';
import TaskBar from '@/components/Task/TaskBar.vue';
import TaskContent from '@/components/Task/TaskContent.vue';
import emptytask from '@/assets/NoTrash.png';

const title = "Trash"
</script>
<template>
    <div class="h-screen w-screen flex flex-row">
        <NavBar />
        <TaskBar />
        <TaskContent  :emptytask="emptytask" :title="title" mode="trash" :empty="'Trash can is tidy'" :emptydis="'No deleted tasks yet'"/>
    </div>
</template>