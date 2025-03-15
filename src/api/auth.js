import { axiosInstance } from ".";

export const signin = async (userId, password) => {
    try {
        const response = await axiosInstance.request({
            method: "POST",
            url: `/auth/login`,
            data: {
                userId,
                password,
            },
        });

        if (response.status === 201) {
            return response.data;
        } else {
            return {};
        }
    } catch (error) {
        return error.response.data || { message: "서버에 문제가 발생했습니다." };
    }
};

export const changePwd = async (userId, password, newPassword) => {
    try {
        const response = await axiosInstance.request({
            method: "POST",
            url: `/auth/change-password`,
            data: {
                userId,
                password,
                newPassword,
            },
        });

        if (response.status === 201) {
            return response.data;
        } else {
            return {};
        }
    } catch (error) {
        return error.response.data || { message: "서버에 문제가 발생했습니다." };
    }
};
