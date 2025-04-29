const CircularProgress = ({ value, state }) => {
    const radius = 41; // 원의 반지름
    const circumference = 2 * Math.PI * radius; // 원의 둘레
    const offset = circumference - value * circumference; // 현재 값에 따른 오프셋
    // [연한색, 진한색, 중앙 텍스트색]
    const colors = {
        "정상": ['#85e2ff', '#1d4ed8', 'text-[#108ff3]'],
        "경고": ['#fff18e', '#f59203', 'text-[#ffd847]'],
        "위험": ['#feaaaa', '#fe0000', 'text-[#f72727]']
    }

    return (
        <div className="relative flex items-center justify-center w-full">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={`url(#gradient)`}
                    strokeWidth="12" // 테두리 두께
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                    strokeLinecap="round" // 모서리 둥글게
                    transform="rotate(-90 50 50)" // 기준점 변경
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: colors[state][1], stopOpacity: 1 }} /> {/* dark */}
                        <stop offset="100%" style={{ stopColor: colors[state][0], stopOpacity: 1 }} /> {/* light */}
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute flex flex-col justify-center items-center pt-2">
                <div className={`text-[5.5rem] font-gothic-bold text-shadow-md leading-none max-sm:text-[4.5rem] ${colors[state][2]}`}>
                    {Math.floor(value * 100)}<span className="text-5xl max-sm:text-4xl">%</span>
                </div>
                <div className="text-[4rem] text-gray-600 font-gothic-bold leading-none max-sm:text-[3.8rem]">{state}</div>
            </div>
        </div>
    );
};

export default CircularProgress;
