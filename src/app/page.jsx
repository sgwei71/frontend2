"use client";

import { API_URL } from "@/api";
import { getDashboard } from "@/api/dashboard";
import { getIssue } from "@/api/issue";
import { getNotice } from "@/api/notice";
import { getStage, getTasks } from "@/api/stage";
import { getTraffic } from "@/api/traffic";
import { getWeather } from "@/api/weather";
import { formatDate } from "@/utils/dateToString";
import useWindowSize from "@/utils/hooks/useWindowSize";
import useRoundIdStore from "@/utils/store/roundIdStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Clock from "./components/Clock";
import QuantityGrid from "./components/QuantityGrid";
import EntireProgress from "./components/EntireProgress";
import TrafficWeather from "./components/TrafficWeather";
import Notice from "./components/Notice";
import CenterProgress from "./components/CenterProgress";

const socket = io(API_URL); // http://117.52.84.61:8080  http://localhost:8888

export default function Home() {
    const queryClient = useQueryClient();

    const { width } = useWindowSize();

    const [time, setTime] = useState(null);
    const roundId = useRoundIdStore((state) => state.roundId);

    //대시보드 데이터
    const [taskQuantity, setTaskQuantity] = useState(0);
    const [vehicleQuantity, setVehicleQuantity] = useState(0);
    const [equipmentQuantity, setEquipmentQuantity] = useState(0);
    const [transportRoute, setTransportRoute] = useState("고속도로");
    const [overallStatus, setOverallStatus] = useState("정상");
    const [actualStartTime, setActualStartTime] = useState(0);
    const [expectedEndTime, setExpectedEndTime] = useState(0);
    const [trafficInfo, setTrafficInfo] = useState(["실패", "실패", "실패", "정체"]);
    const [weather, setWeather] = useState([]);
    const [taskDetail, setTaskDetail] = useState([]);
    const [taskDetailVisible, setTaskDetailVisible] = useState(null); // id에 맞는 말풍선 표시, null이면 말풍선 표시 안함

    //보여지는 공지사항 index
    const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
    //공지사항  데이터
    const [notices, setNotices] = useState([]);
    //보여지는 이슈사항 index
    const [currentIssueIndex, setCurrentIssueIndex] = useState(0);
    //이슈사항  데이터
    const [issues, setIssues] = useState([]);

    //단계 조회
    const [tasks, setTasks] = useState([]);
    //수지진척률
    const [progress1, setProgress1] = useState(0);
    //하남진척률
    const [progress2, setProgress2] = useState(0);

    const taskDetailRef = useRef(null);
    const [taskDetailPosition, setTaskDetailPosition] = useState({});

    const { isLoading: isDashboardLoading } = useQuery({
        queryKey: ["dashboard", roundId],
        queryFn: async () => {
            const { dataObject } = await getDashboard(roundId);
            setTaskQuantity(dataObject?.taskQuantity || 0);
            setVehicleQuantity(dataObject?.vehicleQuantity || 0);
            setEquipmentQuantity(dataObject?.equipmentQuantity || 0);
            setTransportRoute(dataObject?.transportRoute || "고속도로");
            setOverallStatus(dataObject?.overallStatus || "정상");
            setActualStartTime(formatDate(dataObject?.actualStartTime || "1900-01-01 00:00:00"));
            setExpectedEndTime(formatDate(dataObject?.expectedEndTime || "1900-01-01 00:00:00"));
            setTrafficInfo((prevTraffic) => {
                const newTraffic = [...prevTraffic];
                newTraffic[3] = dataObject?.trafficReport;
                return newTraffic;
            });
            return dataObject;
        },
    });

    const { isLoading: isNoticeLoading } = useQuery({
        queryKey: ["notice", roundId],
        queryFn: async () => {
            const data = await getNotice(roundId);
            const filteredArray = data.length ? data.map((data) => data.noticeContent) : [];
            setNotices(filteredArray.filter((item) => item !== ""));
            return data;
        },
    });

    const { isLoading: isIssueLoading } = useQuery({
        queryKey: ["issue", roundId],
        queryFn: async () => {
            const data = await getIssue(roundId);
            const filteredArray = data.length ? data.map((data) => data.issueContent) : [];
            setIssues(filteredArray.filter((item) => item !== ""));
            return data;
        },
    });

    const { isLoading: isTaskLoading } = useQuery({
        queryKey: ["task", roundId],
        queryFn: async () => {
            const data = await getStage(roundId);
            const filteredTasks1 = data.filter((task) => task.centerCode === "10");
            const totalProgressRate1 = filteredTasks1.reduce((acc, task) => acc + task.progressRate, 0);
            const averageProgressRate1 = filteredTasks1.length > 0 ? totalProgressRate1 / filteredTasks1.length : 0;
            setProgress1(averageProgressRate1);

            const filteredTasks2 = data.filter((task) => task.centerCode === "20");
            const totalProgressRate2 = filteredTasks2.reduce((acc, task) => acc + task.progressRate, 0);
            const averageProgressRate2 = filteredTasks2.length > 0 ? totalProgressRate2 / filteredTasks2.length : 0;
            setProgress2(averageProgressRate2);

            setTasks(data);
            return data;
        },
    });

    const { isLoading: isTrafficLoading } = useQuery({
        queryKey: ["traffic"],
        queryFn: async () => {
            const data = await getTraffic();
            // 상태 업데이트
            setTrafficInfo((prevTraffic) => {
                const newTraffic = [...prevTraffic];
                newTraffic[0] = data ? data.trafficReport1 : newTraffic[0];
                newTraffic[1] = data ? data.trafficReport2 : newTraffic[1];
                newTraffic[2] = data ? data.trafficReport3 : newTraffic[2];
                return newTraffic;
            });

            return data;
        },
        refetchInterval: 600000,
    });

    const { isLoading: isWeatherLoading } = useQuery({
        queryKey: ["weather"],
        queryFn: async () => {
            const data = await getWeather();
            setWeather(data);
            return data;
        },
        refetchInterval: 600000,
    });

    // 시계
    useEffect(() => {
        const updateTime = () => {
            setTime(new Date());
        };

        updateTime();
        const timerId = setInterval(updateTime, 1000);

        return () => clearInterval(timerId);
    }, []);

    // 공지 슬라이드
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
        }, 5000); // 5초마다 슬라이드 전환

        return () => clearInterval(interval);
    }, [notices.length]);

    // 이슈 슬라이드
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIssueIndex((prevIndex) => (prevIndex + 1) % issues.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [issues.length]);

    // 말풍선 표시 on/off
    const handleTaskDetail = (id) => async (e) => {
        if (id === null) {
            setTaskDetail([]);
            setTaskDetailVisible(null);
            return;
        }
        const { taskData } = await getTasks(id);
        setTaskDetail(taskData.map((data) => ({ text: data.taskDescription, isCompleted: data.isCompleted })));
        setTaskDetailVisible(id);
    };

    // 말풍선 화면 끝에 있을 시 잘림 방지
    useEffect(() => {
        if (taskDetailRef.current) {
            if (taskDetailRef.current.getBoundingClientRect().left < 16) {
                setTaskDetailPosition({ left: 16 });
                return;
            }
            if (taskDetailRef.current.getBoundingClientRect().right > window.innerWidth - 16) {
                setTaskDetailPosition({ right: 16 });
                return;
            }
        } else {
            setTaskDetailPosition({});
        }
    }, [taskDetailVisible]);

    // 소켓
    useEffect(() => {
        const socket = io(API_URL); // http://117.52.84.61:8080  http://localhost:8888

        // Socket.io를 통해 데이터 업데이트 수신
        socket.on("dashboardSocket", (data) => {
            console.log("dashboard updated!");
            setTaskQuantity(data.taskQuantity || taskQuantity);
            setVehicleQuantity(data.vehicleQuantity || vehicleQuantity);
            setEquipmentQuantity(data.equipmentQuantity || equipmentQuantity);
            setTransportRoute(data.transportRoute || transportRoute);
            setOverallStatus(data.overallStatus || overallStatus);
            setActualStartTime(formatDate(data?.actualStartTime || actualStartTime));
            setExpectedEndTime(formatDate(data?.expectedEndTime || expectedEndTime));
        });

        socket.on("issueSocket", () => {
            console.log("issues updated!");
            queryClient.invalidateQueries(["issue", roundId]);
        });

        socket.on("noticeSocket", () => {
            console.log("notices updated!");
            queryClient.invalidateQueries(["notice", roundId]);
        });

        socket.on("stageSocket", () => {
            console.log("stages updated!!");
            queryClient.invalidateQueries(["task", roundId]);
        });

        // 컴포넌트 언마운트 시 소켓 리스너 정리
        return () => {
            socket.off("dashboardSocket");
            socket.off("issueSocket");
            socket.off("noticeSocket");
            socket.off("stageSocket");
        };
    }, []);

    // 모든 쿼리가 로딩 중일 때 `null`을 반환
    if (isDashboardLoading || isNoticeLoading || isIssueLoading || isTaskLoading || isTrafficLoading || isWeatherLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="flex flex-col items-center space-y-4">
                    {/* 스피너 */}
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-transparent"></div>
                    {/* 텍스트 */}
                    <p className="text-gray-700 text-lg font-medium">로딩 중입니다...</p>
                </div>
            </div>
        );
    }

    if (!time) return null; // 시간 데이터가 준비될 때까지 로드하지 않음

    return (
        <main className="flex flex-col w-full h-full select-none whitespace-nowrap bg-[#d1d5db]">
            {/* 시간 row */}
            <div className="bg-blue-900 w-full flex justify-between items-center px-16 py-4 max-sm:flex-col max-sm:space-y-2 max-sm:px-4 max-sm:pt-2 max-sm:pb-14">
                {/* 시계 */}
                <Clock time={time} />
                {/* 일시 */}
                <div className="text-white font-gothic text-xl max-sm:w-full max-sm:flex max-sm:flex-col max-sm:items-end max-sm:text-xs">
                    <p>실제 시작일시 {actualStartTime}</p>
                    <p>예상 종료일시 {expectedEndTime}</p>
                </div>
            </div>

            {width >= 640 ? (
                // DESKTOP
                <>
                    {/* 전체 진척률 row */}
                    {/*
                    <div className="bg-blue-950 w-full flex items-end overflow-visible">
                    */}
                    <div className="bg-blue-950 w-full h-[500px] flex items-end overflow-visible">
                        {/* 
                        <QuantityGrid taskQuantity={taskQuantity} vehicleQuantity={vehicleQuantity} equipmentQuantity={equipmentQuantity} transportRoute={transportRoute} />

                        <EntireProgress progress1={progress1} progress2={progress2} overallStatus={overallStatus} />

                        <TrafficWeather trafficInfo={trafficInfo} weather={weather} />
                        
                        */}
                            <QuantityGrid taskQuantity={taskQuantity} vehicleQuantity={vehicleQuantity} equipmentQuantity={equipmentQuantity} transportRoute={transportRoute} />
                            <EntireProgress progress1={progress1} progress2={progress2} overallStatus={overallStatus} />
                            <TrafficWeather trafficInfo={trafficInfo} weather={weather} />
                    </div>

                    {/* 공지/이슈 row */}
                    <div className="flex justify-between px-20 items-center min-h-28 bg-gray-600 shadow-top-down font-gothic">
                        <Notice data={notices} currentIndex={currentNoticeIndex} />
                        <Notice data={issues} currentIndex={currentIssueIndex} />
                    </div>
                </>
            ) : (
                // MOBILE
                <>
                    <div className="bg-blue-950 w-full flex items-end overflow-visible justify-center min-h-72 px-2">
                        <EntireProgress progress1={progress1} progress2={progress2} overallStatus={overallStatus} />
                    </div>
                    <div className="flex bg-gray-600 shadow-top-down font-gothic min-h-48 pt-[5.5rem]">
                        <Notice data={notices} currentIndex={currentNoticeIndex} />
                    </div>
                    <div className="bg-blue-950 w-full flex justify-center items-center">
                        <QuantityGrid taskQuantity={taskQuantity} vehicleQuantity={vehicleQuantity} equipmentQuantity={equipmentQuantity} transportRoute={transportRoute} />
                    </div>
                    <div className="flex bg-gray-600 shadow-top-down font-gothic min-h-28 px-2">
                        <Notice data={issues} currentIndex={currentIssueIndex} />
                    </div>
                </>
            )}

            {/* 하단 진척률 row */}
            <div
                className='flex justify-between px-10 pt-12 pb-24 items-center font-gothic bg-[#e5e7eb] max-sm:px-1 max-sm:pt-0 max-sm:pb-6 max-sm:flex-col max-sm:items-start'
                style={{
                    backgroundImage:
                        width >= 640 ?
                            "linear-gradient(to bottom, #e5e7eb 55%, #d1d5db 45%)" : "none"
                }}
            >
                {/* 수지 진척률 */}
                <CenterProgress
                    width={width}
                    centerCode='10'
                    progress={progress1}
                    tasks={tasks}
                    taskDetail={taskDetail}
                    taskDetailPosition={taskDetailPosition}
                    taskDetailVisible={taskDetailVisible}
                    taskDetailRef={taskDetailRef}
                    handleTaskDetail={handleTaskDetail}
                />
                {/* 하남 진척률 */}
                <CenterProgress
                    width={width}
                    centerCode='20'
                    progress={progress2}
                    tasks={tasks}
                    taskDetail={taskDetail}
                    taskDetailPosition={taskDetailPosition}
                    taskDetailVisible={taskDetailVisible}
                    taskDetailRef={taskDetailRef}
                    handleTaskDetail={handleTaskDetail}
                />
            </div>
        </main>
    );
}
