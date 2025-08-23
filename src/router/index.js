import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Register/Login.vue'
import Signup from '@/views/Register/Sign_up.vue'
import Resetpassword from '@/views/Register/Reset_Password.vue'
import Inbox from '@/views/Task/Inbox.vue'
import Pomodoro from '@/views/Pomodoro.vue'
import Today from '@/views/Task/today.vue'
import Next7 from '@/views/Task/Next7.vue'


const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/Login' , name: 'Login', component: Login},
  { path: '/Inbox' , name: 'Inbox', component: Inbox},
  { path: '/Today' , name: 'Today', component: Today},
  { path: '/Next7' , name: 'Next7', component: Next7},
  { path: '/Signup' , name: 'Signup', component: Signup},
  { path: '/Resetpassword' , name: 'Resetpassword' , component: Resetpassword},
  { path: '/Pomodoro' , name: 'Pomodoro', component: Pomodoro},

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
