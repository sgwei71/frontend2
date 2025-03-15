const Clock = ({ time }) => {
    const year = String(time.getFullYear());
    const month = String(time.getMonth() + 1).padStart(2, "0");
    const day = String(time.getDate()).padStart(2, "0");

    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    
    return (
        <div className="flex">
            <div className="bg-blue-950 text-white text-4xl font-gothic-bold px-2 py-1 rounded shadow-inner-all-sm mr-4 max-sm:text-xl max-sm:px-1 max-sm:py-0 max-sm:mr-2">
                {year}-{month}-{day}
            </div>
            <div className="bg-blue-950 text-white text-4xl font-gothic-bold px-2 py-1 rounded shadow-inner-all-sm max-sm:text-xl max-sm:px-1 max-sm:py-0">
                {hours}
            </div>
            <div className="text-white text-4xl font-gothic-bold p-1 max-sm:text-xl max-sm:py-0">:</div>
            <div className="bg-blue-950 text-white text-4xl font-gothic-bold px-2 py-1 rounded shadow-inner-all-sm max-sm:text-xl max-sm:px-1 max-sm:py-0">
                {minutes}
            </div>
            <div className="text-white text-4xl font-gothic-bold p-1 max-sm:text-xl max-sm:py-0">:</div>
            <div className="bg-blue-950 text-white text-4xl font-gothic-bold px-2 py-1 rounded shadow-inner-all-sm max-sm:text-xl max-sm:px-1 max-sm:py-0">
                {seconds}
            </div>
        </div>
    );
}

export default Clock;