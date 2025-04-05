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
            <div className="flex justify-center items-center w-full h-full px-16 py-8">
                {/* 빈 공간을 유지하기 위한 임시 블럭 */}
                <div className="w-full h-full border border-dashed border-white rounded-lg flex items-center justify-center">
                    {/* 여기에 나중에 다른 내용 넣을 수 있음 */}
                    <span className="text-xl text-white opacity-50">-</span>
                </div>
            </div>
        </div>
    );
};

export default TrafficWeather;
