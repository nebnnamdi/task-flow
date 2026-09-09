const ProjectDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#e8f1ff] px-4 py-6 sm:px-6 lg:px-8 animate-pulse">
      {/* Back link */}
      <div className="mb-6">
        <div className="h-4 w-32 rounded bg-gray-300" />
      </div>

      {/* Project title */}
      <div className="mb-6">
        <div className="h-8 w-56 rounded bg-gray-300" />
      </div>

      {/* Project Summary */}
      <div className="mb-4 rounded-xl bg-white p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Project Type */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-gray-200" />
              <div className="h-5 w-36 rounded bg-gray-300" />
            </div>
          </div>

          {/* Start Date */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-gray-200" />
              <div className="h-5 w-28 rounded bg-gray-300" />
            </div>
          </div>

          {/* End Date */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-gray-200" />
              <div className="h-5 w-28 rounded bg-gray-300" />
            </div>
          </div>

          {/* Created By */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-gray-200" />
              <div className="h-5 w-28 rounded bg-gray-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* Description Card */}
          <div className="rounded-xl bg-white p-6 sm:p-7">
            <div className="mb-6 h-6 w-32 rounded bg-gray-300" />

            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-[95%] rounded bg-gray-200" />
              <div className="h-4 w-[85%] rounded bg-gray-200" />

              <div className="h-4 w-[92%] rounded bg-gray-200" />
              <div className="h-4 w-[88%] rounded bg-gray-200" />

              <div className="h-4 w-[75%] rounded bg-gray-200" />
            </div>
          </div>

          {/* Project Details Card */}
          <div className="rounded-xl bg-white p-6 sm:p-7">
            <div className="mb-6 h-6 w-36 rounded bg-gray-300" />

            <div className="space-y-0">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-2 border-b border-gray-200 py-3 sm:grid-cols-2 sm:gap-4"
                >
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-4 w-36 rounded bg-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* Creator Card */}
          <div className="rounded-xl bg-white p-6 sm:p-7">
            <div className="mb-7 h-6 w-36 rounded bg-gray-300" />

            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="h-20 w-20 shrink-0 rounded-full bg-gray-200" />

              <div className="space-y-3">
                <div className="h-5 w-28 rounded bg-gray-300" />
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="h-3 w-36 rounded bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Members Card */}
          <div className="rounded-xl bg-white p-6 sm:p-7">
            <div className="mb-6 h-6 w-40 rounded bg-gray-300" />

            <div className="divide-y divide-gray-200">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="flex items-center gap-4">
                    {/* Member Avatar */}
                    <div className="h-12 w-12 shrink-0 rounded-full bg-gray-200" />

                    <div className="space-y-2">
                      <div className="h-4 w-28 rounded bg-gray-300" />
                      <div className="h-3 w-36 rounded bg-gray-200" />
                    </div>
                  </div>

                  {/* Member Badge */}
                  <div className="h-8 w-20 shrink-0 rounded-full bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSkeleton;
