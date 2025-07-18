// index.css หรือ main.css แล้วแต่คุณใช้ไฟล์ไหน
import './index.css'
import './assets/main.css' // ถ้าใช้ทั้งคู่จริง ๆ

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
