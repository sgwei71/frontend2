"use client";

import { deleteStage, getStage, getTasks, updateStage } from "@/api/stage";
import Modal from "@/app/components/ModalContainer";
import { useModal } from "@/utils/hooks/useModal";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useRoundIdStore from "@/utils/store/roundIdStore";
// import useIsAdminStore from "@/utils/store/isAdminStore";
import { IS_ADMIN_KEY, isAdminCookie } from "@/utils/localStorage";
import Task from "./Modal";
import Link from "next/link";

export default function Stage() {
    const router = useRouter();
    const roundId = useRoundIdStore((state) => state.roundId);
    // const isAdmin = useIsAdminStore((state) => state.isAdmin);

    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태

    const [titleData, setTitleData] = useState(null); // Modal title 데이터
    const [taskData, setTaskData] = useState(null); // Modal task 데이터
    const [modalCheckedItems, setModalCheckedItems] = useState([]); // Modal 체크 상태 배열

    const { open, handleOpen, handleClose } = useModal(); //modal 컴포넌트 open/close 상태

    useQuery({
        queryKey: ["stage", roundId],
        queryFn: async () => {
            const data = await getStage(roundId);
            setItems(data);
            setCheckedItems(Array(data.length).fill(false));
            setSelectAll(false);
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

    const handleCheckboxChange = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
        setSelectAll(updatedCheckedItems.every((item) => item)); // 전체 선택 상태 업데이트
    };

    const handleSelectAll = () => {
        const newCheckedState = !selectAll;
        setCheckedItems(Array(items.length).fill(newCheckedState));
        setSelectAll(newCheckedState);
    };

    const handleAdd = async () => {
        const data = await updateStage(roundId);
        setItems(data);
        setCheckedItems([...checkedItems, false]);
        setSelectAll(false);
    };

    const handleDelete = async () => {
        if (window.confirm("삭제하시겠습니까?")) {
            const selectedItems = items.filter((_, index) => checkedItems[index]).map((item) => item.id);
            const data = await deleteStage(roundId, selectedItems);
            setItems(data);
            setCheckedItems(Array(data.length).fill(false));
            setSelectAll(false);
        }
    };

    const handleClick = async (stageId) => {
        const data = await getTasks(stageId);
        setTitleData(data.titleData);
        setModalCheckedItems(Array(data.taskData.length).fill(false));
        setTaskData(data.taskData);
        handleOpen(); // 팝업 열기
    };

    const handleModalClose = async () => {
        const data = await getStage(roundId);
        setItems(data);
        setCheckedItems(Array(data.length).fill(false));
        setSelectAll(false);
        setTaskData(null);
        handleClose();
    };

    const isAnyChecked = checkedItems.includes(true);

    return (
        <div className="flex flex-col items-start p-8 whitespace-nowrap max-sm:p-4 max-sm:pb-16">
            <h1 className="text-4xl font-bold mb-8 max-sm:text-3xl max-sm:mb-4">단계 관리</h1>
            <div className="max-w-1280 w-full bg-gray-200 p-4 max-sm:p-2 max-sm:pt-4">
                <div className="flex w-full items-center justify-between mb-4 pl-4 max-sm:pl-2">
                    <div className="flex space-x-4 items-center">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            className="mr-2 h-5 w-5 accent-blue-500"
                        />
                        <div>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mr-2"
                                onClick={handleAdd}
                            >
                                추가
                            </button>
                            <button
                                className={`rounded px-4 py-2 ${
                                    isAnyChecked
                                        ? "bg-red-500 hover:bg-red-600 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                                onClick={isAnyChecked ? handleDelete : null}
                                disabled={!isAnyChecked}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                    <Link href="/">
                        <button className={`bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2`}>
                            닫기
                        </button>
                    </Link>
                </div>
                <ul className="space-y-2">
                    {items?.map((stage, i) => (
                        <li key={i} className="flex items-center bg-white rounded shadow pl-4 max-sm:pl-2 max-sm:py-1">
                            <input
                                type="checkbox"
                                checked={checkedItems[i]}
                                onChange={() => handleCheckboxChange(i)}
                                className="mr-4 h-5 w-5 accent-blue-500 max-sm:mr-0"
                            />
                            <div
                                className="flex items-center cursor-pointer w-full p-4 space-x-8 max-sm:space-x-2 max-sm:p-2"
                                onClick={() => handleClick(stage.id)}
                            >
                                <span className="text-lg pr-8 border-r border-gray-400 max-sm:text-sm max-sm:pr-2">{stage.centerCode === '10' ? '수지' : '하남'}</span>
                                <span className="text-lg pr-8 border-r border-gray-400 max-sm:text-sm max-sm:pr-2">{stage.sequence}</span>
                                <span className="text-black font-bold text-lg max-sm:text-sm max-sm:max-w-[33%] max-sm:overflow-x-hidden max-sm:text-ellipsis">{stage.stageName}</span>
                                <span className="text-gray-700 max-sm:text-xs">
                                    작업: {stage.taskCount}, 진척률: {Math.floor(stage.progressRate)}%
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Modal visible={open}>
                <Task
                    titleData={titleData}
                    setTitleData={setTitleData}
                    taskData={taskData}
                    setTaskData={setTaskData}
                    onClose={handleModalClose}
                    checkedItems={modalCheckedItems}
                    setCheckedItems={setModalCheckedItems}
                />
            </Modal>
        </div>
    );
}
