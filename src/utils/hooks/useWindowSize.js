import { useLayoutEffect, useState } from "react";

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useLayoutEffect(() => {
        // 클라이언트 측에서만 실행
        if (typeof window !== "undefined") {
            // 초기 사이즈 설정
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

            // 윈도우 사이즈 업데이트 함수
            function handleResize() {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }

            // 이벤트 리스너 추가
            window.addEventListener("resize", handleResize);

            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return windowSize;
}

export default useWindowSize;
