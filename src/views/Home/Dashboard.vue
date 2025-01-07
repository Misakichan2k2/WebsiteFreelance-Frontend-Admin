<script setup>
import { ref, onMounted } from "vue";
import ChartData from "./components/ChartData.vue";
import { STORE_USER, STORE_JOB, STORE_TRANSACTION } from "@/services/stores";

const stats = ref([
  { title: "Total Users", value: 0, icon: "pi pi-users", color: "bg-cyan-500" },
  {
    title: "Freelancers Verified",
    value: 0,
    icon: "pi pi-check-circle",
    color: "bg-green-500",
  },
  {
    title: "Pending Post Approvals",
    value: 0,
    icon: "pi pi-exclamation-circle",
    color: "bg-yellow-500",
  },
  {
    title: "Transactions",
    value: 0,
    icon: "pi pi-money-bill",
    color: "bg-orange-500",
  },
]);

const recentPosts = ref([
  { title: "New Job Posting", date: "2025-01-05", status: "Active" },
  {
    title: "Freelancer Profile Approved",
    date: "2025-01-04",
    status: "Approved",
  },
  { title: "Transaction Completed", date: "2025-01-03", status: "Completed" },
]);

const { onActionUserCount, onActionFreelancerVerifiedCount } =
  STORE_USER.StoreUser();
const { onActionJobPostCount } = STORE_JOB.StoreJob();
const { onActionHistoryTransactionCount } =
  STORE_TRANSACTION.StoreTransaction();

// Fetch data on mounted
onMounted(async () => {
  try {
    // Lấy số lượng user, freelancer verified, job post và transaction count cùng một lúc
    const [
      userCountResponse,
      freelancerVerifiedCountResponse,
      jobPostCountResponse,
      historyTransactionCountResponse,
    ] = await Promise.all([
      onActionUserCount(),
      onActionFreelancerVerifiedCount(),
      onActionJobPostCount(),
      onActionHistoryTransactionCount(),
    ]);

    // Cập nhật số lượng user vào stats
    if (userCountResponse && userCountResponse.count !== undefined) {
      stats.value[0].value = userCountResponse.count;
    } else {
      console.error("Invalid response structure or user count not available");
    }

    // Cập nhật số lượng freelancer verified vào stats
    if (
      freelancerVerifiedCountResponse &&
      freelancerVerifiedCountResponse.count !== undefined
    ) {
      stats.value[1].value = freelancerVerifiedCountResponse.count;
    } else {
      console.error(
        "Invalid response structure or freelancer verified count not available"
      );
    }

    // Cập nhật số lượng job posts vào stats
    if (jobPostCountResponse && jobPostCountResponse.count !== undefined) {
      stats.value[2].value = jobPostCountResponse.count;
    } else {
      console.error(
        "Invalid response structure or job post count not available"
      );
    }

    // Cập nhật số lượng transaction history vào stats
    if (
      historyTransactionCountResponse &&
      historyTransactionCountResponse.data !== undefined
    ) {
      stats.value[3].value = historyTransactionCountResponse.data || 0; // Lấy từ data
    } else {
      console.error(
        "Invalid response structure or transaction history count not available"
      );
    }
  } catch (error) {
    console.error("Error fetching account count:", error);
  }
});
</script>

<template>
  <!-- Dashboard Header -->

  <div class="flex flex-column shadow-1 border-round-md px-4">
    <div class="text-3xl font-semibold mb-6">Dashboard</div>
    <!-- Stats Section -->
    <div class="grid grid-nogutter md:grid-4 gap-4">
      <div v-for="(stat, index) in stats" :key="index" class="col">
        <div
          :class="`p-4 border-round shadow-2 ${stat.color} text-white flex flex-column align-items-center justify-content-center`"
        >
          <i :class="stat.icon + ' text-4xl mb-3'"></i>
          <div class="text-xl font-bold">{{ stat.value }}</div>
          <div>{{ stat.title }}</div>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="mt-5">
      <ChartData />
    </div>
  </div>

  <!-- Recent Activity Section -->
  <div class="mt-6">
    <div class="text-2xl font-semibold mb-4">Recent Activity</div>
    <div class="p-4 border-round shadow-2 bg-white">
      <ul class="list-none">
        <li
          v-for="(post, index) in recentPosts"
          :key="index"
          class="p-3 border-bottom flex justify-content-between align-items-center"
        >
          <div class="font-semibold">{{ post.title }}</div>
          <div class="text-sm text-gray-500">{{ post.date }}</div>
          <div
            :class="{
              'text-green-500': post.status === 'Approved',
              'text-yellow-500': post.status === 'Active',
              'text-gray-500': post.status === 'Completed',
            }"
          >
            {{ post.status }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* You can add extra customization if needed, but PrimeVue & PrimeFlex already provide most styles */
</style>
