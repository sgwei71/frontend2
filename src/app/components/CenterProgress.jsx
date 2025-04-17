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
                {tasks
                    ?.filter((task) => task.centerCode === centerCode)
                    .map((task, i) => (
                        <div
                            className="flex flex-col items-center w-[10%] font-gothic-bold"
                            key={i}
                            onMouseEnter={handleTaskDetail(task.id)}
                            onMouseLeave={handleTaskDetail(null)}
                        >
                            <span className={calcColor(task.progressRate)}>
                               asdfafsd {Math.floor(task.progressRate)}%  afadfadf
                            </span>
                            <div className="w-20 bg-gray-300 h-4 rounded-full mb-4 shadow-inner-all-md max-sm:h-2 max-sm:w-full max-sm:mb-1">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                                    style={{ width: calcWidth(task.progressRate) }}
                                ></div>
                            </div>
                            <span className="w-[115%] text-lg font-gothic text-blue-950 whitespace-normal break-all
                                            text-center overflow-y-hidden text-ellipsis line-clamp-3 max-sm:text-[0.5rem] max-sm:leading-tight">{task.stageName} 이름이 뭘까</span>

                            {/* 말풍선 */}
                            {taskDetailVisible === task.id && (
                                <div
                                    ref={taskDetailRef}
                                    className="absolute transform -translate-y-full p-4 bg-blue-600 font-gothic text-lg rounded-2xl z-20 shadow-all max-sm:w-[90%] max-sm:text-base"
                                    style={width >= 640 ? taskDetailPosition : {left: '50%', transform: 'translate(-50%, -100%)'}}
                                >
                                    <div className="w-96 max-h-96 pr-4 whitespace-normal overflow-y-scroll space-y-2 max-sm:w-full">
                                        {taskDetail.map((data, i) => (
                                            <div
                                                key={i}
                                                className={`break-keep leading-tight ${
                                                    data.isCompleted ? "text-[#4E95D9]" : "text-[#ffff39]"
                                                }`}
                                            >
                                                {data.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CenterProgress;