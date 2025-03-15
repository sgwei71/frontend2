import { axiosInstance } from ".";

export const getDashboard = async (round) => {
    try {
        const response = await axiosInstance.request({
            method: "GET",
            url: `/dashboard?round=${round}`,
        });

        if (response.status === 200) {
            return response.data;
        } else {
            return {};
        }
    } catch (error) {
        console.error(error);
    }
};

export const updateDashboard = async (roundId, data, notices, issues) => {
    try {
        const dashboardRes = await axiosInstance.request({
            method: "PUT",
            url: `/dashboard`,
            data: { ...data, round: roundId },
        });
        if (dashboardRes.status !== 200) {
            return {};
        }
        const noticeRes = await axiosInstance.request({
            method: "PUT",
            url: `/notice`,
            data: {
                noticeList: notices,
            },
        });
        if (noticeRes.status !== 200) {
            return {};
        }

        const issueRes = await axiosInstance.request({
            method: "PUT",
            url: `/issue`,
            data: {
                issueList: issues,
            },
        });
        if (issueRes.status !== 200) {
            return {};
        }

        return dashboardRes.data;
    } catch (error) {
        console.error(error);
    }
};

export const getRound = async () => {
    try {
        const response = await axiosInstance.request({
            method: "GET",
            url: `/dashboard/round`,
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