<script setup>
import { ref, onMounted } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { FilterMatchMode } from "@primevue/core/api";
import { format } from "date-fns";
import { STORE_USER } from "@/services/stores";

const toast = useToast();
const confirm = useConfirm();
const visible = ref(false);
const selectedFreelancer = ref(null);
const selectedFreelancers = ref([]);
const freelancers = ref([]);
const freelancerCount = ref(0);

const {
  onActionFreelancerCount,
  onActionFreelancerFetch,
  onActionFreelancerStatusUpdate,
} = STORE_USER.StoreUser();

const formatDateTime = (date) => {
  return format(new Date(date), "dd/MM/yyyy HH:mm");
};

const getSeverity = (status) => {
  switch (status.toLowerCase()) {
    case "verified":
      return "success";
    case "rejected":
      return "warn";
    default:
      return "info";
  }
};

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const clearFilter = () => {
  filters.value.global.value = null;
};

const openDialog = (post) => {
  selectedFreelancer.value = { ...post };
  visible.value = true;
};

// const updateStatus = async (status, freelancer) => {
//   try {
//     if (!freelancer || !freelancer._id) {
//       console.error("Freelancer ID is missing");
//       return;
//     }

//     const updatedData = { ...freelancer, status };
//     const response = await onActionFreelancerStatusUpdate(updatedData);

//     if (response && response.data) {
//       const index = freelancers.value.findIndex(
//         (f) => f._id === updatedData._id
//       );
//       if (index !== -1) {
//         freelancers.value[index] = { ...updatedData };
//       }

//       toast.add({
//         severity: "success",
//         summary: "Status Updated",
//         detail: `Freelancer "${selectedFreelancer.value.name}" has been marked as "${status}" successfully.`,
//         life: 3000,
//       });
//     }

//     await fetchFreelancers();
//   } catch (error) {
//     console.error("Error updating status:", error);
//     toast.add({
//       severity: "error",
//       summary: "Status Update Error",
//       detail: "Failed to update the status.",
//       life: 3000,
//     });
//   }
// };

const fetchFreelancers = async () => {
  try {
    const response = await onActionFreelancerFetch();
    freelancers.value = response.data.map((freelancer) => ({
      ...freelancer,
    }));
  } catch (error) {
    console.error("Error fetching freelancers:", error);
  }
};

const confirmStatusUpdate = async (freelancer) => {
  console.log(freelancer.value);

  confirm.require({
    message: `Do you want to verify this freelancer?`,
    rejectProps: {
      label: "Reject",
      severity: "danger",
    },
    acceptProps: {
      label: "Verify",
    },
    accept: () =>
      onActionFreelancerStatusUpdate("Verified", freelancer).then(async () => {
        await fetchFreelancers();
        toast.add({
          severity: "success",
          summary: "Freelancer Verified",
          detail: `Freelancer "${freelancer.userProfile.username}" has been successfully verified.`,
          life: 3000,
        });
      }),
    reject: () =>
      onActionFreelancerStatusUpdate("Rejected", freelancer).then(async () => {
        await fetchFreelancers();
        toast.add({
          severity: "success",
          summary: "Freelancer Rejected",
          detail: `Freelancer "${freelancer.userProfile.username}" has been rejected for freelancer verification.`,
          life: 3000,
        });
      }),
  });
};

onMounted(async () => {
  await fetchFreelancers();

  const countResponse = await onActionFreelancerCount();
  if (countResponse && countResponse.count !== undefined) {
    freelancerCount.value = countResponse.count;
  }
});
</script>

<template>
  <ConfirmPopup></ConfirmPopup>
  <div class="card">
    <DataTable
      ref="dataTable"
      v-model:filters="filters"
      v-model:selection="selectedFreelancers"
      :value="freelancers"
      :paginator="freelancers?.length > 0"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{currentPage} of {totalPages}"
      dataKey="_id"
      filterDisplay="menu"
      :globalFilterFields="['name', 'email', 'status', 'createdAt']"
    >
      <template #header>
        <div class="flex justify-content-between -mx-2 pb-2">
          <div class="flex gap-2 align-items-center">
            <span class="font-semibold">Pending Freelancer Verifications:</span>
            <Tag severity="info" value="Info">{{ freelancerCount }}</Tag>
          </div>
          <div class="flex gap-2">
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              outlined
              @click="clearFilter"
            />
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search..."
              class="p-input-icon-left"
            >
              <i class="pi pi-search" />
            </InputText>
          </div>
        </div>
      </template>

      <template #empty>
        <p class="text-center my-4">
          No pending freelancer verifications found.
        </p>
      </template>

      <Column field="FRV" header="ID" sortable></Column>
      <Column header="Avatar">
        <template #body="{ data }">
          <div class="w-3rem h-3rem">
            <img
              :src="
                data.userProfile.avatar.startsWith('http')
                  ? data.userProfile.avatar
                  : `http://localhost:3000${data.userProfile.avatar}`
              "
              alt="Avatar"
              class="w-full h-full border-circle"
              style="object-fit: cover"
            />
          </div>
        </template>
      </Column>
      <Column field="userProfile.username" header="Name" sortable></Column>
      <Column field="email" header="Email" sortable></Column>
      <Column field="createdAt" header="Requested On" sortable>
        <template #body="slotProps">
          {{
            slotProps.data.createdAt
              ? formatDateTime(slotProps.data.createdAt)
              : "N/A"
          }}
        </template>
      </Column>
      <Column field="status" header="Status" sortable>
        <template #body="{ data }">
          <Tag :severity="getSeverity(data.status)" :value="data.status"></Tag>
        </template>
      </Column>

      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex gap-1">
            <Button
              @click="confirmStatusUpdate(data)"
              icon="pi pi-check"
            ></Button>
            <Button
              type="button"
              icon="pi pi-info-circle"
              @click="openDialog(data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    header="Freelancer Profile Verification Information"
    :style="{ width: '40rem' }"
  >
    <div class="flex flex-column gap-3 mb-3">
      <label for="frv" class="font-semibold">Freelancer verification ID</label>
      <InputText v-model="selectedFreelancer.FRV" />
    </div>

    <div class="flex gap-3 mb-3">
      <div class="flex flex-column gap-3 w-full">
        <label for="userId" class="font-semibold">User ID</label>
        <InputText v-model="selectedFreelancer.userProfile.userId" />
      </div>
      <div class="flex flex-column gap-3 w-full">
        <label for="userName" class="font-semibold">User Name</label>
        <InputText v-model="selectedFreelancer.userProfile.username" />
      </div>
    </div>

    <div class="flex flex-column gap-3 mb-3">
      <label for="description" class="font-semibold">Description</label>
      <Textarea
        v-model="selectedFreelancer.description"
        autoResize
        rows="3"
        cols="30"
      />
    </div>

    <div class="flex gap-3 mb-3">
      <div class="flex flex-column gap-3 w-full">
        <label for="bankAccountName" class="font-semibold"
          >Bank account name</label
        >
        <InputText v-model="selectedFreelancer.bankAccountName" />
      </div>
      <div class="flex flex-column gap-3 w-full">
        <label for="bankAccountName" class="font-semibold"
          >Bank account number</label
        >
        <InputText v-model="selectedFreelancer.bankAccountNumber" />
      </div>
    </div>

    <div class="flex gap-3 mb-3">
      <div class="flex flex-column gap-3 w-full">
        <label for="fullname" class="font-semibold">Full name</label>
        <InputText v-model="selectedFreelancer.fullName" />
      </div>
      <div class="flex flex-column gap-3 w-full">
        <label for="idCardNumber" class="font-semibold">ID card number</label>
        <InputText v-model="selectedFreelancer.idCardNumber" />
      </div>
    </div>

    <div class="flex flex-column gap-3 mb-3">
      <label for="idCardImage" class="font-semibold">ID Card Image</label>
      <div class="w-10">
        <img
          :src="`http://localhost:3000/uploads/${selectedFreelancer.imagePath}`"
          alt="idCardImage"
          class="w-full"
        />
      </div>
    </div>

    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Okay" @click="visible = false"></Button>
    </div>
  </Dialog>
</template>

<style scoped></style>
