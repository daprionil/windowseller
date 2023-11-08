const SuccessIcon = () => {
    return (
        <div className="w-20 h-20 aspect-square shadow-[0_1px_15px_#31ff88,0px_1px_10px_rgba(0,0,0,0.2)] mx-auto rounded-full bg-green-500 relative">
            <span className="absolute w-20 h-4 bg-white top-1/2 -translate-y-3/4 translate-x-4 shadow transform -rotate-45 "></span>
            <span className="absolute w-8 h-4 left-0 bg-white bottom-0 rotate-45 translate-x-2 -translate-y-5"></span>
        </div>
    )
}

export default SuccessIcon