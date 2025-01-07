import { AxiosInstance } from "@/services/api";

class ApiJob {
  jobPostCount = async () => {
    try {
      const response = await AxiosInstance({
        method: "GET",
        url: `jobposts/count`,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching job post count:", error);
      throw error;
    }
  };

  jobPost = async (data) => {
    return AxiosInstance({
      method: "GET",
      url: `jobposts`,
      params: data || {},
    });
  };

  jobDetail = async (id) => {
    return AxiosInstance({
      method: "GET",
      url: `jobposts/${id}`,
    });
  };

  jobUpdate = async (data) => {
    console.log(data);

    return AxiosInstance({
      method: "PUT",
      url: `jobposts/${data.postId}`,
      data: {
        title: data?.title || null,
        detail: data?.detail || null,
        budget: data?.budget || null,
        deadline: data?.deadline || null,
        engRequired: data?.engRequired || false,
        category: data?.category.name || null,
        sampleWork: data?.sampleWork || null,
        status: data?.status || "Pending",
        recruitmentStatus: data?.recruitmentStatus.name || "Recruiting",
      },
    });
  };

  jobStatusUpdate = async (data) => {
    return AxiosInstance({
      method: "PUT",
      url: `jobposts/${data.postId}/status`,
      data: {
        status: data.status,
      },
    });
  };

  jobDelete = async (id) => {
    return AxiosInstance({
      method: "DELETE",
      url: `jobposts/${id}`,
    });
  };

  // Freelancer

  servicePostCount = async () => {
    try {
      const response = await AxiosInstance({
        method: "GET",
        url: `freelancer/count`,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching job post count:", error);
      throw error;
    }
  };

  servicePost = async (data) => {
    return AxiosInstance({
      method: "GET",
      url: `freelancer`,
      params: data || {},
    });
  };

  serviceDetail = async (id) => {
    return AxiosInstance({
      method: "GET",
      url: `freelancer/${id}`,
    });
  };

  serviceUpdate = async (data) => {
    console.log(data);

    return AxiosInstance({
      method: "PUT",
      url: `freelancer/${data.postId}`,
      data: {
        title: data?.title || null,
        detail: data?.detail || null,
        budget: data?.budget || null,
        engAvailable: data?.engAvailable || false,
        category: data?.category.name || "",
        sampleWork: data?.sampleWork || null,
        status: data?.status.name || "Pending",
      },
    });
  };

  serviceStatusUpdate = async (data) => {
    return AxiosInstance({
      method: "PUT",
      url: `freelancer/${data.postId}/status`,
      data: {
        status: data.status,
      },
    });
  };

  serviceDelete = async (id) => {
    return AxiosInstance({
      method: "DELETE",
      url: `freelancer/${id}`,
    });
  };
}

export const API_JOB = new ApiJob();
