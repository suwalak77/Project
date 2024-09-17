<template>
  <div>
    <h2>Request Leave</h2>
    <form @submit.prevent="submitLeaveRequest">
      <label for="start">Start Date:</label>
      <input type="date" v-model="startDate" required />

      <label for="end">End Date:</label>
      <input type="date" v-model="endDate" required />

      <label for="reason">Reason:</label>
      <textarea v-model="reason" required></textarea>

      <!-- แสดงแผนที่ Google Maps -->
      <GMapMap :center="center" :zoom="10" style="width: 100%; height: 400px">
        <GMapMarker :position="center"></GMapMarker>
      </GMapMap>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { db, auth } from '../firebase' // นำเข้า Firebase และ Firestore
import { collection, addDoc } from 'firebase/firestore' // Firestore methods

export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      reason: '',
      center: { lat: 13.7563, lng: 100.5018 } // Default location: Bangkok
    }
  },
  methods: {
    async submitLeaveRequest() {
      const user = auth.currentUser // ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่
      if (user) {
        try {
          // บันทึกข้อมูลการลาของพนักงานใน Firestore
          await addDoc(collection(db, 'leaveRequests'), {
            uid: user.uid,
            startDate: this.startDate,
            endDate: this.endDate,
            reason: this.reason,
            location: this.center,
            status: 'pending' // สถานะการลา
          })
          alert('Leave request submitted!')
        } catch (error) {
          console.error('Error submitting leave request: ', error)
        }
      } else {
        alert('You need to log in first')
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  margin-top: 10px;
  padding: 10px;
}
</style>
