<script setup>
const emit = defineEmits(['close'])
</script>

<template>
    <div class="flex bg-white rounded-lg border overflow-hidden min-h-[500px] max-w-[1100px] w-full mx-auto">
        <button
            @click="emit('close')"
            class="absolute top-6 right-8 text-2xl text-gray-400 hover:text-gray-600 z-10"
            aria-label="Close"
            >
            &times;
        </button>
        
        <!-- Sidebar -->
        <aside class="w-72 bg-[#faf9f7] border-r px-6 py-6 flex flex-col gap-2">
            <h2 class="text-2xl font-serif font-normal mb-3">Setting</h2>
            <nav class="flex flex-col gap-1">
                <button class="flex items-center gap-2 px-3 py-2 rounded bg-gray-200 text-black font-medium">
                    <i class="bx bx-user text-lg"></i> Account
                </button>
                <button class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                    <i class="bx bx-list-ul text-lg"></i> Smart List
                </button>
                <button class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                    <i class="bx bx-bell text-lg"></i> Notifications
                </button>
                <button class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                    <i class="bx bx-time text-lg"></i> Date & Time
                </button>
                <button class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                    <i class="bx bx-credit-card text-lg"></i> More
                </button>
                <hr class="my-2" />
                <button class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                    <i class="bx bx-plug text-lg"></i> Integrations & Import
                </button>
                <button class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                    <i class="bx bx-group text-lg"></i> Collaborate
                </button>
                <hr class="my-2" />
                <button class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                    <i class="bx bx-info-circle text-lg"></i> About
                </button>
            </nav>
        </aside>
        <!-- Main Content -->
        <main class="flex-1 px-12 py-8">
            <div class="flex flex-col items-center mb-8">
                <div class="w-24 h-24 rounded-full bg-gray-300 mb-3"></div>
                <div class="text-xl font-serif text-gray-700 mb-2">xxxxxxxxx</div>
            </div>
            <div class="flex flex-col gap-6">
                <!-- Account Info -->
                <section class="bg-[#faf9f7] rounded-lg p-6 mb-2">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-gray-700">Email</span>
                        <span class="text-gray-700">xxx@xxx.xxx</span>
                    </div>
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-gray-700">Password</span>
                        <button class="text-blue-600 hover:underline text-sm">Set Password</button>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-700">2-Step Verification</span>
                        <button class="text-blue-600 hover:underline text-sm">Setting</button>
                    </div>
                </section>
                <!-- Social -->
                <section class="bg-[#faf9f7] rounded-lg p-6 mb-2">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-gray-700">Google</span>
                        <span class="text-gray-700">xxxxxxxxx</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-700">Apple</span>
                        <button class="text-blue-600 hover:underline text-sm">Link</button>
                    </div>
                </section>
                <!-- Manage -->
                <section class="bg-[#faf9f7] rounded-lg p-6">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-gray-700">Login Devices</span>
                        <button class="text-blue-600 hover:underline text-sm">Manage</button>
                    </div>
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-gray-700">API Token</span>
                        <button class="text-blue-600 hover:underline text-sm">Manage</button>
                    </div>
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-gray-700">Backup & Restore</span>
                        <div>
                            <button class="text-blue-600 hover:underline text-sm mr-2">Generate Backup</button>
                            <button class="text-blue-600 hover:underline text-sm">Import Backup</button>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-700">Manage Account</span>
                        <button class="text-red-500 hover:underline text-sm">Delete Account</button>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>