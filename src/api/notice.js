import { axiosInstance } from ".";

export const getNotice = async (round) => {
    try {
        const response = await axiosInstance.request({
            method: "GET",
            url: `/notice?round=${round}`,
        });

        if (response.status === 200) {
            return response.data.dataArray;
        } else {
            return {};
        }
    } catch (error) {
        console.error(error);
    }
};
