const Skeleton = () => {
    return (
        <div className="bg-slate-900 pt-28 mx-4 relative border border-slate-700 rounded-md overflow-hidden animate-pulse">
            <div className="relative">
                <div className="w-full h-40 bg-gray-700"></div>
                <div className="absolute -bottom-8 left-6 w-20 h-20 bg-gray-600 rounded-full border-4 border-white"></div>
            </div>
            <div className="p-6 mt-5">
                <div className="mt-5 md:mt-0 md:flex items-center justify-between w-full">
                    <div className="h-8 bg-gray-600 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-600 rounded w-20"></div>
                </div>
                <div className="h-6 bg-gray-600 rounded mt-2 w-3/4"></div>
                <div className='md:flex items-center gap-10 my-5'>
                    <div className="h-6 bg-gray-600 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-600 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-600 rounded w-1/4"></div>
                </div>
                <div className="mt-4 space-y-2">
                    <div className="h-6 bg-gray-600 rounded w-full"></div>
                    <div className="h-6 bg-gray-600 rounded w-5/6"></div>
                    <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;