<script setup>
import NavBar from '@/components/NavBar.vue';
import TaskBar from '@/components/TaskBar.vue';
import TaskContenrt from '@/components/TaskContent.vue';
import emptytask from '@/assets/NoInbox.png';
</script>
<template>
    <div class="min-h-screen min-w-screen flex flex-row">
        <NavBar />
        <TaskBar />
        <TaskContenrt title="Inbox" :emptytask="emptytask" />
    </div>
</template>