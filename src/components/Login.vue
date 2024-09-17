<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue' // นำเข้า ref จาก Vue
import { auth } from '../firebase' // นำเข้า auth จาก firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth' // นำเข้าเมธอด signInWithEmailAndPassword
import { useRouter } from 'vue-router' // นำเข้า useRouter สำหรับการนำทาง

export default {
  setup() {
    const email = ref('') // ใช้ ref สำหรับอีเมล
    const password = ref('') // ใช้ ref สำหรับรหัสผ่าน
    const router = useRouter() // เรียกใช้ useRouter สำหรับการนำทาง

    const login = async () => {
      try {
        // ใช้ Firebase Authentication เพื่อเข้าสู่ระบบ
        await signInWithEmailAndPassword(auth, email.value, password.value)
        alert('Logged in successfully!')
        router.push('/leave-request') // เปลี่ยนเส้นทางไปที่หน้าขอลางาน
      } catch (error) {
        alert('Failed to login')
        console.error('Error during login: ', error) // แสดง error ใน console
      }
    }

    return { email, password, login } // ส่งคืนตัวแปรและฟังก์ชันให้ใช้ใน template
  }
}
</script>

<style scoped>
/* สไตล์สำหรับฟอร์มล็อกอิน */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
}

input {
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
