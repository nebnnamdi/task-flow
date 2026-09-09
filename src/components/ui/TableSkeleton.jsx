const TableSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="w-full bg-white px-5 py-3">
      <div className="w-full animate-pulse">
        {/* Table Header */}
        <div className="grid grid-cols-5 items-center bg-gray-50 border-b border-gray-200 px-5 py-5">
          <div className="h-5 w-16 rounded bg-gray-200" />
          <div className="h-5 w-16 rounded bg-gray-200" />
          <div className="h-5 w-28 rounded bg-gray-200" />
          <div className="h-5 w-24 rounded bg-gray-200" />
          <div className="h-5 w-16 rounded bg-gray-200" />
        </div>

        {/* Table Rows */}
        {skeletonRows.map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center border-b border-gray-200 px-5 py-7"
          >
            {/* Title */}
            <div className="h-5 w-28 rounded bg-gray-200" />

            {/* Type */}
            <div className="h-5 w-24 rounded bg-gray-200" />

            {/* Start Date */}
            <div className="h-5 w-28 rounded bg-gray-200" />

            {/* End Date */}
            <div className="h-5 w-28 rounded bg-gray-200" />

            {/* Action */}
            <div className="h-5 w-14 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
