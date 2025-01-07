<script setup>
import { ref, onMounted } from "vue";
import AccountTable from "./components/AccountTable.vue";
import { STORE_USER } from "@/services/stores";

const { onActionUserCount } = STORE_USER.StoreUser();

const accountCount = ref(0);

onMounted(async () => {
  try {
    const response = await onActionUserCount();

    // Truy cập giá trị `count` trực tiếp từ response
    if (response && response.count !== undefined) {
      accountCount.value = response.count; // Update account count
    } else {
      console.error("Invalid response structure or count not available");
    }
  } catch (error) {
    console.error("Error fetching account count:", error);
  }
});
</script>

<template>
  <div class="flex flex-column gap-3">
    <h2 class="font-semibold">Account Management</h2>
    <div class="flex justify-content-between">
      <div class="flex gap-2 align-items-center">
        <span>All accounts:</span>
        <Tag severity="info" value="Info">{{ accountCount }}</Tag>
      </div>
    </div>
    <div>
      <AccountTable />
    </div>
  </div>
</template>

<style scoped></style>
