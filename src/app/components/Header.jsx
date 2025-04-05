import { getRound } from "@/api/dashboard";
import { decodeToken } from "@/utils/decodeToken";
import { accessTokenCookie, IS_ADMIN_KEY, isAdminCookie, roundIdCookie } from "@/utils/localStorage";
import useRoundIdStore from "@/utils/store/roundIdStore";
import { FormControl, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import useIsAdminStore from "@/utils/store/isAdminStore";

const Header = () => {
    // const isAdmin = useIsAdminStore((state) => state.isAdmin);
    const router = useRouter();

    const [payLoad, setPayLoad] = useState(null);
    const roundId = useRoundIdStore((state) => state.roundId);
    const setRoundId = useRoundIdStore((state) => state.setRoundId);
    const [isAdmin, setIsAdmin] = useState(false);
    const [roundList, setRoundList] = useState([{ round: 1, default: true }]);

    const handleAuth = () => {
        if (payLoad) {
            if (confirm("로그아웃 하시겠습니까?")) {
                setPayLoad(null);
                accessTokenCookie.remove();
                router.push("/login");
            }
        } else {
            router.push("/login");
        }
    };

    const handleSelectRoundId = (e) => {
        const { value } = e.target;
        setRoundId(value);
    };

    const getRoundList = async () => {
        const res = await getRound();
        const { round } = res.find((item) => item["default"] === true);
        setRoundList(res);
        setRoundId(round);
        roundIdCookie.set(round);
    };

    useEffect(() => {
        const token = accessTokenCookie.get();
        setPayLoad(decodeToken(token));
        setIsAdmin(isAdminCookie.get(IS_ADMIN_KEY));
    }, [setRoundId]);

    useEffect(() => {
        getRoundList();
    }, []);

    return (
        <header
            className="flex w-full bg-blue-500 text-white items-center select-none whitespace-nowrap
                flex-col p-2 space-y-2 sm:flex-row sm:p-4 sm:space-y-0 sm:justify-between"
        >
            {/* 좌측 */}
            <div className="flex items-center space-x-4 w-full sm:w-auto sm:space-x-8">
                <Link href="/" passHref className="flex items-center space-x-2">
                    <img src="/logo.png" alt="Logo" className="h-6 sm:h-10 pb-1" /> {/* 로고 이미지 */}
                    <h1 className="text-sm sm:text-xl font-bold">이전 프로젝트 관리시스템</h1>
                </Link>
                <FormControl>
                    <Select
                        value={roundId}
                        onChange={handleSelectRoundId}
                        inputProps={{ "aria-label": "Without label" }}
                        className="bg-blue-600 w-28 h-8 sm:w-40 sm:h-12"
                        sx={{
                            fontFamily: "GothicBold",
                            color: "white", // 폰트 색상 설정
                            "& .MuiSelect-icon": {
                                // 드롭다운 아이콘 색상
                                color: "white",
                            },
                            fontSize: { xs: "0.875rem", sm: "1.6rem" },
                        }}
                    >
                        {roundList.map(({ round }, i) => (
                            <MenuItem key={i} value={round}>
                                {`${round}차 이전`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            {/* 가운데 */}
            <div className="hidden sm:flex justify-center flex-1">
                <span className="text-lg font-semibold">계정성 업무 전환</span>
            </div>
            {/* 우측 */}
            <div className="flex items-center  justify-start max-sm:justify-end space-x-4 max-sm:space-x-2 max-sm:w-full">
                {isAdmin === "true" && (
                    <div className="flex sm:space-x-2">
                        <Link href="/admin" passHref>
                            <button className="bg-blue-700 hover:bg-blue-800 text-white rounded max-sm:text-sm px-4 max-sm:px-2 py-1 mr-2">
                                대시보드 관리
                            </button>
                        </Link>
                        <Link href="/admin/stage" passHref>
                            <button className="bg-blue-700 hover:bg-blue-800 text-white rounded max-sm:text-sm px-4 max-sm:px-2 py-1 mr-2">
                                단계 관리
                            </button>
                        </Link>
                    </div>
                )}
                <span className="max-sm:text-sm mr-2">{payLoad?.aud || "로그인 해주세요."}</span>
                <button
                    className="bg-white hover:bg-gray-200 text-black rounded px-4 py-1 sm:mr-2 max-sm:text-sm max-sm:px-2"
                    onClick={handleAuth}
                >
                    {payLoad ? "로그아웃" : "로그인"}
                </button>
            </div>
        </header>
    );
};

export default Header;
