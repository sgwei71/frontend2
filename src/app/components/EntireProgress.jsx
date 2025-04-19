import CircularProgress from "./CircularProgress";

const EntireProgress = ({ progress1, progress2, overallStatus }) => {
    return (
        <div className="w-[20%] h-[820px] flex flex-col items-center bg-blue-400 rounded-tl-2xl rounded-tr-2xl border-t-2 border-x-2 border-white
                        max-sm:w-[350px] max-sm:h-[115%]">
            <div className="text-blue-950 text-6xl leading-tight font-gothic-bold mt-8 mb-6 max-sm:text-5xl max-sm:mb-4">
                전체 진척률
            </div>
            <div className="outer-circle flex justify-center items-center bg-white bg-opacity-50 rounded-full w-[90%] aspect-square -mb-[100%] z-10 shadow-all">
                <div className="center-circle flex justify-center items-center bg-white rounded-full w-[95%] aspect-square shadow-all">
                    <div className="inner-circle flex flex-col justify-center items-center bg-white rounded-full w-[95%] aspect-square shadow-inner-all">
                        <CircularProgress
                            value={(progress1 + progress2) / 2 / 100}
                            state={overallStatus}
                        ></CircularProgress>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntireProgress;