<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { FilterMatchMode } from "@primevue/core/api";
import { format } from "date-fns";
import { STORE_TRANSACTION } from "@/services/stores";

const toast = useToast();
const confirm = useConfirm();
const visible = ref(false);
const selectedTransaction = ref(null);
const selectedTransactions = ref([]);
const transactions = ref([]);
const historyTransactionCount = ref(0);
const router = useRouter();

const { onActionHistoryTransactionCount, onActionHistoryTransaction } =
  STORE_TRANSACTION.StoreTransaction();

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
});

const getSeverity = (status) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "success";
    case "rejected":
      return "danger";
    default:
      return "info";
  }
};

const clearFilter = () => {
  filters.value.global.value = null;
};

const formatDateTime = (date) => {
  return format(new Date(date), "dd/MM/yyyy HH:mm");
};

const openDialog = (post) => {
  selectedTransaction.value = { ...post };
  visible.value = true;
};

const handleRowClick = () => {};

const fetchTransactions = async () => {
  try {
    const transactionsResponse = await onActionHistoryTransaction();
    const countResponse = await onActionHistoryTransactionCount();

    transactions.value = transactionsResponse.data.data;

    historyTransactionCount.value = countResponse.data || 0;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to fetch transactions or count.",
    });
  }
};

onMounted(() => {
  fetchTransactions();
});
</script>

<template>
  <ConfirmPopup></ConfirmPopup>
  <div class="card">
    <DataTable
      ref="dataTable"
      v-model:filters="filters"
      v-model:selection="selectedTransactions"
      :value="transactions"
      :paginator="transactions?.length > 0"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{currentPage} of {totalPages}"
      @row-click="handleRowClick"
      dataKey="id"
      filterDisplay="menu"
      :globalFilterFields="[
        'postId',
        'status',
        'username',
        'title',
        'createdAt',
      ]"
    >
      <template #header>
        <div class="flex justify-content-between -mx-2 pb-2">
          <div class="flex gap-2 align-items-center">
            <span class="font-semibold">All transaction history:</span>
            <Tag severity="info" value="Info">{{
              historyTransactionCount
            }}</Tag>
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
        <p class="text-center my-4">No history transactions found.</p>
      </template>

      <Column
        field="invoiceId"
        header="No."
        style="cursor: pointer"
        sortable
      ></Column>
      <Column
        field="postId.postBy.userId"
        header="Customer ID"
        style="cursor: pointer"
        sortable
      ></Column>
      <Column
        field="postId.assignedFreelancer.userId"
        header="Assigned Freelancer ID"
        style="cursor: pointer"
        sortable
      ></Column>
      <Column
        field="postId.title"
        header="Title"
        style="cursor: pointer"
        sortable
      ></Column>
      <Column
        field="postId.budget"
        header="Amount"
        style="cursor: pointer"
        sortable
      ></Column>
      <Column
        field="createdAt"
        header="Transaction Time"
        style="cursor: pointer"
        sortable
      >
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
              type="button"
              icon="pi pi-info-circle"
              @click="openDialog(data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>

  <!-- Dialog -->
  <Dialog
    v-model:visible="visible"
    modal
    header="Transaction detail"
    :style="{ width: '40rem' }"
  >
    <div class="flex flex-column gap-3 mb-3">
      <label for="title" class="font-semibold">Title</label>
      <InputText v-model="selectedTransaction.postId.title" />
    </div>

    <div class="flex gap-3 mb-3">
      <div class="flex flex-column gap-3 w-full">
        <label for="assignedFreelancerId" class="font-semibold"
          >Assigned freelancer ID</label
        >
        <InputText
          v-model="selectedTransaction.postId.assignedFreelancer.userId"
        />
      </div>
      <div class="flex flex-column gap-3 w-full">
        <label for="assignedFreelancerName" class="font-semibold"
          >Assigned freelancer Name</label
        >
        <InputText
          v-model="selectedTransaction.postId.assignedFreelancer.username"
        />
      </div>
    </div>

    <div class="flex flex-column gap-3 mb-3">
      <label for="budget" class="font-semibold">Budget</label>
      <InputNumber
        v-model="selectedTransaction.postId.budget"
        mode="currency"
        currency="USD"
        class="flex-grow-1"
        min="0"
      />
    </div>

    <div class="flex flex-column gap-3 mb-3">
      <label for="transactionImage" class="font-semibold"
        >Transaction Image</label
      >
      <div class="w-5">
        <img
          :src="`http://localhost:3000/uploads/${selectedTransaction.imagePath}`"
          alt="transactionImage"
          class="w-full"
        />
      </div>
    </div>

    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Okay" @click="visible = false"></Button>
    </div>
  </Dialog>
</template>
