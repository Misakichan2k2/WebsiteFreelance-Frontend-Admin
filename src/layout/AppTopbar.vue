<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import avatar from "../../public/images/nyanko_sensei.jpg";

const router = useRouter();

const keySearch = ref(null);

const menu = ref();
const items = ref([
  {
    label: "Setting",
    icon: "pi pi-cog",
    command: () => router.push("/account-settings"),
  },
  {
    separator: true,
  },
  {
    label: "Log out",
    icon: "pi pi-sign-out",
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div
    class="flex align-items-center px-3 py-2 justify-content-between background-header"
  >
    <div class="flex align-items-center gap-5">
      <RouterLink to="/" class="no-underline">
        <span class="text-4xl text-white cursor-pointer font-semibold"
          >Freelance</span
        ></RouterLink
      >
      <!-- <IconField>
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="keySearch"
          placeholder="Search for freelance work..."
        />
      </IconField> -->
    </div>
    <div class="flex align-items-center gap-5">
      <!-- <i class="pi pi-bell text-white text-3xl cursor-pointer"></i> -->
      <div @click="toggle" class="flex gap-2 align-items-center cursor-pointer">
        <div class="w-3rem h-3rem">
          <img
            :src="avatar"
            alt="Avatar"
            class="w-full h-full border-circle"
            style="object-fit: cover"
          />
          <!-- <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup /> -->
        </div>
        <!-- <i class="pi pi-angle-down text-white text-3xl"></i> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
