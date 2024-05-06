import { ApexOptions } from "apexcharts";
import getSeriesKey from "./get-series-key";
import modifyVolumeSeries from "./modify-volume-series";
import { CHART_TYPE_BAR, CHART_TYPE_CANDLE } from "../constants";

const getChartOptions = (
  chartData: any,
  type = CHART_TYPE_CANDLE,
  func?: string,
  interval?: string
) => {
  const currentTimeSeriesKey = getSeriesKey(func as string, interval);
  // const currentTimeSeriesKey = getSeriesKey(func as string, "5min");
  const currentTimeSeriesData = chartData[currentTimeSeriesKey];

  const volumeSeries = modifyVolumeSeries(chartData, func as string, interval);

  return {
    chart: {
      type: type,
      height: "100%",

      ...(type === CHART_TYPE_BAR && {
        toolbar: {
          show: false,
        },
      }),

      ...(type === CHART_TYPE_CANDLE && {
        id: "candles",
        toolbar: {
          show: true,
          autoSelected: "pan",
          tools: {
            pan: true,
            zoom: false,
            zoomin: true,
            reset: true,
            zoomout: true,
            download: false,
            selection: false,
          },
        },
        selection: {
          enabled: false,
        },
      }),
    },

    xaxis: {
      type: "datetime",
      ...(type === CHART_TYPE_BAR && {
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

      ...(type === CHART_TYPE_CANDLE && {
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
      ...(type === CHART_TYPE_BAR && {
        labels: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      }),

      ...(type === CHART_TYPE_CANDLE && {
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

    ...(type === CHART_TYPE_BAR && {
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
