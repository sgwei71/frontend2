const trafficColor = { 원활: "bg-green-400", 서행: "bg-yellow-300", 정체: "bg-red-500", 실패: "bg-gray-700" };

const status2Img = {
    '맑음': "bg-[url('/sun.png')]",
    '구름많음': "bg-[url('/suncloud.png')]",
    '흐림': "bg-[url('/cloud.png')]",
    '비': "bg-[url('/rain.png')]",
    '비/눈': "bg-[url('/snow.png')]",
    '눈': "bg-[url('/snow.png')]",
}

const TrafficWeather = ({ trafficInfo, weather }) => {
    return (
         <div className="w-[37%] h-full flex items-center justify-center text-white">
            <div className="flex justify-center items-center w-full h-full space-x-6 px-16 py-8">
                {/* 교통상황 및 날씨 제거됨 */}
            </div>
        </div>
    );
};

export default TrafficWeather;
