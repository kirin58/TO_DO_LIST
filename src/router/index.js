import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Register/Login.vue'
import Signup from '@/views/Register/Sign_up.vue'
import Resetpassword from '@/views/Register/Reset_Password.vue'
import Inbox from '@/views/Task/Inbox.vue'
import Pomodoro from '@/views/Pomodoro.vue'
import Today from '@/views/Task/Today.vue'
import Next7 from '@/views/Task/Next7.vue'
import Completed from '@/views/Task/Completed.vue'
import Trash from '@/views/Task/Trash.vue'
import Calender from '@/views/Calender.vue'
import Matrix from '@/views/Matrix.vue'
import CalenderMonth from '@/components/Calender/CalenderMonth.vue'
import CalenderYear from '@/components/Calender/CalenderYear.vue'


const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/Login' , name: 'Login', component: Login},
  { path: '/Inbox' , name: 'Inbox', component: Inbox},
  { path: '/Today' , name: 'Today', component: Today},
  { path: '/Next7' , name: 'Next7', component: Next7},
  { path: '/Completed' , name: 'Completed', component: Completed},
  { path: '/Trash', name: 'Trash', component: Trash},
  { path: '/Signup' , name: 'Signup', component: Signup},
  { path: '/Resetpassword' , name: 'Resetpassword' , component: Resetpassword},
  { path: '/Pomodoro' , name: 'Pomodoro', component: Pomodoro},
  { path : '/Calender' , name: 'Calender', component: Calender},
  { path: '/calendar-month', component: CalenderMonth },
  { path: '/calendar-year', component: CalenderYear },
  { path : '/Matrix' , name: 'Matrix', component: Matrix}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

