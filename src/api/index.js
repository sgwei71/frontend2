import axios from "axios";

// import { tokenStorage } from "@/utils/localStorage";

// import { tokenRefresh } from "./member";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_URL = "http://211.188.58.114:8080"; // http://localhost:8888

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
    },
});

// const updateHeaders = () => {
//   const token = tokenStorage.get();
//   axiosInstance.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null;
// };

// axiosInstance.interceptors.request.use(
//   (config) => {
//     updateHeaders();
//     return config;
//   },
//   (error) => {
//     return error;
//   }
// );

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       // 401 오류가 발생한 경우 토큰을 재발급하는 함수 호출
//       const res = await tokenRefresh();
//       tokenStorage.set(res);
//       updateHeaders();
//       // 재발급된 토큰으로 이전 요청을 다시 보냄
//       return axios(error.config);
//     }
//     // 401 오류 이외의 다른 오류는 그대로 반환
//     return error;
//   }
// );
