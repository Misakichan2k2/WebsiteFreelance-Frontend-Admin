import { defineStore } from "pinia";
import { API_USER } from "@/services/api";
import { RESPONSE } from "@/utils/response";

export const StoreUser = defineStore("StoreUser", () => {
  const { setup } = RESPONSE();
  const API = API_USER.API_USER;

  // User count
  const onActionUserCount = async () => {
    const response = await setup({
      apiFunction: API.userCount(),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "There was an error creating the job post.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // User count
  const onActionFreelancerVerifiedCount = async () => {
    const response = await setup({
      apiFunction: API.freelancerVerifiedCount(),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "There was an error creating the job post.",
      },
    });
    return response;
  };

  // Fetch user accounts
  const onActionUserFetch = async () => {
    const response = await setup({
      apiFunction: API.userFetch(),
      toast: {
        isShow: false,
        type: "SUCCESS",
        msg: "Your job post has been created successfully.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // User Detail
  const onActionUserDetail = async (data) => {
    return await setup({
      apiFunction: API.userDetail(data),
      toast: { isShow: false },
    });
  };

  // Update user
  const onActionUserUpdate = async (data) => {
    return await setup({
      apiFunction: API.userUpdate(data),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "Post updated successfully!",
      },
    });
  };

  // Delete user
  const onActionUserDelete = async (data) => {
    return await setup({
      apiFunction: API.userDelete(data),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "Post deleted successfully!",
      },
    });
  };

  // Freelancer
  // Freelancer count
  const onActionFreelancerCount = async () => {
    const response = await setup({
      apiFunction: API.freelancerCount(),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "There was an error creating the job post.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // Fetch user accounts
  const onActionFreelancerFetch = async () => {
    const response = await setup({
      apiFunction: API.freelancerFetch(),
      toast: {
        isShow: false,
        type: "SUCCESS",
        msg: "Your job post has been created successfully.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // User Detail
  const onActionFreelancerDetail = async (data) => {
    return await setup({
      apiFunction: API.freelancerDetail(data),
      toast: { isShow: false },
    });
  };

  // Update user
  const onActionFreelancerStatusUpdate = async (status, data) => {
    return await setup({
      apiFunction: API.statusUpdate(status, data),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "Post updated successfully!",
      },
    });
  };

  return {
    onActionUserCount,
    onActionFreelancerVerifiedCount,
    onActionUserFetch,
    onActionUserDetail,
    onActionUserUpdate,
    onActionUserDelete,
    onActionFreelancerCount,
    onActionFreelancerFetch,
    onActionFreelancerDetail,
    onActionFreelancerStatusUpdate,
  };
});
