<script setup>
import NavBar from '@/components/NavBar.vue';
import TaskBar from '@/components/Task/TaskBar.vue';
import TaskContenrt from '@/components/Task/TaskContent.vue';
import emptytask from '@/assets/NoInbox.png';
</script>
<template>
    <div class="h-screen w-screen flex flex-row">
        <NavBar />
        <TaskBar />
        <TaskContenrt title="Inbox" :emptytask="emptytask" />
    </div>
</template>