<template>
    <form @submit.prevent="saveUser" class="space-y-2">
      <input v-model="user.firstname" placeholder="ชื่อ" required class="border p-2 w-full" />
      <input v-model="user.lastname" placeholder="นามสกุล" required class="border p-2 w-full" />
      <input v-model="user.age" type="number" placeholder="อายุ" required class="border p-2 w-full" />
      <select v-model="user.gender" required class="border p-2 w-full">
        <option value="ชาย">ชาย</option>
        <option value="หญิง">หญิง</option>
        <option value="ไม่ระบุ">ไม่ระบุ</option>
      </select>
      <button type="submit" class="bg-green-500 text-white px-4 py-2">บันทึก</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useUserStore } from '../store/userStore';
  
  const userStore = useUserStore();
  const user = ref({ firstname: '', lastname: '', age: '', gender: '' });
  
  const saveUser = async () => {
    if (user.value.id) {
      await userStore.updateUser(user.value.id, user.value);
    } else {
      await userStore.addUser(user.value);
    }
    user.value = { firstname: '', lastname: '', age: '', gender: '' };
  };
  </script>
  