export const TableSkeleton = () => {
  return (
    <table className="w-full border-collapse mt-8">
      <thead>
        <tr>
          {[...Array(8)].map((_, i) => (
            <th key={i} className="p-3 border border-gray-300">
              <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(8)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(8)].map((_, cellIndex) => (
              <td key={cellIndex} className="p-4 border border-gray-300">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
