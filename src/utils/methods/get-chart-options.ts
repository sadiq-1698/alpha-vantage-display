import { ApexOptions } from "apexcharts";
import getMetaInfo from "./get-meta-info";
import getSeriesKey from "./get-series-key";
import modifyVolumeSeries from "./modify-volume-series";

const getChartOptions = (
  chartData: any,
  type = "candlestick",
  func?: string,
  interval?: string
) => {
  // const currentTimeSeriesKey = getSeriesKey(func, interval);
  const currentTimeSeriesKey = getSeriesKey(func as string, "5min");
  const currentTimeSeriesData = chartData[currentTimeSeriesKey];

  const volumeSeries = modifyVolumeSeries(chartData, func as string, interval);

  return {
    ...(type === "bar" && {
      chart: {
        type: type,
        height: "100%",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors:
        volumeSeries &&
        volumeSeries[0].actualData.map((el) =>
          el >= 0 ? "#00ff00" : "#ff0000"
        ),
      plotOptions: {
        bar: {
          distributed: true,
          columnWidth: "80%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        categories: currentTimeSeriesData
          ? Object.keys(currentTimeSeriesData).map((el) =>
              el.split(" ").length > 1 ? el.split(" ").join("T") : el
            )
          : [],
      },
      yaxis: {
        labels: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    }),

    ...(type === "candlestick" && {
      chart: {
        type: type,
        id: "candles",
        height: "100%",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: getMetaInfo(chartData),
        align: "left",
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM",
            day: "dd",
            hour: "HH:mm",
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
        },
        tooltip: {
          enabled: true,
        },
      },
    }),
  } as ApexOptions;
};

export default getChartOptions;
