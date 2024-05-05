import Chart from "./chart";
import LatestStats from "./latest-stats";

const DataBody = () => {
  return (
    <div className="h-[100vh] pt-10 bg-white w-full">
      <div className="px-4 h-full flex flex-col-reverse lg:flex-row">
        <Chart />
        <LatestStats />
      </div>
    </div>
  );
}

export default DataBody;