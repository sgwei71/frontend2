import { getRound } from "@/api/dashboard";
import { decodeToken } from "@/utils/decodeToken";
import {
  accessTokenCookie,
  IS_ADMIN_KEY,
  isAdminCookie,
  roundIdCookie,
} from "@/utils/localStorage";
import useRoundIdStore from "@/utils/store/roundIdStore";
import { FormControl, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
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
    <header className="flex w-full bg-blue-500 text-white items-center p-4">
      {/* 왼쪽: 로고 + 시스템 이름 + 셀렉트 */}
      <div className="flex items-center gap-4 w-[33%] min-w-[300px]">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-6 sm:h-10 pb-1" />
          <h1 className="text-sm sm:text-lg font-bold whitespace-normal break-keep">
            하남데이터센터이전 상황관리 시스템
          </h1>
        </Link>
        <FormControl className="relative z-50">
          <Select
            value={roundId}
            onChange={handleSelectRoundId}
            className="bg-blue-600 w-28 sm:w-40 h-8 sm:h-12"
            sx={{
              fontFamily: "GothicBold",
              color: "white",
              "& .MuiSelect-icon": { color: "white" },
              fontSize: { xs: "0.875rem", sm: "1.6rem" },
            }}
          >
            {roundList.map(({ round }, i) => (
              <MenuItem key={i} value={round}>{`${round}차 이전`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* 가운데: 계정성 시스템 전환 */}
      <div className="flex-1 flex justify-center">
        <span className="text-4xl sm:text-5xl font-semibold text-indigo-700 tracking-tight text-center">
  
        </span>
      </div>

      {/* 오른쪽: 로그인/관리 버튼 */}
      <div className="flex items-center justify-end gap-2 w-[33%] min-w-[300px]">
        {isAdmin === "true" && (
          <div className="flex gap-2">
            <Link href="/admin">
              <button className="bg-blue-700 hover:bg-blue-800 text-white rounded text-sm px-4 py-1">
                대시보드 관리
              </button>
            </Link>
            <Link href="/admin/stage">
              <button className="bg-blue-700 hover:bg-blue-800 text-white rounded text-sm px-4 py-1">
                단계 관리
              </button>
            </Link>
          </div>
        )}
        <span className="text-sm">{payLoad?.aud || "로그인 해주세요."}</span>
        <button
          className="bg-white hover:bg-gray-200 text-black rounded text-sm px-4 py-1"
          onClick={handleAuth}
        >
          {payLoad ? "로그아웃" : "로그인"}
        </button>
      </div>
    </header>
  );
};

export default Header;
