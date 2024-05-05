const PerformanceStat = ({ label, value }: { label: string, value: string }) => {
  return (
    <div className="p-2 rounded-md bg-gray-200 flex-1">
      <p className="text-xs font-bold text-gray-600">{label}</p>
      <p className="text-sm mt-1 font-semibold">
        {value}
      </p>
    </div>
  );
};

export default PerformanceStat;
