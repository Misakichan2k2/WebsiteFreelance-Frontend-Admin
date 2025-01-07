<script setup>
import { ref, watch, onMounted } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { FilterMatchMode } from "@primevue/core/api";
import { format } from "date-fns";
import { STORE_JOB } from "@/services/stores";

const toast = useToast();
const confirm = useConfirm();
const visible = ref(false);
const selectedPost = ref(null);
const selectedPosts = ref([]);
const posts = ref([]);
const jobPostCount = ref(0);

const {
  onActionServicePostCount,
  onActionServicePost,
  onActionServiceDetail,
  onActionServiceUpdate,
  onActionServiceDelete,
  onActionServiceStatusUpdate,
} = STORE_JOB.StoreJob();

// Hàm để định dạng ngày
// const formatDate = (date) => {
//   return format(new Date(date), "dd/MM/yyyy");
// };

const categories = ref([
  { name: "Graphic Design" },
  { name: "UX/UI Design" },
  { name: "Architecture and Interior Design" },
  { name: "Art and Painting" },
  { name: "Application Development" },
  { name: "IT Solutions" },
  { name: "IoT Work" },
  { name: "Website Development" },
  { name: "Influencer" },
  { name: "Baht" },
  { name: "Online Media" },
  { name: "Person" },
  { name: "Online Store Management" },
  { name: "Lifestyle" },
  { name: "Self-Improvement" },
  { name: "Marketing" },
  { name: "Business and Finance" },
  { name: "Images and Videos" },
  { name: "Put on Makeup" },
  { name: "Stylist" },
  { name: "Actor" },
  { name: "Voice Actor" },
  { name: "Singer" },
  { name: "Sound Engineer" },
  { name: "Writings / Articles" },
  { name: "Language" },
  { name: "Other" },
]);

const filteredCategories = ref([]);

const searchCategories = (event) => {
  const query = event.query.toLowerCase();
  filteredCategories.value = categories.value.filter((item) =>
    item.name.toLowerCase().includes(query)
  );
};

const formatDateTime = (date) => {
  return format(new Date(date), "dd/MM/yyyy HH:mm");
};

const confirmDelete = (post) => {
  confirm.require({
    message: "Are you sure you want to delete this post?",
    rejectProps: {
      label: "Cancel",
      severity: "danger",
      outlined: true,
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: () => deletePost(post),
  });
};

const openDialog = (post) => {
  selectedPost.value = { ...post };
  tempCategory.value = post.category || "";
  visible.value = true;
};

const getSeverity = (status) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "success";
    case "rejected":
      return "danger";
    case "pending":
    default:
      return "info";
  }
};

const onCategorySelect = (event) => {
  if (event.value && event.value.name) {
    tempCategory.value = event.value.name;
  }
};

const tempCategory = ref("");

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const clearFilter = () => {
  filters.value.global.value = null;
};

// const savePost = async () => {
//   try {
//     const updatedData = { ...selectedPost.value };
//     if (!updatedData._id) {
//       console.error("Missing post ID");
//       return;
//     }

//     const response = await onActionServiceUpdate(updatedData);
//     if (response && response.data) {
//       // Cập nhật danh sách bài viết
//       const index = posts.value.findIndex((p) => p._id === updatedData._id);
//       if (index !== -1) {
//         posts.value[index] = { ...updatedData };
//       }
//       visible.value = false;
//       toast.add({
//         severity: "success",
//         summary: "Post Updated",
//         detail: `Post "${updatedData.title}" has been updated successfully.`,
//         life: 3000,
//       });

//       await onActionServicePost().then((res) => {
//         posts.value = res.data.map((job) => ({
//           ...job,
//           category: job.category?.name || job.category,
//         }));
//       });
//     }
//   } catch (error) {
//     console.error("Error updating post:", error);
//   }
// };

watch(
  () => selectedPost.value,
  (newPost) => {
    if (newPost) {
      tempCategory.value = newPost.category || "";
    }
  }
);

const savePost = async () => {
  try {
    // Đồng bộ tempCategory vào selectedPost.category
    selectedPost.value.category = tempCategory.value;

    const updatedData = { ...selectedPost.value };
    if (!updatedData._id) {
      console.error("Missing post ID");
      return;
    }

    const response = await onActionServiceUpdate(updatedData);
    if (response && response.data) {
      // Cập nhật danh sách bài viết
      const index = posts.value.findIndex((p) => p._id === updatedData._id);
      if (index !== -1) {
        posts.value[index] = { ...updatedData };
      }
      visible.value = false;
      toast.add({
        severity: "success",
        summary: "Post Updated",
        detail: `Post "${updatedData.title}" has been updated successfully.`,
        life: 3000,
      });
      // await onActionServicePost().then((res) => {
      //   posts.value = res.data.map((job) => ({
      //     ...job,
      //     category: job.category?.name || job.category,
      //   }));
      // });
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

const updateStatus = async (status, post) => {
  try {
    if (!post || !post.postId) {
      console.error("Post ID is invalid or missing");
      return; // Prevent further action if postId is missing
    }

    const updatedData = { ...post, status }; // Ensure you're updating the correct post

    const response = await onActionServiceStatusUpdate(updatedData); // Update status in the API

    if (response && response.data) {
      // Update the post in the local list
      const index = posts.value.findIndex((p) => p._id === updatedData._id);
      if (index !== -1) {
        posts.value[index] = { ...updatedData };
      }

      toast.add({
        severity: "success",
        summary: "Post Status Updated",
        detail: `Post "${updatedData.title}" has been updated to "${status}".`,
        life: 3000,
      });
    }

    await onActionServicePost();
  } catch (error) {
    console.error("Error updating status:", error);
    toast.add({
      severity: "error",
      summary: "Status Update Error",
      detail: "Failed to update the status.",
      life: 3000,
    });
  }
};

const updateStatusPost = async (post) => {
  if (!post || !post._id) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No post selected for status update.",
      life: 3000,
    });
    return;
  }

  // Open the confirmation dialog for approval/rejection
  confirm.require({
    message: `Do you want to approve this post?`,
    rejectProps: {
      label: "Reject",
      severity: "danger",
    },
    acceptProps: {
      label: "Approve",
    },
    accept: () => updateStatus("Approved", post),
    reject: () => updateStatus("Rejected", post),
  });
};

const deletePost = async (post) => {
  if (!post || !post._id) {
    toast.add({
      severity: "error",
      summary: "Delete Error",
      detail: "No post selected for deletion.",
      life: 3000,
    });
    return;
  }

  try {
    await onActionServiceDelete(post._id); // Gửi yêu cầu xóa đến API
    posts.value = posts.value.filter((p) => p._id !== post._id); // Xóa bài viết khỏi danh sách
    toast.add({
      severity: "success",
      summary: "Post Deleted",
      detail: `Post "${post.title}" has been deleted successfully.`,
      life: 3000,
    });
  } catch (error) {
    console.error("Delete Error:", error);
    toast.add({
      severity: "error",
      summary: "Delete Error",
      detail: "Failed to delete the post.",
      life: 3000,
    });
  }
};

onMounted(async () => {
  await onActionServicePost().then((res) => {
    posts.value = res.data.map((job) => ({
      ...job,
    }));
  });

  await onActionServicePostCount().then((res) => {
    if (res && res.count !== undefined) {
      jobPostCount.value = res.count;
    }
  });
});
</script>

<template>
  <ConfirmPopup></ConfirmPopup>
  <div class="card">
    <DataTable
      ref="dataTable"
      v-model:filters="filters"
      v-model:selection="selectedPosts"
      :value="posts"
      :paginator="posts?.length > 0"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{currentPage} of {totalPages}"
      dataKey="id"
      filterDisplay="menu"
      :globalFilterFields="[
        'id',
        'status',
        'username',
        'title',
        'category',
        'createdAt',
      ]"
    >
      <template #header>
        <div class="flex justify-content-between -mx-2 pb-2">
          <div class="flex gap-2 align-items-center">
            <span class="font-semibold">All job posts:</span>
            <Tag severity="info" value="Info">{{ jobPostCount }}</Tag>
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
        <p class="text-center my-4">No post found.</p>
      </template>

      <Column field="postId" header="No." sortable></Column>
      <Column header="Avatar">
        <template #body="{ data }">
          <div class="w-3rem h-3rem">
            <img
              :src="
                data.postBy.avatar.startsWith('http')
                  ? data.postBy.avatar
                  : `http://localhost:3000${data.postBy.avatar}`
              "
              alt="Avatar"
              class="w-full h-full border-circle"
              style="object-fit: cover"
            />
          </div>
        </template>
      </Column>
      <Column field="postBy.username" header="Author" sortable></Column>
      <Column field="title" header="Title" sortable></Column>
      <Column field="category" header="Category" sortable></Column>
      <Column field="createdAt" header="PostedOn" sortable>
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
            <Button @click="updateStatusPost(data)" icon="pi pi-cog"></Button>
            <Button
              type="button"
              icon="pi pi-user-edit"
              @click="openDialog(data)"
            />
            <Button
              @click="confirmDelete(data)"
              icon="pi pi-trash"
              severity="danger"
              outlined
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>

  <!-- Dialog for editing posts -->
  <Dialog
    v-model:visible="visible"
    modal
    header="Edit Post"
    :style="{ width: '40rem' }"
  >
    <span class="text-color-secondary block mb-3">
      Update post information.
    </span>

    <div class="flex align-items-center gap-3 mb-3">
      <label for="title" class="font-semibold w-6rem">Title</label>
      <InputText v-model="selectedPost.title" class="flex-grow-1" />
    </div>

    <div class="flex align-items-center gap-3 mb-3">
      <label for="detail" class="font-semibold w-6rem">Detail</label>
      <Textarea v-model="selectedPost.detail" rows="3" class="flex-grow-1" />
    </div>

    <div class="flex align-items-center gap-3 mb-3">
      <label for="budget" class="font-semibold w-6rem">Budget</label>
      <InputNumber
        v-model="selectedPost.budget"
        mode="currency"
        currency="USD"
        class="flex-grow-1"
        min="0"
      />
    </div>

    <div class="flex align-items-center gap-3 mb-3">
      <label for="category" class="font-semibold w-6rem">Category</label>
      <!-- <InputText v-model="selectedPost.category" class="flex-grow-1" /> -->
      <AutoComplete
        v-model="tempCategory"
        :suggestions="filteredCategories"
        optionLabel="name"
        @complete="searchCategories"
        @select="onCategorySelect"
        dropdown
        class="flex-grow-1"
      />
    </div>

    <div class="flex align-items-center gap-3 mb-3">
      <label for="sampleWork" class="font-semibold w-6rem">Sample Work</label>
      <InputText v-model="selectedPost.sampleWork" class="flex-grow-1" />
    </div>

    <div class="flex justify-content-between">
      <div class="flex align-items-center mb-3">
        <label for="status" class="font-semibold w-7rem">Status</label>
        <InputText
          v-model="selectedPost.status"
          :options="['Pending', 'Approved', 'Rejected']"
          class="flex-grow-1"
          disabled
        />
      </div>

      <div class="flex justify-content-between">
        <div class="flex align-items-center gap-3 mb-3">
          <label for="engAvailable" class="font-semibold"
            >English Available</label
          >
          <Checkbox
            v-model="selectedPost.engAvailable"
            binary
            class="flex-grow-1"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="visible = false"
      ></Button>
      <Button type="button" label="Save" @click="savePost"></Button>
    </div>
  </Dialog>
</template>
