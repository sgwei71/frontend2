import { axiosInstance } from ".";

export const getStage = async (round) => {
    try {
        const response = await axiosInstance.request({
            method: "GET",
            url: `/stage?round=${round}`,
        });

        if (response.status === 200) {
            return response.data.dataArray;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};

export const updateStage = async (round) => {
    try {
        const response = await axiosInstance.request({
            method: "POST",
            url: `/stage?round=${round}`,
        });

        if (response.status === 201) {
            return response.data.dataArray;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};

export const deleteStage = async (round, stageIds) => {
    try {
        const response = await axiosInstance.request({
            method: "DELETE",
            url: `/stage?round=${round}`,
            data: {
                stageIds: stageIds,
            },
        });

        if (response.status === 200) {
            return response.data.dataArray;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};

export const getTasks = async (stageId) => {
    try {
        const response = await axiosInstance.request({
            method: "GET",
            url: `/task?stageId=${stageId}`,
        });

        if (response.status === 200) {
            const taskData = response.data.dataArray.map((data) => ({
                ...data,
                expectedStartTime: new Date(data.expectedStartTime),
                expectedEndTime: new Date(data.expectedEndTime),
                actualStartTime: new Date(data.actualStartTime),
                actualEndTime: new Date(data.actualEndTime),
            }));

            return { titleData: response.data.dataObject, taskData };
        } else {
            return {};
        }
    } catch (error) {
        console.error(error);
    }
};

export const updateTasks = async (stageId, stageSequence, stageName, centerCode, taskData) => {
    const taskList = taskData.map((data) => ({
        ...data,
        expectedStartTime: data.expectedStartTime.toISOString(),
        expectedEndTime: data.expectedEndTime.toISOString(),
        actualStartTime: data.actualStartTime.toISOString(),
        actualEndTime: data.actualEndTime.toISOString(),
    }));

    try {
        const response = await axiosInstance.request({
            method: "POST",
            url: `/task?stageId=${stageId}`,
            data: {
                stageId: stageId,
                stageSequence: Number(stageSequence),
                stageName: stageName,
                centerCode: centerCode,
                taskList: taskList,
            },
        });

        if (response.status === 201) {
            return response.data;
        } else {
            return {};
        }
    } catch (error) {
        console.error(error);
    }
};
