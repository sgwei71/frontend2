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
                {/* 교통상황 */}
                <div className="flex flex-col justify-between bg-blue-common text-white font-gothic-bold shadow-lg rounded-lg w-[45%] h-full">
                    <h2 className="text-center text-2xl text-shadow-md p-4">   </h2>
                    <div className="w-full p-4 bg-[#1e4da7] rounded-b-lg text-xl font-gothic">
                        <div className="flex justify-between items-center border-b border-black py-2">
                            <span>  </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-black py-2">
                            <span>   </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-black py-2">
                            <span>   </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span>     </span>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    );
};

export default TrafficWeather;
