import { AxiosInstance } from "@/services/api";

class ApiTransaction {
  pendingTransactionCount = async () => {
    try {
      const response = await AxiosInstance({
        method: "GET",
        url: `payment/pending-count`,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching pending transaction count:", error);
      throw error;
    }
  };

  historyTransactionCount = async () => {
    try {
      const response = await AxiosInstance({
        method: "GET",
        url: `payment/history-count`,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching history transaction count:", error);
      throw error;
    }
  };

  transaction = async () => {
    return AxiosInstance({
      method: "GET",
      url: `payment`,
    });
  };

  pendingTransaction = async () => {
    return AxiosInstance({
      method: "GET",
      url: `payment/status?status=Pending`,
    });
  };

  historyTransaction = async () => {
    return AxiosInstance({
      method: "GET",
      url: `payment/status?status=history`,
    });
  };

  transactionDetail = async (id) => {
    return AxiosInstance({
      method: "GET",
      url: `payment/${id}`,
    });
  };

  statusUpdate = async (status, data) => {
    return AxiosInstance({
      method: "PUT",
      url: `payment/${data.invoiceId}/status`,
      data: {
        status: status,
      },
    });
  };
}

export const API_TRANSACTION = new ApiTransaction();
