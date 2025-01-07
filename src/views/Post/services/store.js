import { defineStore } from "pinia";
import { API_JOB } from "@/services/api";
import { RESPONSE } from "@/utils/response";

export const StoreJob = defineStore("StoreJob", () => {
  const { setup } = RESPONSE();
  const API = API_JOB.API_JOB;

  // Job post count
  const onActionJobPostCount = async () => {
    const response = await setup({
      apiFunction: API.jobPostCount(),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "There was an error getting the job post count.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // Get Job Posts
  const onActionJobPost = async (data) => {
    const response = await setup({
      apiFunction: API.jobPost(data),
      toast: {
        isShow: false,
        type: "SUCCESS",
        msg: "Your job post has been fetched successfully.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // Job Detail
  const onActionJobDetail = async (data) => {
    return await setup({
      apiFunction: API.jobDetail(data),
      toast: { isShow: false },
    });
  };

  // Job Update
  const onActionJobUpdate = async (data) => {
    return await setup({
      apiFunction: API.jobUpdate(data),
      toast: {
        isShow: true,
        type: "POPUP",
        msg: "Post updated successfully!",
      },
    });
  };

  // Job Status Update
  const onActionJobStatusUpdate = async (data) => {
    return await setup({
      apiFunction: API.jobStatusUpdate(data),
      toast: {
        isShow: true,
        type: "POPUP",
        msg: `Post "${data.title}" status updated to "${data.status}" successfully!`,
      },
    });
  };

  // Job Update
  const onActionJobDelete = async (data) => {
    return await setup({
      apiFunction: API.jobDelete(data),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "Post deleted successfully!",
      },
    });
  };

  // Freelancer

  // Service post count
  const onActionServicePostCount = async () => {
    const response = await setup({
      apiFunction: API.servicePostCount(),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "There was an error getting the job post count.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // Get Service Posts
  const onActionServicePost = async (data) => {
    const response = await setup({
      apiFunction: API.servicePost(data),
      toast: {
        isShow: false,
        type: "SUCCESS",
        msg: "Your job post has been fetched successfully.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // Service Detail
  const onActionServiceDetail = async (data) => {
    return await setup({
      apiFunction: API.serviceDetail(data),
      toast: { isShow: false },
    });
  };

  // Service Update
  const onActionServiceUpdate = async (data) => {
    return await setup({
      apiFunction: API.serviceUpdate(data),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "Post updated successfully!",
      },
    });
  };

  // Service Status Update
  const onActionServiceStatusUpdate = async (data) => {
    return await setup({
      apiFunction: API.serviceStatusUpdate(data),
      toast: {
        isShow: true,
        type: "POPUP",
        msg: `Post "${data.title}" status updated to "${data.status}" successfully!`,
      },
    });
  };

  // Service Update
  const onActionServiceDelete = async (data) => {
    return await setup({
      apiFunction: API.serviceDelete(data),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "Post deleted successfully!",
      },
    });
  };

  return {
    onActionJobPostCount,
    onActionJobPost,
    onActionJobDetail,
    onActionJobUpdate,
    onActionJobDelete,
    onActionJobStatusUpdate,
    onActionServicePostCount,
    onActionServicePost,
    onActionServiceDetail,
    onActionServiceUpdate,
    onActionServiceDelete,
    onActionServiceStatusUpdate,
  };
});
