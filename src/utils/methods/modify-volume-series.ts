import getSeriesKey from "./get-series-key";

const modifyVolumeSeries = (
  chartData: any,
  func: string,
  interval?: string
) => {
  if (!chartData) return;

  // const currentTimeSeriesKey = getSeriesKey(func, interval);
  const currentTimeSeriesKey = getSeriesKey(func, "5min");
  const currentTimeSeriesData = chartData[currentTimeSeriesKey];

  if (!currentTimeSeriesData) {
    return [
      {
        name: "Volume",
        data: [],
        actualData: [],
      },
    ];
  }

  const res = [];
  const actual = [];
  const volumeSeriesKeys = Object.keys(currentTimeSeriesData);

  for (let i = 0; i < volumeSeriesKeys.length; i++) {
    if (i > 0) {
      if (
        Number(currentTimeSeriesData[volumeSeriesKeys[i]]["4. close"]) >
        Number(currentTimeSeriesData[volumeSeriesKeys[i - 1]]["4. close"])
      ) {
        res.push(
          Number(currentTimeSeriesData[volumeSeriesKeys[i]]["5. volume"])
        );
        actual.push(
          Number(currentTimeSeriesData[volumeSeriesKeys[i]]["5. volume"])
        );
      } else {
        res.push(
          Number(currentTimeSeriesData[volumeSeriesKeys[i]]["5. volume"])
        );
        actual.push(
          0 - Number(currentTimeSeriesData[volumeSeriesKeys[i]]["5. volume"])
        );
      }
    }
  }

  return [
    {
      name: "Volumes",
      data: res,
      actualData: actual,
    },
  ];
};

export default modifyVolumeSeries;
