"use client";

import { axiosInstance } from "@/api";
import { signin } from "@/api/auth";
import { useModal } from "@/utils/hooks/useModal";
import { accessTokenCookie, isAdminCookie } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../components/ModalContainer";
import PwdChange from "./PwdChange";
import useIsAdminStore from "@/utils/store/isAdminStore";

export default function Login() {
    const router = useRouter();

    const [userId, setUserId] = useState("");
    const { open, handleOpen, handleClose } = useModal();
    const [password, setPassword] = useState("");
    const setIsAdmin = useIsAdminStore((state) => state.setIsAdmin);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (userId && password) {
            const res = await signin(userId, password);

            if (res.isSuccess) {
                //토큰 api header에 넣기
                const { isAdmin, accessToken } = res.dataObject;
                accessTokenCookie.set(accessToken);
                isAdminCookie.set(isAdmin);
                axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
                router.push("/");
            } else {
                alert(res?.message.replace('error: ', ''));
            }
        } else {
            alert("아이디와 비밀번호를 입력해주세요.");
        }
    };

    const handlePasswordChange = async () => {
        if (userId && password) {
            const res = await signin(userId, password);

            if (res.isSuccess) {
                handleOpen();
            } else {
                alert("유효하지 않은 계정입니다.");
            }
        } else {
            alert("아이디와 비밀번호 입력 후 변경을 진행해주세요.");
        }
    };

    return (
        <div className="w-screen">
            <div className="flex justify-center items-center h-screen bg-blue-500 overflow-x-auto">
                <form className="bg-white shadow-md rounded-lg p-8 w-96 max-sm:w-[90%]">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-black">IBK 하남 데이터센터 이전</h2>
                    {/* 아이디 입력 필드 */}
                    <input
                        type="text"
                        placeholder="아이디"
                        required
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full p-2 mb-4 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* 비밀번호 입력 필드 */}
                    <input
                        type="password"
                        placeholder="비밀번호"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-6 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* 로그인 버튼 */}
                    <button
                        type="submit"
                        onClick={handleLogin}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        로그인
                    </button>

                    {/* 비밀번호 변경 버튼 */}
                    {/* <button
                        onClick={handlePasswordChange}
                        className="w-full mt-4 bg-gray-300 text-black py-2 rounded hover:bg-gray-400 transition-colors"
                    >
                        비밀번호 변경
                    </button> */}
                </form>
            </div>

            <Modal visible={open} width="w-80">
                <PwdChange handleClose={handleClose} userId={userId} password={password} />
            </Modal>
        </div>
    );
}
