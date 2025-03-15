const Notice = ({ data, currentIndex }) => {
    return (
        <div
            className={'h-full relative w-[37%] text-white text-3xl overflow-hidden max-sm:text-2xl max-sm:w-full max-sm:flex max-sm:h-auto'}
        >
            <div
                className="absolute transition-transform h-full duration-500 max-sm:w-full"
                style={{ transform: `translateY(-${currentIndex * 100}%)` }}
            >
                {data.map((text, index) => (
                    <div key={index} className="h-full flex items-center max-sm:flex max-sm:w-full">
                        <p
                            className="line-clamp-3 text-ellipsis overflow-hidden whitespace-normal max-sm:w-full max-sm:text-center"
                            dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br />") }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notice;