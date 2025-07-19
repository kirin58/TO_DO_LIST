<template>
    <div class="h-screen w-64 bg-orange-100 flex flex-col items-center p-4">
        <div class="bar">
            <div>
                <router-link to="#" class="taskmenu" exact-active-class="task_active"><i class='bx  bxs-calendar-heart'  ></i><p class="text-base">Today</p></router-link>
                <router-link to="#" class="taskmenu" exact-active-class="task_active"><i class='bx  bxs-calendar-minus'  ></i><p class="text-base">Next 7 Days</p></router-link>
                <router-link to="/Inbox" class="taskmenu" exact-active-class="task_active"><i class='bx  bxs-inbox'  ></i> <p class="text-base">Inbox</p></router-link>
            </div>
            <div>
                <div class="line"><div></div></div>
                <div class="list">
                    <div class="flex items-center"><i class='bx  bxs-chevron-right ' exact-active-class="task_active"></i><p class="text-sm">List</p></div>
                    <div class="flex items-center"><i class='bx  bx-dots-horizontal ' exact-active-class="task_active"></i><i class='bx  bx-plus'  ></i> </div>
                </div>
                <div class="list">
                    <div class="flex items-center"><i class='bx  bxs-chevron-right 'exact-active-class="task_active"></i> <p class="text-sm">Tags</p></div>
                    <div class="flex items-center"><i class='bx  bx-dots-horizontal ' exact-active-class="task_active"></i><i class='bx  bx-plus'  ></i> </div>
                </div>
            </div>
        </div>
        
        <div class="bar justify-end mb-10">
            <div class="line"><div></div></div>
            <router-link to="#" class="taskmenu" exact-active-class="task_active"><i class='bx  bx-check-square'  exact-active-class="task_active"></i> <p class="text-base">Completed</p></router-link>
            <router-link to="#" class="taskmenu" exact-active-class="task_active"><i class='bx  bx-trash'  exact-active-class="task_active"></i> <p class="text-base">Trash</p></router-link>
        </div>
    </div>
</template>
<style>
.bar {
    @apply h-1/2 w-full flex flex-col;
}
.line {
    @apply h-px w-full flex flex-col bg-orange-300 my-6 ;
}
.taskmenu{
    @apply flex flex-row items-center gap-2 hover:bg-orange-200 m-1 mb-2 p-2 rounded-md text-2xl text-gray-700;
}
.list{
    @apply flex flex-row items-center justify-between hover:bg-orange-200 m-1 mb-2 p-1 rounded-md text-base text-gray-700;
}
.task_active{
  @apply bg-orange-200;
}
</style>