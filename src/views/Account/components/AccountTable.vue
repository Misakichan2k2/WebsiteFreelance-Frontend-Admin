<script setup>
import { ref, onMounted } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { format } from "date-fns";
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import { STORE_USER } from "@/services/stores";

const { onActionUserFetch } = STORE_USER.StoreUser();
const { onActionUserDelete } = STORE_USER.StoreUser();
const { onActionUserUpdate } = STORE_USER.StoreUser();

const visible = ref(false);
const selectedUser = ref(null);

const confirm = useConfirm();
const toast = useToast();

const users = ref([]);

const selectedUsers = ref([]);
const filters = ref();
const role = ref([{ name: "Customer" }, { name: "Freelancer" }]);

const genderType = ref([
  {
    code: "male",
    name: "Nam",
  },
  {
    code: "female",
    name: "Nữ",
  },
]);

const formatDateTime = (date) => {
  return format(new Date(date), "dd/MM/yyyy HH:mm");
};

// Hàm để gọi API lấy danh sách người dùng
const fetchUsers = async () => {
  const response = await onActionUserFetch();

  console.log(response);

  if (response.data) {
    users.value = response.data.map((user) => ({
      id: user.userId,
      email: user.email,
      fullName: user.username,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
    }));
  }
};

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    email: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    role: { value: null, matchMode: FilterMatchMode.IN },
    createdAt: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
  };
};

initFilters();

// const formatDate = (value) => {
//   return value.toLocaleDateString("en-US", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });
// };

const clearFilter = () => {
  initFilters();
  const dataTable = document.querySelector('[ref="dataTable"]');
  if (dataTable && dataTable.reset) {
    dataTable.reset();
  }
};

const filteredRoles = ref([]);

const searchRole = (event) => {
  const query = event.query.toLowerCase();
  filteredRoles.value = role.value.filter((item) =>
    item.name.toLowerCase().includes(query)
  );
};

const openDialog = (user) => {
  selectedUser.value = { ...user }; // Clone the user to avoid direct mutation
  visible.value = true;
};

const saveUser = async () => {
  await onActionUserUpdate(selectedUser.value)
    .then(async () => {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "User updated successfully",
        life: 3000,
      });
      visible.value = false;
      await fetchUsers();
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Failed to update user",
        life: 3000,
      });
    });
};

const confirm2 = (user, event) => {
  confirm.require({
    target: event.currentTarget,
    message: "Do you want to delete this user?",
    icon: "pi pi-info-circle",
    acceptProps: { label: "Delete", severity: "danger" },
    rejectProps: { label: "Cancel", severity: "secondary" },
    accept: async () => {
      try {
        await onActionUserDelete(user.id);
        users.value = users.value.filter((u) => u.id !== user.id);
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "User deleted successfully",
          life: 3000,
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete user",
          life: 3000,
        });
      }
    },
  });
};

// Gọi fetchUsers khi component được mount
onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <ConfirmPopup></ConfirmPopup>
  <div class="card">
    <DataTable
      ref="dataTable"
      :filters="filters"
      :selection="selectedUsers"
      :value="users"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{currentPage} of {totalPages}"
      dataKey="id"
      filterDisplay="menu"
      :globalFilterFields="['id', 'fullName', 'email', 'role', 'gender']"
    >
      <template #header>
        <div class="flex gap-3">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            outlined
            @click="clearFilter"
          />
          <InputText
            v-model="filters['global'].value"
            placeholder="Keyword Search"
            class="p-input-icon-left"
          >
            <i class="pi pi-search" />
          </InputText>
        </div>
      </template>

      <template #empty> No users found. </template>

      <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->

      <Column field="id" header="ID" sortable></Column>
      <Column header="Avatar">
        <template #body="{ data }">
          <div class="w-3rem h-3rem">
            <img
              :src="
                data.avatar.startsWith('http')
                  ? data.avatar
                  : `http://localhost:3000${data.avatar}`
              "
              alt="Avatar"
              class="w-full h-full border-circle"
              style="object-fit: cover"
            />
          </div>
        </template>
      </Column>

      <Column field="fullName" header="Full Name" sortable></Column>
      <Column field="email" header="Email" sortable></Column>
      <Column field="role" header="Role" sortable></Column>

      <Column
        field="createdAt"
        header="Created at"
        sortable
        style="min-width: 10rem"
      >
        <template #body="slotProps">
          {{
            slotProps.data.createdAt
              ? formatDateTime(slotProps.data.createdAt)
              : "N/A"
          }}
        </template>
      </Column>

      <Column
        headerStyle="width: 5rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
      >
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button
              type="button"
              icon="pi pi-user-edit"
              @click="openDialog(data)"
            />
            <Button
              @click="confirm2(data, $event)"
              icon="pi pi-trash"
              severity="danger"
              outlined
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>

  <!-- Dialog -->
  <div class="flex justify-content-center">
    <Dialog
      v-model:visible="visible"
      modal
      header="Edit Profile"
      :style="{ width: '30rem' }"
    >
      <span class="text-color-secondary block mb-3"
        >Update your information.</span
      >

      <div class="flex align-items-center gap-3 mb-3">
        <label for="id" class="font-semibold w-6rem">ID</label>
        <InputText v-model="selectedUser.id" class="flex-grow-1" disabled />
      </div>

      <div class="flex align-items-center gap-3 mb-3">
        <label for="name" class="font-semibold w-6rem">Full Name</label>
        <InputText
          v-model="selectedUser.fullName"
          class="flex-grow-1"
          autocomplete="off"
        />
      </div>

      <div class="flex align-items-center gap-3 mb-3">
        <label for="email" class="font-semibold w-6rem">Email</label>
        <InputText v-model="selectedUser.email" class="flex-grow-1" disabled />
      </div>

      <div class="flex align-items-center gap-3 mb-3">
        <label for="dateOfBirth" class="font-semibold w-6rem"
          >Date of birth</label
        >
        <DatePicker
          v-model="selectedUser.dateOfBirth"
          showIcon
          fluid
          iconDisplay="input"
          inputId="icondisplay"
          class="flex-grow-1"
        />
      </div>

      <div class="flex align-items-center gap-3 mb-3">
        <label for="gender" class="font-semibold w-6rem">Gender</label>
        <div v-for="gender in genderType" :key="gender.code" class="flex gap-2">
          <RadioButton
            v-model="selectedUser.gender"
            :inputId="'gender-' + gender.code"
            :value="gender.code"
          />
          <label :for="'gender-' + gender.code">{{ gender.name }}</label>
        </div>
      </div>

      <div class="flex align-items-center gap-3 mb-3">
        <label for="phoneNumber" class="font-semibold w-6rem"
          >Phone number</label
        >
        <InputText v-model="selectedUser.phoneNumber" class="flex-grow-1" />
      </div>

      <div class="flex align-items-center gap-3 mb-3">
        <label for="role" class="font-semibold w-6rem">Role</label>
        <AutoComplete
          v-model="selectedUser.role"
          :suggestions="filteredRoles"
          @complete="searchRole"
          optionLabel="name"
          dropdown
          class="flex-grow-1"
        />
      </div>

      <div class="flex align-items-center gap-3 mb-3">
        <label for="address" class="font-semibold w-6rem">Address</label>
        <InputText v-model="selectedUser.address" class="flex-grow-1" />
      </div>

      <div class="flex justify-content-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button type="button" label="Save" @click="saveUser"></Button>
      </div>
    </Dialog>
  </div>
</template>
