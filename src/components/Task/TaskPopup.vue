<template>
    <div class="w-48 top-0 z-[9999] p-2 px-4 text-stone-600 bg-stone-50 shadow-xl">
        <div class="my-2">
            <div class="text-sm">Date</div>
            <div class="taskmenu">
                <button><i class='bx  bxs-calendar-heart'  ></i></button>
                <button><i class='bx  bx-calendar-week'  ></i> </button>
                <button><i class='bx  bxs-calendar-minus'  ></i></button>
                <button><i class='bx bx-calendar'  ></i> </button>
            </div>
        </div>
        <div class="taskmenu_line"></div>
        <div class="my-2">
            <div class="text-sm">Priority</div>
            <div class="taskmenu">
                <button><i class='bx  bx-flag text-red-500'></i></button>
                <button><i class='bx  bx-flag text-yellow-300'></i></button>
                <button><i class='bx  bx-flag text-sky-500'></i></button>
                <button><i class='bx  bx-flag text-green-400'></i></button>
            </div>
        </div>
        <div class="taskmenu_line"></div>
        <div class="taskmenu_func">
            <button><i class='bx  bx-pin'  ></i></button>
            <p>Pin</p>
        </div>
        <div class="taskmenu_func justify-between">
            <div class="flex gap-2">
                <button><i class='bx  bx-chevron-right-square'  ></i> </button>
                <p>Move To</p>
            </div>
            <button><i class='bx  bxs-chevron-right '></i></button>
        </div>
        <div class="taskmenu_func">
            <button>#</button>
            <p>Tags</p>
        </div>
        <div class="taskmenu_line"></div>
        <div class="taskmenu_func text-red-500">
            <button><i class='bx  bx-trash'></i></button>
            <p>Delete</p>
        </div>
    </div>
</template>
<style>
.taskmenu{
    @apply flex justify-between;
}
.taskmenu_line{
    @apply h-px my-2 bg-slate-300;
}
.taskmenu_func{
    @apply flex my-2 gap-2;
}
</style>