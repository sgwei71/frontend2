import { axiosInstance } from ".";

export const getWeather = async () => {
    try {
        const response = await axiosInstance.request({
            method: "GET",
            url: `/openApi/weather`,
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
