// 하단 수지/하남 센터 진척률

// 진척률 텍스트 색상 용도
function calcColor(value) {
    if (value === 0) return "text-2xl max-sm:text-xs text-gray-400";
    if (value < 50) return "text-2xl max-sm:text-xs text-blue-400";
    if (value < 100) return "text-2xl max-sm:text-xs text-blue-700";
    return "text-2xl max-sm:text-xs text-blue-900";
}
// 진척률 그래프 width 용도
function calcWidth(value) {/*
    if (value === 0) return 0;
    if (value === 100) return "100%";
    return 20 + (value - 1) * (80 / 98) + "%";
*/}

const CenterProgress = ({ width, centerCode, progress, tasks, taskDetail, taskDetailPosition, taskDetailVisible, taskDetailRef, handleTaskDetail }) => {
    return (
        <div className={"w-[50%] flex flex-col items-center rounded-lg p-4 max-sm:w-full max-sm:p-2 max-sm:my-1"}>
            <h2 className={`text-blue-900 text-4xl font-gothic-bold mb-4 self-start w-full max-sm:text-xl max-sm:mb-1 ${centerCode === '20' && 'sm:text-right'}`}>
                {/*
                {width >= 640 ? (<>
                    {centerCode === '10' && '수지 진척률 '}
                    <span className="text-blue-600">{Math.floor(progress)}%</span>
                    {centerCode === '20' && ' 하남 진척률'}
                </>) : (<>
                    {centerCode === '10' ? '수지 진척률 ' : '하남 진척률 '}
                    <span className="text-blue-600">{Math.floor(progress)}%</span>
                </>)}
                */}
            </h2>
            <div className="w-full bg-gray-300 h-6 rounded-lg mb-4 shadow-inner-all-md max-sm:h-4 max-sm:mb-2">
                <div
                    className={`h-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-400`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="w-full h-[200px] flex justify-between bg-white shadow-lg px-4 pt-10 box-border rounded-lg gap-4 max-sm:gap-2 max-sm:pt-6 max-sm:pb-2 max-sm:h-auto">
                
            </div>
        </div>
    );
};

export default CenterProgress;