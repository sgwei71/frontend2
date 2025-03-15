"use client";

import { updateTasks } from "@/api/stage";
import { useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, Select, MenuItem } from "@mui/material";

const Modal = ({ titleData, setTitleData, taskData, setTaskData, onClose, checkedItems, setCheckedItems }) => {
    const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태
    const [selectIsCompletedAll, setSelectIsCompletedAll] = useState(false); // "완료 상태" 전체 선택 상태

    const isAnyChecked = checkedItems.includes(true);
    const checkedIsCompleted = taskData ? taskData.map((item) => item.isCompleted) : false;

    if (!taskData) return null;

    const handleCheckboxChange = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
        setSelectAll(updatedCheckedItems.every((item) => item)); // 전체 선택 상태 업데이트
    };

    const handleSelectAll = () => {
        const newCheckedState = !selectAll;
        setCheckedItems(Array(taskData.length).fill(newCheckedState));
        setSelectAll(newCheckedState);
    };

    const handleSelectIsCompletedAll = () => {
        const newCheckedState = !selectIsCompletedAll;
        setTaskData((prevItems) =>
            prevItems.map((item) => ({
                ...item,
                isCompleted: newCheckedState,
            })),
        );
        setSelectIsCompletedAll(newCheckedState);
    };

    const handleAdd = () => {
        setTaskData([
            ...taskData,
            {
                id: null,
                sequence: "",
                taskDescription: "",
                weight: "",
                isCompleted: false,
                expectedStartTime: new Date(),
                expectedEndTime: new Date(),
                actualStartTime: new Date(),
                actualEndTime: new Date(),
            },
        ]);
        setCheckedItems([...checkedItems, false]);
    };

    const handleDelete = () => {
        const updatedItems = taskData.filter((_, index) => !checkedItems[index]);
        setTaskData(updatedItems);
        setCheckedItems(Array(updatedItems.length).fill(false)); // 체크 상태 초기화
        setSelectAll(false); // 전체 선택 상태 초기화
    };

    const handleSave = async () => {
        if (titleData.stageSequence === "" || titleData.stageName === "") {
            alert("비어있는 칸이 있습니다.");
            return;
        }
        if (
            taskData.some(
                (task) =>
                    task.sequence === "" ||
                    task.taskDescription === "" ||
                    task.weight === "" ||
                    task.expectedStartTime === "" ||
                    task.expectedEndTime === "" ||
                    task.actualStartTime === "" ||
                    task.actualEndTime === "",
            )
        ) {
            alert("비어있는 칸이 있습니다.");
            return;
        }

        try {
            const data = await updateTasks(titleData.stageId, titleData.stageSequence, titleData.stageName, titleData.centerCode, taskData);
            alert('저장되었습니다.');
        } catch {
            alert("저장 중 오류가 발생했습니다.");
        }
        // onClose();
        // setTitleData({ num: "", task: "", centerCode: "10" });
        // setTaskData([]);
        // setCheckedItems([]);
        // setSelectIsCompletedAll(false);
    };

    const handleClose = () => {
        setTitleData({ num: "", task: "", centerCode: "10" });
        setTaskData([]);
        setCheckedItems([]);
        setSelectIsCompletedAll(false);
        onClose();
    };

    const handleTitleInputChange = (key, value) => {
        setTitleData({ ...titleData, [key]: value });
    };

    const handleInputChange = (index, field, value) => {
        const updatedItems = [...taskData];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setTaskData(updatedItems);
    };

    return (
        <>
            {/* 연번 및 단계명 */}
            <div className="flex mb-4 max-sm:max-h-8 h-16">
                <FormControl>
                    <Select
                        value={titleData?.centerCode || '10'}
                        onChange={(e) => handleTitleInputChange("centerCode", e.target.value)}
                        inputProps={{ 'aria-label': 'Without label' }}
                        className="max-w-24 h-16 text-2xl text-center font-bold border-r-2 border-gray-500 rounded-none max-sm:text-lg max-sm:max-h-8 max-sm:max-w-none max-sm:min-w-24"
                        sx={{
                            fontFamily: 'Bold',
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                                borderRadius: '0'
                            },
                            '& .MuiSelect-icon': { // 드롭다운 아이콘 색상
                                color: 'black',
                            },
                        }}
                    >
                        <MenuItem value={'10'}>수지</MenuItem>
                        <MenuItem value={'20'}>하남</MenuItem>
                    </Select>
                </FormControl>
                <div className='h-full max-sm:overflow-x-hidden max-sm:ml-20'>
                    <input
                        type="text"
                        className="max-w-24 text-2xl text-center font-bold border-r-2 border-gray-500 max-sm:text-lg max-sm:w-12 h-full"
                        value={titleData?.stageSequence || ""}
                        onChange={(e) => handleTitleInputChange("stageSequence", e.target.value)}
                    />
                    <input
                        type="text"
                        className="text-2xl pl-8 font-bold max-sm:text-lg max-sm:overflow-x-hidden max-sm:pl-4"
                        value={titleData?.stageName || ""}
                        onChange={(e) => handleTitleInputChange("stageName", e.target.value)}
                    />
                </div>
            </div>
            <div className="flex mb-4 justify-between">
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
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mr-2"
                        onClick={handleSave}
                    >
                        저장
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 mr-2"
                        onClick={handleClose}
                    >
                        닫기
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto max-h-[700px] pb-2">
                <table className="w-full min-w-[1200px] border-t border-gray-300">
                    <thead>
                        <tr className="bg-blue-100 font-bold text-base">
                            <th className="p-2 border-r border-white w-4">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="p-2 border-r border-white w-16">연번</th>
                            <th className="p-2 border-r border-white min-w-[300px]">설명</th>
                            <th className="p-2 border-r border-white w-20">가중치</th>
                            <th className="p-2 border-r border-white w-24">
                                <div>완료 상태</div>
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 mt-1"
                                    checked={selectIsCompletedAll}
                                    onChange={handleSelectIsCompletedAll}
                                />
                            </th>
                            <th className="p-2 border-r border-white w-48">예상 시작시간</th>
                            <th className="p-2 border-r border-white w-48">예상 종료시간</th>
                            <th className="p-2 border-r border-white w-60">실제 시작시간</th>
                            <th className="p-2 border-r border-white w-60">실제 종료시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskData.map((task, i) => (
                            <tr key={i} className="bg-blue-50 text-base">
                                {/* 체크박스 */}
                                <td className="p-2 border border-white">
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5"
                                        checked={checkedItems[i]}
                                        onChange={() => handleCheckboxChange(i)}
                                    />
                                </td>
                                {/* 연번 */}
                                <td className="p-2 border border-white">
                                    <input
                                        type="text"
                                        className="w-full bg-blue-50 text-center"
                                        value={task.sequence}
                                        onChange={(e) => handleInputChange(i, "sequence", e.target.value)}
                                    />
                                </td>
                                {/* 설명 */}
                                <td className="p-2 border border-white">
                                    <input
                                        type="text"
                                        className="w-full bg-blue-50"
                                        value={task.taskDescription}
                                        onChange={(e) => handleInputChange(i, "taskDescription", e.target.value)}
                                    />
                                </td>
                                {/* 가중치 */}
                                <td className="p-2 border border-white">
                                    <input
                                        type="text"
                                        className="w-full bg-blue-50 text-center"
                                        value={task.weight}
                                        onChange={(e) => handleInputChange(i, "weight", e.target.value)}
                                    />
                                </td>
                                {/* 완료 상태 */}
                                <td className="p-2 border border-white text-center">
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5"
                                        checked={task.isCompleted}
                                        onChange={() => {
                                            handleInputChange(i, "isCompleted", !task.isCompleted);
                                            setSelectIsCompletedAll(
                                                checkedIsCompleted.every((item, index) => (index === i ? !item : item)),
                                            ); // 전체 선택 상태 업데이트
                                        }}
                                    />
                                </td>
                                {/* 예상 시작시간 */}
                                <td className="p-2 border border-white text-center">
                                    <Datepicker
                                        selected={task.expectedStartTime}
                                        showTimeInput
                                        timeInputLabel="Time: "
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        className="bg-blue-50 text-center"
                                        onChange={(date) => handleInputChange(i, "expectedStartTime", date)}
                                    />
                                </td>
                                {/* 예상 종료시간 */}
                                <td className="p-2 border border-white text-center">
                                    <Datepicker
                                        selected={task.expectedEndTime}
                                        showTimeInput
                                        timeInputLabel="Time: "
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        className="bg-blue-50 text-center"
                                        onChange={(date) => handleInputChange(i, "expectedEndTime", date)}
                                    />
                                </td>
                                {/* 실제 시작시간 */}
                                <td className="p-2 border border-white">
                                    <div className="flex justify-center">
                                        <Datepicker
                                            selected={task.actualStartTime}
                                            showTimeInput
                                            timeInputLabel="Time: "
                                            dateFormat="yyyy-MM-dd HH:mm"
                                            className="bg-blue-50 text-center"
                                            onChange={(date) => handleInputChange(i, "actualStartTime", date)}
                                        />
                                        <button
                                            className="text-xs bg-blue-300 hover:bg-blue-400 text-white rounded px-1 ml-2 min-w-16"
                                            onClick={() => handleInputChange(i, "actualStartTime", new Date())}
                                        >
                                            현재 시간
                                        </button>
                                    </div>
                                </td>
                                {/* 실제 종료시간 */}
                                <td className="p-2 border border-white">
                                    <div className="flex justify-center">
                                        <Datepicker
                                            selected={task.actualEndTime}
                                            showTimeInput
                                            timeInputLabel="Time: "
                                            dateFormat="yyyy-MM-dd HH:mm"
                                            className="bg-blue-50 text-center"
                                            onChange={(date) => handleInputChange(i, "actualEndTime", date)}
                                        />
                                        <button
                                            className="text-xs bg-blue-300 hover:bg-blue-400 text-white rounded px-1 ml-2 min-w-16"
                                            onClick={() => handleInputChange(i, "actualEndTime", new Date())}
                                        >
                                            현재 시간
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Modal;
