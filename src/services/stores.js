import { defineStore } from "pinia";
import { computed, ref } from "vue";

export * as STORE_USER from "@/views/Account/services/store";
export * as STORE_JOB from "@/views/Post/services/store";
export * as STORE_TRANSACTION from "@/views/Transaction/services/store";

export const StoreApp = defineStore("StoreApp", () => {
  const routeSignIn = ref("");
  const isLoading = ref(false);

  const onGetterRouteSignIn = computed(() => routeSignIn);
  const onGetterIsLoading = computed(() => isLoading);

  // Loading
  const onActionIsLoading = (isActive = true) => {
    isLoading.value = isActive;
  };

  return {
    onGetterRouteSignIn,
    onGetterIsLoading,
    onActionIsLoading,
  };
});
