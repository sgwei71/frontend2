import { axiosInstance } from "@/api";
import Cookies from "js-cookie";

export const ACCESS_TOKEN_KEY = "accessToken";
export const ROUND_ID_KEY = "roundId"; //최근에 선책한 차시 값 저장용
export const IS_ADMIN_KEY = "isAdmin";

export const accessTokenCookie = {
    get() {
        return Cookies.get(ACCESS_TOKEN_KEY);
    },
    set(accessToken) {
        Cookies.set(ACCESS_TOKEN_KEY, accessToken);
    },
    remove() {
        Cookies.remove(ACCESS_TOKEN_KEY);
        axiosInstance.defaults.headers.common["Authorization"] = "";
    },
};

export const roundIdCookie = {
    get() {
        return Cookies.get(ROUND_ID_KEY) || 2;
    },
    set(accessToken) {
        Cookies.set(ROUND_ID_KEY, accessToken);
    },
    remove() {
        Cookies.remove(ROUND_ID_KEY);
    },
};

export const isAdminCookie = {
    get() {
        return Cookies.get(IS_ADMIN_KEY) || 1;
    },
    set(accessToken) {
        Cookies.set(IS_ADMIN_KEY, accessToken);
    },
    remove() {
        Cookies.remove(IS_ADMIN_KEY);
    },
};
