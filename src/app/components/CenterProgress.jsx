// 하단 수지/하남 센터 진척률

// 진척률 텍스트 색상 용도
function calcColor(value) {
    if (value === 0) return "text-2xl max-sm:text-xs text-gray-400";
    if (value < 50) return "text-2xl max-sm:text-xs text-blue-400";
    if (value < 100) return "text-2xl max-sm:text-xs text-blue-700";
    return "text-2xl max-sm:text-xs text-blue-900";
}
// 진척률 그래프 width 용도
function calcWidth(value) {
    if (value === 0) return 0;
    if (value === 100) return "100%";
    return 20 + (value - 1) * (80 / 98) + "%";
}

const CenterProgress = ({ width, centerCode, progress, tasks, taskDetail, taskDetailPosition, taskDetailVisible, taskDetailRef, handleTaskDetail }) => {
    return (
        <div className={"w-[30%] flex flex-col flex-grow h-full items-center rounded-lg p-4 max-sm:w-full max-sm:p-2 max-sm:my-1"}>
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
            <div className="w-full flex flex-col min-h-[750px] max-sm:min-h-[500px] justify-start bg-white shadow-lg px-4 pt-4 box-border rounded-lg gap-4 max-sm:gap-2 max-sm:pt-4 max-sm:pb-2">
            {tasks
  ?.filter((task) => task.centerCode === centerCode)
  .map((task, i) => (
    <div
      key={i}
      className="relative flex flex-row items-center h-[40px] gap-4 font-gothic-bold"
      onMouseEnter={handleTaskDetail(task.id)}
      onMouseLeave={handleTaskDetail(null)}
    >
      <span className="w-[35%] max-sm:w-[40%] truncate text-2xl text-black font-bold max-sm:test-base">{task.stageName}</span>

      <div className="w-[45%] max-sm:w-[40%] bg-gray-300 h-7 my-auto rounded-full shadow-inner-all-md max-sm:w-full">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
          style={{ width: calcWidth(task.progressRate) }}
        ></div>
      </div>

      <span className={calcColor(task.progressRate)}>{Math.floor(task.progressRate)}%</span>

      {/* 말풍선 */}
      {taskDetailVisible === task.id && (
        <div
          ref={taskDetailRef}
          className="absolute transform -translate-y-full p-4 bg-blue-600 font-gothic text-lg rounded-2xl z-20 shadow-all max-sm:w-[90%] max-sm:text-base"
          style={
            width >= 640
              ? taskDetailPosition
              : { left: '50%', transform: 'translate(-50%, -100%)' }
          }
        >
          <div className="w-96 max-h-96 pr-4 whitespace-normal overflow-y-scroll space-y-2 max-sm:w-full">
            {taskDetail.map((data, i) => (
              <div
                key={i}
                className={`break-keep leading-tight ${
                  data.isCompleted ? 'text-[#4E95D9]' : 'text-[#ffff39]'
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