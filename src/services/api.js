// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;

import axios from "axios";

export * as API_USER from "@/views/Account/services/api";
export * as API_JOB from "@/views/Post/services/api";
export * as API_TRANSACTION from "@/views/Transaction/services/api";

class ApiApp {}

export const API_APP = new ApiApp();

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

const updateAuthorizationHeader = (token) => {
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
};

AxiosInstance.interceptors.request.use((config) => {
  if (config) return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    if (response) return response;
  },
  (error) => {
    // if (["TOKEN_EXPIRED"].includes(error?.response?.data?.statusCode)) {
    //   onDeleteAppLocalStorage();
    // }

    return Promise.reject(error);
  }
);

export { AxiosInstance, updateAuthorizationHeader };
