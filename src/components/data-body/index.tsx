import Chart from "./chart";
import LatestStats from "./latest-stats";

const DataBody = () => {
  return (
    <div className="h-[100vh] pt-10 bg-white w-full">
      <div className="px-4 h-full flex">
        <Chart />
        <LatestStats />
      </div>
    </div>
  );
}

export default DataBody;