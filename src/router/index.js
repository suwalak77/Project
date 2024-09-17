import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue' // ปรับตามที่อยู่ไฟล์ของคุณ
import LeaveRequest from '../views/LeaveRequest.vue' // ปรับตามที่อยู่ไฟล์ของคุณ

const routes = [
  { path: '/login', component: Login },
  { path: '/leave-request', component: LeaveRequest }
  // เพิ่มเส้นทางอื่น ๆ ตามที่ต้องการ
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
