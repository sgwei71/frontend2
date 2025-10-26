"use client";

import { useState, useEffect } from "react";
import { FormControl, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDashboard, updateDashboard } from "@/api/dashboard";
import { getIssue } from "@/api/issue";
import { getNotice } from "@/api/notice";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useRoundIdStore from "@/utils/store/roundIdStore";
// import useIsAdminStore from "@/utils/store/isAdminStore";
import { IS_ADMIN_KEY, isAdminCookie } from "@/utils/localStorage";
import Link from "next/link";

const Card = ({ title, children }) => {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-2xl m-2 mb-8">{title}</h2>
            <div className="flex flex-col space-y-4">{children}</div>
        </div>
    );
};

export default function Admin() {
    const router = useRouter();
    const roundId = useRoundIdStore((state) => state.roundId);
    // const isAdmin = useIsAdminStore((state) => state.isAdmin);

    const [isLoading, setIsLoading] = useState(true);
    const [overallStatus, setOverallStatus] = useState("");
    const [actualStartTime, setActualStartTime] = useState(new Date());
    const [expectedEndTime, setExpectedEndTime] = useState(new Date());
    const [taskQuantity, setTaskQuantity] = useState(0);
    const [vehicleQuantity, setVehicleQuantity] = useState(0);
    const [equipmentQuantity, setEquipmentQuantity] = useState(0);
    const [transportRoute, setTransportRoute] = useState("고속도로");
    const [trafficReport, setTrafficReport] = useState("");

    const [notices, setNotices] = useState(Array(10).fill({ id: 0, sequence: 0, noticeContent: '' }));
    const [issues, setIssues] = useState(Array(10).fill({ id: 0, sequence: 0, issueContent: '' }));

    useQuery({
        queryKey: ["admin", roundId],
        queryFn: async () => {
            const { dataObject } = await getDashboard(roundId);
            // 상태 업데이트
            setOverallStatus(dataObject?.overallStatus || "정상");
            setActualStartTime(new Date(dataObject?.actualStartTime) || new Date());
            setExpectedEndTime(new Date(dataObject?.expectedEndTime) || new Date());
            setTaskQuantity(dataObject?.taskQuantity || 0);
            setVehicleQuantity(dataObject?.vehicleQuantity || 0);
            setEquipmentQuantity(dataObject?.equipmentQuantity || 0);
            setTransportRoute(dataObject?.transportRoute || "고속도로");
            setTrafficReport(dataObject?.trafficReport || "원활");
            return dataObject;
        },
    });

    useQuery({
        queryKey: ["adminNotice", roundId],
        queryFn: async () => {
            const data = await getNotice(roundId);
            // 상태 업데이트
            // const filteredArray = data.length ? data.map((data) => data.noticeContent) : [];
            // setNotices([...filteredArray, ...Array(10 - filteredArray.length).fill('')]); // 10개를 보장
            setNotices(data);
            return data;
        },
    });

    useQuery({
        queryKey: ["adminIssue", roundId],
        queryFn: async () => {
            const data = await getIssue(roundId);
            // 상태 업데이트
            // const filteredArray = data.length ? data.map((data) => data.issueContent) : [];
            // setIssues([...filteredArray, ...Array(10 - filteredArray.length).fill('')]);// 10개를 보장
            setIssues(data);
            return data;
        },
    });

    useEffect(() => {
        const isAdmin = isAdminCookie.get(IS_ADMIN_KEY);
        if (isAdmin === 'false') {
            alert('관리자 권한이 필요합니다.');
            router.push("/");
            return;
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return null;
    }

    const handleNoticesChange = (i) => (e) => {
        if ((e.target.value.match(/\n/g) || []).length === 3) { // 3줄까지만 작성 가능
            return;
        }
        const newNotices = [...notices];
        newNotices[i] = {...newNotices[i], noticeContent: e.target.value};
        setNotices(newNotices);
    };
    const handleIssuesChange = (i) => (e) => {
        if ((e.target.value.match(/\n/g) || []).length === 3) {
            return;
        }
        const newIssues = [...issues];
        newIssues[i] = {...newIssues[i], issueContent: e.target.value};
        setIssues(newIssues);
    };

    const handleSave = async () => {
        const res = await updateDashboard(
            Number(roundId),
            {
                round: Number(roundId),
                overallStatus,
                actualStartTime: actualStartTime.toISOString(),
                expectedEndTime: expectedEndTime.toISOString(),
                taskQuantity: Number(taskQuantity),
                vehicleQuantity: Number(vehicleQuantity),
                equipmentQuantity: Number(equipmentQuantity),
                transportRoute,
                trafficReport
            },
            notices, issues
        )
        alert(res.message);
    };

    return (
        <div className="flex flex-col p-8 whitespace-nowrap max-sm:p-4 max-sm:pb-16">
            <h1 className="text-4xl font-bold mb-8 max-sm:text-3xl max-sm:mb-4">대시보드 관리</h1>
            <div className="flex mb-4 justify-end">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mr-2"
                    onClick={handleSave}
                >
                    저장
                </button>
                <Link href="/" passHref className="flex items-center space-x-2">
                    <button className={`bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2`}>
                        닫기
                    </button>
                </Link>
            </div>

            <div className="flex flex-col space-y-6">
                <Card title="전체 진행">
                    <FormControl>
                        <InputLabel id="overall-status-label" className="font-regular">전체 진행 상태</InputLabel>
                        <Select
                            labelId="overall-status-label"
                            id="overall-status"
                            value={overallStatus}
                            onChange={(e) => setOverallStatus(e.target.value)}
                            label="전체 진행 상태"
                            className="w-64 max-sm:w-full font-regular"
                        >
                            <MenuItem value={'정상'} className="font-regular">정상</MenuItem>
                            <MenuItem value={'경고'} className="font-regular">경고</MenuItem>
                            <MenuItem value={'위험'} className="font-regular">위험</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="flex max-sm:flex-col">
                        <div className="mr-4 max-sm:mr-0 max-sm:mb-4">
                            <Datepicker
                                selected={actualStartTime}
                                showTimeInput
                                timeInputLabel="Time: "
                                dateFormat="yyyy-MM-dd HH:mm"
                                className="w-64 max-sm:w-full"
                                customInput={
                                    <TextField label="실제 시작 시간" variant="outlined" sx={{'& input': {fontFamily: 'Regular'},}} />
                                }
                                onChange={(date) => setActualStartTime(date)}
                            />
                        </div>
                        <div>
                            <Datepicker
                                selected={expectedEndTime}
                                showTimeInput
                                timeInputLabel="Time: "
                                dateFormat="yyyy-MM-dd HH:mm"
                                className="w-64 max-sm:w-full"
                                customInput={
                                    <TextField label="예상 종료 시간" variant="outlined" sx={{'& input': {fontFamily: 'Regular'}, '& .MuiInputLabel-root': { zIndex: '0' }}} />
                                }
                                onChange={(date) => setExpectedEndTime(date)}
                            />
                        </div>
                        
                    </div>
                    <div className="flex space-x-4 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-4">
                        <TextField value={taskQuantity} onChange={(e) => setTaskQuantity(e.target.value)} label="업무 수량" variant="outlined" sx={{'& input': {fontFamily: 'Regular'}, '& .MuiInputLabel-root': { zIndex: '0' }}} className="w-64 max-sm:w-full" type="number" />
                        <TextField value={vehicleQuantity} onChange={(e) => setVehicleQuantity(e.target.value)} label="차량 수량" variant="outlined" sx={{'& input': {fontFamily: 'Regular'}, '& .MuiInputLabel-root': { zIndex: '0' }}} className="w-64 max-sm:w-full" type="number" />
                        <TextField value={equipmentQuantity} onChange={(e) => setEquipmentQuantity(e.target.value)} label="장비 수량" variant="outlined" sx={{'& input': {fontFamily: 'Regular'}, '& .MuiInputLabel-root': { zIndex: '0' }}} className="w-64 max-sm:w-full" type="number" />
                        <TextField value={transportRoute} onChange={(e) => setTransportRoute(e.target.value)} label="운송 경로" variant="outlined" sx={{'& input': {fontFamily: 'Regular'}, '& .MuiInputLabel-root': { zIndex: '0' }}} className="w-64 max-sm:w-full" />
                    </div>
                    <FormControl>
                        <InputLabel id="overall-status-label" sx={{'&': {zIndex: 0}}}>상일IC - 하남센터 교통 정보</InputLabel>
                        <Select
                            labelId="overall-status-label"
                            id="overall-status"
                            value={trafficReport}
                            onChange={(e) => setTrafficReport(e.target.value)}
                            label="상일IC - 하남센터 교통 정보"
                            className="w-64 max-sm:w-full font-regular"
                        >
                            <MenuItem value={'원활'} className="font-regular">원활</MenuItem>
                            <MenuItem value={'서행'} className="font-regular">서행</MenuItem>
                            <MenuItem value={'정체'} className="font-regular">정체</MenuItem>
                        </Select>
                    </FormControl>
                </Card>
                <Card title="왼쪽 공지">
                    {notices?.map((notice, i) => (
                        <TextField
                            key={i}
                            value={notice.noticeContent}
                            onChange={handleNoticesChange(i)}
                            label={`왼쪽 공지 ${i + 1}`}
                            variant="outlined"
                            multiline
                            maxRows={3}
                            sx={{'& input': {fontFamily: 'Regular'}, '& .MuiInputLabel-root': { zIndex: 0 }}}
                            className="w-full" />
                    ))}
                        
                </Card>
                <Card title="오른쪽 공지">
                    {issues?.map((issue, i) => (
                        <TextField
                            key={i}
                            value={issue.issueContent}
                            onChange={handleIssuesChange(i)}
                            label={`오른쪽 공지 ${i + 1}`}
                            variant="outlined"
                            multiline
                            maxRows={3}
                            sx={{'& input': {fontFamily: 'Regular'}, '& .MuiInputLabel-root': { zIndex: 0 }}}
                            className="w-full" />
                    ))}
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
            </div>
        </div>
    );
}
