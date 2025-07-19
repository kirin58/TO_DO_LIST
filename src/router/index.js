import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Register/Login.vue'
import Signup from '@/views/Register/Sign_up.vue'
import Resetpassword from '@/views/Register/Reset_Password.vue'
import Inbox from '@/views/Task/Inbox.vue'
import Pomodoro from '@/views/pomodoro.vue' 

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/Login' , name: 'Login', component: Login},
  { path: '/Inbox' , name: 'Inbox', component: Inbox},
  { path: '/Pomodoro' , name: 'Pomodoro', component: Pomodoro},
  { path: '/Signup' , name: 'Signup', component: Signup},
  { path: '/Resetpassword' , name: 'Resetpassword' , component: Resetpassword},
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
