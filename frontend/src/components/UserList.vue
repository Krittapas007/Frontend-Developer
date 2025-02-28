<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">รายการผู้ใช้</h2>
  
      <!-- ฟิลเตอร์และการค้นหา -->
      <div class="flex space-x-4 mb-4">
        <input v-model="searchQuery" placeholder="ค้นหาผู้ใช้" class="border p-2" @input="applyFilters" />
        <select v-model="genderFilter" class="border p-2" @change="applyFilters">
          <option value="">ทุกเพศ</option>
          <option value="ชาย">ชาย</option>
          <option value="หญิง">หญิง</option>
          <option value="ไม่ระบุ">ไม่ระบุ</option>
        </select>
        <select v-model="sortBy" class="border p-2" @change="applyFilters">
          <option value="">เรียงตาม</option>
          <option value="firstname">ชื่อ</option>
          <option value="lastname">นามสกุล</option>
          <option value="age">อายุ</option>
        </select>
        <select v-model="order" class="border p-2" @change="applyFilters">
          <option value="asc">น้อยไปมาก</option>
          <option value="desc">มากไปน้อย</option>
        </select>
      </div>
  
      <!-- Table View -->
      <table class="w-full border-collapse border">
        <thead>
          <tr class="bg-gray-200">
            <th class="border p-2">ชื่อ</th>
            <th class="border p-2">นามสกุล</th>
            <th class="border p-2">อายุ</th>
            <th class="border p-2">เพศ</th>
            <th class="border p-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userStore.users" :key="user.id" class="border">
            <td class="p-2">{{ user.firstname }}</td>
            <td class="p-2">{{ user.lastname }}</td>
            <td class="p-2">{{ user.age }}</td>
            <td class="p-2">{{ user.gender }}</td>
            <td class="p-2">
              <button @click="editUser(user.id)" class="bg-blue-500 text-white px-2 py-1">แก้ไข</button>
              <button @click="userStore.deleteUser(user.id)" class="bg-red-500 text-white px-2 py-1 ml-2">ลบ</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '../store/userStore';
  
  const userStore = useUserStore();
  const searchQuery = ref('');
  const genderFilter = ref('');
  const sortBy = ref('');
  const order = ref('asc');
  
  const applyFilters = () => {
    userStore.fetchUsers({
      search: searchQuery.value,
      gender: genderFilter.value,
      sortBy: sortBy.value,
      order: order.value
    });
  };
  
  onMounted(() => {
    userStore.fetchUsers();
  });
  </script>
  