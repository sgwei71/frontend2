import { changePwd } from "@/api/auth";
import { useState } from "react";

export default function PwdChange({ userId, password, handleClose }) {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleChange = async () => {
        if (password1 !== password2) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        const res = await changePwd(userId, password, password1);
        alert(res?.message);

        if (res.isSuccess) {
            handleClose();
        }
    };

    return (
        <div className="flex flex-col space-y-4 p-4">
            <h2 className="text-2xl font-semibold text-center mb-4 text-black">비밀번호 변경</h2>

            {/* 비밀번호 입력 필드 */}
            <input
                type="password"
                placeholder="새 비밀번호"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                className="w-full p-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* 새 비밀번호 입력 필드 */}
            <input
                type="password"
                placeholder="새 비밀번호 확인"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full p-2 mb-6 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex pt-4 space-x-4 justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2" onClick={handleChange}>
                    변경
                </button>
                <button className="bg-blue-300 hover:bg-blue-400 text-white rounded px-4 py-2" onClick={handleClose}>
                    닫기
                </button>
            </div>
        </div>
    );
}
