const ProjectLoadingSkeleton = () => {
  return (
    <div className="w-full max-w-5xl bg-white space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 space-y-2">
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-100 rounded-xl border border-gray-200/50 animate-pulse"></div>
        </div>

        <div className="md:col-span-4 space-y-2">
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-100 rounded-xl border border-gray-200/50 animate-pulse"></div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-100 rounded-xl border border-gray-200/50 animate-pulse"></div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-100 rounded-xl border border-gray-200/50 animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 w-full bg-gray-100 rounded-xl border border-gray-200/50 animate-pulse"></div>
      </div>

      <div className="space-y-3">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>

          <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLoadingSkeleton;
