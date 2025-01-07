<script setup>
import TransactionHistoryTable from "./components/TransactionHistoryTable.vue";
</script>

<template>
  <div class="flex flex-column gap-3">
    <h2 class="font-semibold">Transaction History</h2>
    <div>
      <TransactionHistoryTable />
    </div>
  </div>
</template>

<style scoped></style>
