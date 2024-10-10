const SkeletonKnowledge = () => {
    return (
        <div className="mt-4 animate-pulse">
            <div className="h-8 bg-gray-600 rounded w-1/4 mb-4"></div>
            <div className="flex flex-wrap gap-5">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex flex-col justify-between items-center p-3 rounded border border-gray-600">
                        <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                        <div className="h-4 bg-gray-600 rounded w-16 mt-2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SkeletonKnowledge