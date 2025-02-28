<template>
  <div class="container mx-auto p-4">
    <router-link to="/" class="text-blue-500">← กลับไปหน้าแรก</router-link>
    <h1 class="text-2xl font-bold my-4">รายละเอียดผู้ใช้</h1>

    <div v-if="userStore.selectedUser" class="border p-4 rounded-lg shadow-lg">
      <p><strong>ชื่อ:</strong> {{ userStore.selectedUser.firstname }}</p>
      <p><strong>นามสกุล:</strong> {{ userStore.selectedUser.lastname }}</p>
      <p><strong>อายุ:</strong> {{ userStore.selectedUser.age }}</p>
      <p><strong>เพศ:</strong> {{ userStore.selectedUser.gender }}</p>
      <p><strong>ความสนใจ:</strong> {{ userStore.selectedUser.interests }}</p>
      <p><strong>คำอธิบาย:</strong> {{ userStore.selectedUser.description }}</p>

      <div class="mt-4">
        <button @click="editUser" class="bg-blue-500 text-white px-4 py-2">แก้ไข</button>
        <button @click="deleteUser" class="bg-red-500 text-white px-4 py-2 ml-2">ลบ</button>
      </div>
    </div>

    <p v-else class="text-red-500">ไม่พบข้อมูลผู้ใช้</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const deleteUser = async () => {
  if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?')) {
    await userStore.deleteUser(route.params.id);
    router.push('/');
  }
};

const editUser = () => {
  alert('ฟีเจอร์แก้ไขยังไม่ได้เพิ่ม');
};

onMounted(() => {
  userStore.fetchUserById(route.params.id);
});
</script>
