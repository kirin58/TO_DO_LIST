import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Register/Login.vue'
import Signup from '@/views/Register/Sign_up.vue'
import Resetpassword from '@/views/Register/Reset_Password.vue'
import Inbox from '@/views/Task/Inbox.vue'
import Pomodoro from '@/views/Pomodoro.vue'
import Calender from '@/views/Calender.vue'
import CalenderMonth from '@/components/Calender/CalenderMonth.vue'
import CalenderYear from '@/components/Calender/CalenderYear.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/Login' , name: 'Login', component: Login},
  { path: '/Inbox' , name: 'Inbox', component: Inbox},
  { path: '/Signup' , name: 'Signup', component: Signup},
  { path: '/Resetpassword' , name: 'Resetpassword' , component: Resetpassword},
  { path: '/Pomodoro' , name: 'Pomodoro', component: Pomodoro},
  { path: '/Calender' , name: 'Calender', component: CalenderMonth},
  { path: '/CalenderMonth', component: CalenderMonth },
  { path: '/CalenderYear', component: CalenderYear }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
