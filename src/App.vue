<script setup>
import AppTopbar from "./layout/AppTopbar.vue";
import AppMenu from "./layout/AppMenu.vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();
</script>

<template>
  <Toast />
  <AppTopbar />
  <div class="flex">
    <AppMenu />
    <div class="flex-1 p-3">
      <router-view />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>
