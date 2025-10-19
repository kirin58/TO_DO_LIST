<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close'])

const currentPage = ref('account')

function goTo(page) {
  currentPage.value = page
}
</script>

<template>
    <div class="flex bg-white rounded-lg border overflow-hidden min-h-[500px] max-w-[1100px] w-full mx-auto"
    style="height: 850px;"
    >
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
                <button
                    class="flex items-center gap-2 px-3 py-2 rounded"
                    :class="currentPage === 'account' ? 'bg-gray-200 text-black font-medium' : 'hover:bg-gray-100'"
                    @click="goTo('account')"
                    >
                    <i class="bx bx-user text-lg"></i> Account
                </button>
                <hr class="my-2" />
                <button
                    class="flex items-center gap-2 px-3 py-2 rounded"
                    :class="currentPage === 'smartlist' ? 'bg-gray-200 text-black font-medium' : 'hover:bg-gray-100'"
                    @click="goTo('smartlist')"
                    >
                    <i class="bx bx-list-ul text-lg"></i> Smart List
                </button>
                <button
                    class="flex items-center gap-2 px-3 py-2 rounded"
                    :class="currentPage === 'notifications' ? 'bg-gray-200 text-black font-medium' : 'hover:bg-gray-100'"
                    @click="goTo('notifications')"
                    >
                    <i class="bx bx-bell text-lg"></i> Notifications
                </button>
                <button
                    class="flex items-center gap-2 px-3 py-2 rounded"
                    :class="currentPage === 'datetime' ? 'bg-gray-200 text-black font-medium' : 'hover:bg-gray-100'"
                    @click="goTo('datetime')"
                    >
                    <i class="bx bx-time text-lg"></i> Date & Time
                </button>
                <button 
                    class="flex items-center gap-2 px-3 py-2 rounded"
                    :class="currentPage === 'more' ? 'bg-gray-200 text-black font-medium' : 'hover:bg-gray-100'"
                    @click="goTo('more')"
                    >
                    <i class='bx bx-server'></i> More
                </button>
                <hr class="my-2" />
                <button
                    class="flex items-center gap-2 px-3 py-2 rounded"
                    :class="currentPage === 'Integrations & Import' ? 'bg-gray-200 text-black font-medium' : 'hover:bg-gray-100'"
                    @click="goTo('Integrations & Import')"
                    >
                    <i class="bx bx-plug text-lg"></i> Integrations & Import
                </button>
                <button
                    class="flex items-center gap-2 px-3 py-2 rounded"
                    :class="currentPage === 'Collaborate' ? 'bg-gray-200 text-black font-medium' : 'hover:bg-gray-100'"
                    @click="goTo('Collaborate')"
                >
                    <i class="bx bx-group text-lg"></i> Collaborate
                </button>
                <hr class="my-2" />
                <button
                    class="flex items-center gap-2 px-3 py-2 rounded"
                    :class="currentPage === 'About' ? 'bg-gray-200 text-black font-medium' : 'hover:bg-gray-100'"
                    @click="goTo('About')">
                    <i class="bx bx-info-circle text-lg"></i> About
                </button>
            </nav>
        </aside>
        <!-- Main Content -->
        <main class="flex-1 px-12 py-8">
            <div v-if="currentPage === 'account'">
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
            </div>
            <div v-else-if="currentPage === 'smartlist'">
                <h3 class="font-semibold text-lg mb-4">Smart List</h3>
                <section class="bg-[#faf9f7] rounded-lg p-6 mb-4">
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <i class="bx bx-list-ul text-xl"></i>
                                <span>All</span>
                            </div>
                            <span class="text-gray-600">Hide <i class="bx bx-chevron-down"></i></span>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <i class="bx bx-calendar text-xl"></i>
                                <span>Today</span>
                            </div>
                            <span class="text-gray-600">Show <i class="bx bx-chevron-down"></i></span>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <i class="bx bx-calendar-alt text-xl"></i>
                                <span>Tomorrow</span>
                            </div>
                            <span class="text-gray-600">Hide <i class="bx bx-chevron-down"></i></span>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <i class="bx bx-calendar-week text-xl"></i>
                                <span>Next 7 Days</span>
                            </div>
                            <span class="text-gray-600">Show <i class="bx bx-chevron-down"></i></span>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <i class="bx bx-user-check text-xl"></i>
                                <span>Assigned to Me</span>
                            </div>
                            <span class="text-gray-600">Hide <i class="bx bx-chevron-down"></i></span>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <i class='bx  bxs-inbox'  ></i> 
                                <span>Inbox</span>
                            </div>
                            <span class="text-gray-600">Show <i class="bx bx-chevron-down"></i></span>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <i class="bx bx-bar-chart text-xl"></i>
                                <span>Summary</span>
                            </div>
                            <span class="text-gray-600">Hide <i class="bx bx-chevron-down"></i></span>
                        </div>
                    </div>
                </section>
                <section class="bg-[#faf9f7] rounded-lg p-6 mb-4">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                            <i class="bx bx-purchase-tag text-xl"></i>
                            <span>Tags</span>
                        </div>
                        <span class="text-gray-600">Show <i class="bx bx-chevron-down"></i></span>
                    </div>
                </section>
                <section class="bg-[#faf9f7] rounded-lg p-6">
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <i class="bx bx-check-square text-xl"></i>
                                <span>Completed</span>
                            </div>
                            <span class="text-gray-600">Show <i class="bx bx-chevron-down"></i></span>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <i class="bx bx-x text-xl"></i>
                                <span>Won't Do</span>
                            </div>
                            <span class="text-gray-600">Show if not empty <i class="bx bx-chevron-down"></i></span>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <i class="bx bx-trash text-xl"></i>
                                <span>Trash</span>
                            </div>
                            <span class="text-gray-600">Show <i class="bx bx-chevron-down"></i></span>
                        </div>
                    </div>
                </section>
            </div>
            <div v-else-if="currentPage === 'notifications'">
                <h3 class="font-serif text-xl mb-6">Notifications</h3>
                    <section class="bg-[#faf9f7] rounded-xl p-6 mb-4 relative">
                    <div class="font-semibold mb-1">Daily Notifications</div>
                    <div class="text-sm text-gray-600 mb-2">
                        TickTick can remind you of today's tasks at a specific time every day. Select the time<br>
                        you want to be reminded
                    </div>
                <div class="flex justify-between items-center">
                    <span class="font-medium">Daily Alert Time</span>
                    <span class="flex items-center gap-2">
                    00:00
                    <i class="bx bx-chevron-down"></i>
                    </span>
                </div>
                <div class="absolute top-6 right-6">
                    <input type="checkbox" class="w-4 h-4 accent-black" checked />
                </div>
                </section>
                <section class="bg-[#faf9f7] rounded-xl p-6 mb-4 flex justify-between items-center relative">
                    <span class="font-medium">Web Reminder</span>
                    <input type="checkbox" class="w-4 h-4 accent-black" checked />
                </section>
                <section class="bg-[#faf9f7] rounded-xl p-6 relative">
                    <div class="font-semibold mb-1">Email Notifications</div>
                    <div class="text-sm text-gray-600 mb-2">
                        If enabled, you can receive task notifications in Emails. The daily limit of reminders is 50.
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-medium">Email</span>
                        <span>xxx@xxx.xxx</span>
                    </div>
                    <div class="absolute top-6 right-6">
                        <input type="checkbox" class="w-4 h-4 accent-black" checked />
                    </div>
                </section>
            </div>
            <div v-else-if="currentPage === 'datetime'">
                <h3 class="font-serif text-xl mb-6">Date & Time</h3>
                <section class="bg-[#faf9f7] rounded-xl p-6 mb-4">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-medium">Time Format</span>
                    <span class="flex items-center gap-2">
                    24 Hour (00:00)
                    <i class="bx bx-chevron-down"></i>
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="font-medium">Start Week on</span>
                    <span class="flex items-center gap-2">
                    Sunday
                    <i class="bx bx-chevron-down"></i>
                    </span>
                </div>
                </section>
                <section class="bg-[#faf9f7] rounded-xl p-6 mb-4">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-medium">Additional Calendar</span>
                    <span class="flex items-center gap-2">
                    None
                    <i class="bx bx-chevron-down"></i>
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="font-medium">Show Week Numbers (W)</span>
                    <input type="checkbox" class="w-4 h-4 accent-black" checked />
                </div>
                </section>
                <section class="bg-[#faf9f7] rounded-xl p-6">
                <div class="font-medium mb-1">Time Zone</div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">
                    If enabled, you can select the time zone when setting time for tasks.
                    </span>
                    <input type="checkbox" class="w-4 h-4 accent-black" checked />
                </div>
                </section>
            </div>
            <div v-else-if="currentPage === 'more'">
                <section class="bg-[#faf9f7] rounded-xl p-6 mb-4 flex justify-between items-center">
                    <span class="font-medium">Language</span>
                    <span class="flex items-center gap-2">
                    None
                    <i class="bx bx-chevron-down"></i>
                    </span>
                </section>
                <div class="font-serif text-lg mb-2">Smart Recognition</div>
                <section class="bg-[#faf9f7] rounded-xl p-6 mb-4">
                    <div class="mb-4">
                    <div class="font-medium">Date Recognition</div>
                    <div class="text-sm text-gray-600 mb-2">
                        When adding tasks, recognize date and time information and automatically set reminders.
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <input type="checkbox" class="w-4 h-4 accent-black" checked />
                        <span class="font-medium">Remove text in tasks</span>
                    </div>
                    </div>
                    <div class="mb-4">
                    <div class="font-medium">Tag Recognition</div>
                    <div class="text-sm text-gray-600 mb-2">
                        You can select to keep or remove tags from task name.
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <input type="checkbox" class="w-4 h-4 accent-black" checked />
                        <span class="font-medium">Remove tags from task name</span>
                    </div>
                    </div>
                    <div>
                    <div class="font-medium">URL Parsing</div>
                    <div class="text-sm text-gray-600 mb-2">
                        When the task name is a URL, it will be parsed as the URL title.
                    </div>
                    <div class="flex justify-end">
                        <input type="checkbox" class="w-4 h-4 accent-black" checked />
                    </div>
                    </div>
                </section>
                <div class="font-serif text-lg mb-2">Task Default</div>
                <section class="bg-[#faf9f7] rounded-xl p-6 mb-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-medium">Default Date</span>
                        <span class="flex items-center gap-2">
                            None
                            <i class="bx bx-chevron-down"></i>
                        </span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                        <span class="font-medium">Default Reminders (Due time task)</span>
                        <span class="flex items-center gap-2">
                            On Time
                            <i class="bx bx-chevron-down"></i>
                        </span>
                        </div>
                        <div class="flex justify-between items-center mb-4">
                        <span class="font-medium">Default Reminders (All day task)</span>
                        <span class="flex items-center gap-2">
                            None
                            <i class="bx bx-chevron-down"></i>
                        </span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                        <span class="font-medium">Default Priority</span>
                        <span class="flex items-center gap-2">
                            None
                            <i class="bx bx-chevron-down"></i>
                        </span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                        <span class="font-medium">Default Tag</span>
                        <span class="flex items-center gap-2">
                            Inbox
                            <i class="bx bx-chevron-down"></i>
                        </span>
                        </div>
                        <div class="flex justify-between items-center">
                        <span class="font-medium">Default List</span>
                        <span class="flex items-center gap-2">
                            None
                            <i class="bx bx-chevron-down"></i>
                        </span>
                    </div>
                </section>
            </div>
            <div v-else-if="currentPage === 'Integrations & Import'">
                <div class="grid grid-cols-4 gap-x-6 gap-y-4">
                    <div class="col-span-4 font-serif text-lg mb-1">Calendar</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Google Calendar</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Outlook Calendar</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Exchange Calendar</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">iCloud Calendar</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">CalDAV</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">URL</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Holidays</div>
                    <div></div>

                    <div class="col-span-4 font-serif text-lg mt-4 mb-1">Integrate</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Google Calendar</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Notion</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Zapier</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">IFTTT</div>

                    <div class="col-span-4 font-serif text-lg mt-4 mb-1">Import</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">IFTTT</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Things</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Toodledo</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">iCal</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Microsoft Todo</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">OmniFocus</div>
                    <div></div>
                    <div></div>

                    <div class="col-span-4 font-serif text-lg mt-4 mb-1">Email</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Gmail</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Spark</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Outlook Email</div>
                    <div></div>

                    <div class="col-span-4 font-serif text-lg mt-4 mb-1">Others</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Subscribe to TickTick</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Add tasks via email</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Shortcuts</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Slack</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Amazon Alexa</div>
                    <div class="bg-[#faf9f7] rounded-xl px-4 py-2">Chatmind</div>
                </div>
            </div>
            <div v-else-if="currentPage === 'Collaborate'">
            <h3 class="font-serif text-xl mb-6">Collaborate</h3>
            <section class="bg-[#faf9f7] rounded-xl p-6 mb-4 relative">
                <div class="font-medium mb-1">Auto Accept Invites</div>
                <div class="text-sm text-gray-600 mb-2">
                If enabled, automatically accept invites from known collaborators.
                </div>
                <div class="absolute top-6 right-6">
                <input type="checkbox" class="w-4 h-4 accent-black" checked />
                </div>
            </section>
            <section class="bg-[#faf9f7] rounded-xl p-6">
                <div class="font-medium mb-1">Default Notifications for Shared Lists</div>
                <div class="text-sm text-gray-600 mb-4">
                You can choose to receive the following notifications from all shared lists. If the notification type of a specific list is manually changed, the default settings will no longer take effect on this list.
                </div>
                <div class="flex flex-col gap-4">
                <label class="flex items-center gap-2">
                    <input type="checkbox" class="w-4 h-4 accent-black" />
                    <span>Complete/Undo a task</span>
                </label>
                <label class="flex items-center gap-2">
                    <input type="checkbox" class="w-4 h-4 accent-black" />
                    <span>Add a task/note</span>
                </label>
                <label class="flex items-center gap-2">
                    <input type="checkbox" class="w-4 h-4 accent-black" />
                    <span>Delete/Move a task/note</span>
                </label>
                </div>
            </section>
            </div>                       
        </main>
    </div>
</template>