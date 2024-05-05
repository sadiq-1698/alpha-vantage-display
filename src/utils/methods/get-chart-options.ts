import { ApexOptions } from "apexcharts";
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
    chart: {
      type: type,
      height: "100%",
      ...(type === "bar" && {
        toolbar: {
          show: false,
        },
      }),
      ...(type === "candlesticks" && {
        id: "candles",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: true,
          tools: {
            pan: true,
            zoomin: true,
            zoomout: true,
            download: false,
            reset: false,
            zoom: false,
            selection: false,
          },
        },
        
      }),
    },

    xaxis: {
      type: "datetime",
      ...(type === "bar" && {
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
      }),

      ...(type === "candlestick" && {
        tooltip: {
          formatter: function (val) {
            const date = new Date(val);
            const day = date.getDate();
            const month = date.toLocaleString("default", { month: "short" });
            const year = date.getFullYear();
            const formattedDate = day + " " + month + ", " + year;
            return formattedDate;
          },
        },
        labels: {
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM, yyyy",
            day: "dd MMM, yyyy",
            hour: "HH:mm",
          },
        },
      }),
    },

    yaxis: {
      ...(type === "bar" && {
        labels: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      }),
      ...(type === "candlestick" && {
        labels: {
          show: true,
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
        tooltip: {
          enabled: true,
        },
      }),
    },

    ...(type === "bar" && {
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
    }),
  } as ApexOptions;
};

export default getChartOptions;
