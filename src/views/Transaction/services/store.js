import { defineStore } from "pinia";
import { API_TRANSACTION } from "@/services/api";
import { RESPONSE } from "@/utils/response";

export const StoreTransaction = defineStore("StoreTransaction", () => {
  const { setup } = RESPONSE();
  const API = API_TRANSACTION.API_TRANSACTION;

  // Pending transaction count
  const onActionPendingTransactionCount = async () => {
    const response = await setup({
      apiFunction: API.pendingTransactionCount(),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "There was an error getting the pending transaction count.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // History transaction count
  const onActionHistoryTransactionCount = async () => {
    const response = await setup({
      apiFunction: API.historyTransactionCount(),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "There was an error getting the history transaction count.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // Get Transactions
  const onActionTransaction = async (data) => {
    const response = await setup({
      apiFunction: API.transaction(data),
      toast: {
        isShow: false,
        type: "SUCCESS",
        msg: "Your transaction has been fetched successfully.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // Get Transaction by Status
  const onActionPendingTransaction = async (data) => {
    const response = await setup({
      apiFunction: API.pendingTransaction(data),
      toast: {
        isShow: false,
        type: "SUCCESS",
        msg: "Your transaction by status has been fetched successfully.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  const onActionHistoryTransaction = async (data) => {
    const response = await setup({
      apiFunction: API.historyTransaction(data),
      toast: {
        isShow: false,
        type: "SUCCESS",
        msg: "Your transaction by status has been fetched successfully.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // Job Detail
  const onActionTransactionDetail = async (data) => {
    return await setup({
      apiFunction: API.transactionDetail(data),
      toast: { isShow: false },
    });
  };

  // Job Update
  const onActionStatusUpdate = async (status, data) => {
    return await setup({
      apiFunction: API.statusUpdate(status, data),
      toast: {
        isShow: true,
        type: "SUCCESS",
        msg: "Payment status updated successfully!",
      },
    });
  };

  return {
    onActionPendingTransactionCount,
    onActionHistoryTransactionCount,
    onActionTransaction,
    onActionPendingTransaction,
    onActionHistoryTransaction,
    onActionTransactionDetail,
    onActionStatusUpdate,
  };
});
