<template>
    <header class="min-h-screen w-16 bg-orange-300 flex flex-col items-center justify-between p-2 gap-2">
        <div class="h-4/6 w-full flex flex-col items-center gap-10">
            <button class="w-10 h-10 bg-slate-200 rounded-lg"></button>
            <nav class="h-1/2 w-full flex flex-col items-center justify-between">
                <router-link to="/Inbox" exact-active-class="menu_active">
                    <i class='menu bx  bxs-check-square'  ></i>
                </router-link>
                <router-link to="#" exact-active-class="menu_active">
                    <i class='menu bx  bx-search'></i>
                </router-link>
                <router-link to="#" exact-active-class="menu_active">
<<<<<<< HEAD
                    <i class='menu bx  bx-calendar-alt'  ></i></router-link>
                <router-link to="/Pomodoro" exact-active-class="menu_active">
=======
                    <i class='menu bx  bx-calendar'  ></i></router-link>
                <router-link to="#" exact-active-class="menu_active">
                    <i class='menu bx  bxs-alarm'  ></i> </router-link>
                <router-link to="#" exact-active-class="menu_active">
                    <i class='menu bx  bxs-grid'  ></i>
                </router-link>
            </nav>
        </div>
        <div class="h-1/5 flex flex-col justify-between">
            <router-link to="#" exact-active-class="menu_active">
                <i class="menu bx bx-refresh"></i>
            </router-link>
            <router-link to="#" exact-active-class="menu_active">
                <i class='menu bx  bxs-bell'  ></i>  
            </router-link>
            <router-link to="#" exact-active-class="menu_active">
                <i class='menu bx  bxs-help-circle'  ></i> 
            </router-link>
        </div>
    </header>
</template>
<style>
.menu{
    @apply text-3xl text-slate-200 hover:text-slate-100;
}
.menu_active .menu {
    @apply text-white;
}
</style>