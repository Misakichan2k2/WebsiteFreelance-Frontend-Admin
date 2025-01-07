import { AxiosInstance } from "@/services/api";

class ApiUser {
  userCount = async () => {
    try {
      const response = await AxiosInstance({
        method: "GET",
        url: `users/accounts/count`,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching account count:", error);
      throw error;
    }
  };

  freelancerVerifiedCount = async () => {
    const response = await AxiosInstance({
      method: "GET",
      url: `users/accounts/freelancer-count`,
    });
    return response.data;
  };

  userFetch = async () => {
    return await AxiosInstance({
      method: "GET",
      url: `users`,
    });
  };

  userDetail = async (id) => {
    return await AxiosInstance({
      method: "GET",
      url: `users/${id}`,
      params: {
        id: id?.userID || null,
        avatar: id?.avatar || null,
        fullname: id?.username || "",
        email: id?.email || "",
        password: id?.password || "",
        dateOfBirth: id?.dateOfBirth || null,
        gender: id?.gender || null,
        phoneNumber: id?.phoneNumber || null,
        address: id?.address || null,
        role: id?.role || "Customer",
        status: id?.status || "Unverified",
        createdDate: id?.createdDate || "",
      },
    });
  };

  userUpdate = async (data) => {
    return await AxiosInstance({
      method: "PUT",
      url: `users/${data.id}`,
      data: {
        avatar: data?.avatar || null,
        username: data?.fullName || "",
        dateOfBirth: data?.dateOfBirth || null,
        gender: data?.gender || "",
        phoneNumber: data?.phoneNumber || null,
        address: data?.address || null,
        role: data?.role?.name || "Customer",
        status: data?.status || "Unverified",
      },
    });
  };

  userDelete = async (id) => {
    return await AxiosInstance({
      method: "DELETE",
      url: `users/${id}`,
    });
  };

  // Freelancer
  freelancerCount = async () => {
    const response = await AxiosInstance({
      method: "GET",
      url: `freelancerprofile/count`,
    });
    return response.data;
  };

  freelancerFetch = async () => {
    return await AxiosInstance({
      method: "GET",
      url: `freelancerprofile`,
    });
  };

  freelancerDetail = async (id) => {
    return await AxiosInstance({
      method: "GET",
      url: `freelancerprofile/${id}`,
    });
  };

  statusUpdate = async (status, data) => {
    return AxiosInstance({
      method: "PUT",
      url: `freelancerprofile/${data.FRV}/status`,
      data: {
        status: status,
      },
    });
  };
}

export const API_USER = new ApiUser();
