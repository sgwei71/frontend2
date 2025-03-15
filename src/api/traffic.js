import { axiosInstance } from ".";

export const getTraffic = async () => {
    try {
        const response = await axiosInstance.request({
            method: "GET",
            url: `/openApi/traffic`,
        });

        if (response.status === 200) {
            return response.data.dataObject;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};
