<script setup>
import NavBar from '@/components/NavBar.vue';
import TaskBar from '@/components/TaskBar.vue';
import TaskContenrt from '@/components/TaskContent.vue';
</script>
<template>
    <body class="w-screen flex flex-row">
        <NavBar />
        <TaskBar />
        <TaskContenrt title="Inbox" />
    </body>
</template>