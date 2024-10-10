const SkeletonCardProject = () => {
    return (
        <article className="h-full p-3 w-full mb-8 relative bg-slate-900 border border-slate-700 rounded-md animate-pulse">
            <div className="h-8 bg-slate-800 mb-2 rounded w-1/3"></div>
            <div className="h-96 w-full bg-slate-800 rounded mb-3"></div>
            <div className="h-4 bg-slate-800 mb-3 rounded w-full"></div>
            <div className="h-4 bg-slate-800 mb-2 rounded w-3/4"></div>
            <div className="flex space-x-2 mt-2">
                <div className="h-6 w-12 bg-slate-800 rounded"></div>
                <div className="h-6 w-16 bg-slate-800 rounded"></div>
                <div className="h-6 w-10 bg-slate-800 rounded"></div>
            </div>
            <div className="mt-3">
                <div className="h-10 bg-slate-800 rounded w-full"></div>
            </div>
        </article>
    );
};

export default SkeletonCardProject;
