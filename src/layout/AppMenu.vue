<script setup>
import { ref } from "vue";

const itemMenu = ref([
  {
    title: "Account Management",
    name: "AccountManagement",
    icon: "pi pi-users",
    isOpen: true,
    item: [
      {
        subItem: "All Accounts",
        name: "AllAccounts",
        icon: "pi pi-user",
      },
      {
        subItem: "Freelancer Verification",
        name: "FreelancerVerification",
        icon: "pi pi-check-circle",
      },
    ],
  },
  {
    title: "Transaction Management",
    name: "TransactionManagement",
    icon: "pi pi-credit-card",
    isOpen: true,
    item: [
      {
        subItem: "Pending Transactions",
        name: "PendingTransactions",
        icon: "pi pi-clock",
      },
      {
        subItem: "Transaction History",
        name: "TransactionHistory",
        icon: "pi pi-history",
      },
    ],
  },
  {
    title: "Post Management",
    name: "PostManagement",
    icon: "pi pi-file",
    isOpen: true,
    item: [
      {
        subItem: "Job Postings",
        name: "JobPostings",
        icon: "pi pi-briefcase",
      },
      {
        subItem: "Service Postings",
        name: "ServicePostings",
        icon: "pi pi-folder-open",
      },
    ],
  },
]);

const toggleSubMenu = (index) => {
  itemMenu.value[index].isOpen = !itemMenu.value[index].isOpen;
};
</script>

<template>
  <div class="flex flex-column shadow-1 h-screen">
    <router-link to="/" class="no-underline">
      <div
        class="flex justify-content-between text-color px-3 align-items-center gap-3 cursor-pointer h-3rem hover:surface-300 hover:text-cyan-600"
      >
        <div class="flex gap-3 align-items-center">
          <i class="pi pi-home"></i>
          <span class="font-semibold">Dashboard</span>
        </div>
      </div>
    </router-link>
    <div class="flex flex-column">
      <div
        v-for="(menu, index) in itemMenu"
        :key="index"
        class="flex flex-column"
      >
        <!-- item menu -->
        <div @click="toggleSubMenu(index)">
          <div
            class="flex justify-content-between px-3 align-items-center gap-3 cursor-pointer h-3rem hover:surface-300 hover:text-cyan-600"
          >
            <div class="flex gap-3 align-items-center">
              <i :class="menu.icon"></i>
              <span class="font-semibold">{{ menu.title }}</span>
            </div>
            <i v-if="menu.item" class="pi pi-angle-down"></i>
          </div>
        </div>

        <!-- Sub item menu -->
        <div v-if="menu.isOpen" class="flex flex-column">
          <router-link
            :to="{ name: subMenu.name }"
            v-for="(subMenu, subIndex) in menu.item"
            :key="subIndex"
            class="hover:surface-300 py-2 cursor-pointer text-color hover:text-cyan-600"
            style="text-decoration: none"
          >
            <div class="flex gap-3 align-items-center pl-6">
              <i :class="subMenu.icon"></i>
              <span class="w-fit-content">
                {{ subMenu.subItem }}
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
