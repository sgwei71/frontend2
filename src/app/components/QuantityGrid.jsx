const QuantityGrid = ({ taskQuantity, vehicleQuantity, equipmentQuantity, transportRoute }) => {
    const Tile = ({ name, value, imgSrc, isTransportRoute }) => (
        <div className="w-full bg-blue-common rounded-lg shadow-lg py-4 flex items-center justify-center gap-8 max-sm:gap-4 max-sm:py-2 max-sm:justify-around max-sm:gap-0">
            <div className="text-center">
                <p className="text-white text-2xl font-gothic-bold mb-2 max-sm:text-lg max-sm:mb-1">{name}</p>
                <p className={`text-white font-gothic-bold ${isTransportRoute ? 'text-2xl max-sm:text-lg' : 'text-5xl max-sm:text-4xl'}`}>{value}</p>
            </div>
            <img src={imgSrc} alt="Image" className="mt-2 w-20 h-20 object-cover max-sm:w-14 max-sm:h-14" />
        </div>
    )

    return (
        <div className="w-[37%] flex items-center justify-center text-white max-sm:w-full">

        </div>
    );
};

export default QuantityGrid;