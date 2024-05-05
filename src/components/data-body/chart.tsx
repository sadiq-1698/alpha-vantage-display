import { ApexOptions } from 'apexcharts';
import { useContext } from 'react';
import ReactChart from 'react-apexcharts';
import { StockContext } from '../../utils/contexts/StockContext';
import modifyTimeSeriesData from '../../utils/methods/modify-time-series-data';

const getMetaInfo = (chartData: any) => {
  if (!chartData) return "";

  if (chartData["Information"]) return "";

  return chartData["Meta Data"]["2. Symbol"] + " - " + chartData["Meta Data"]["1. Information"];
}

const getChartOptions = (chartData: any) => {
  return {
    chart: {
      type: "candlestick",
      height: "100%",
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false,
      },
      parentHeightOffset: 500
    },
    title: {
      text: getMetaInfo(chartData),
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MMM',
          day: 'dd',
          hour: 'HH:mm'
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: false
      }
    }
  } as ApexOptions
};

const Chart = () => {

  const { chartData, dataQuery, chartLoading } = useContext(StockContext);

  console.log(chartData);

  return (
    <div className='h-[90%] w-[70%] pt-6'>
      {
        chartLoading &&
        (
          <div className='h-full flex justify-center items-center'>
            Loading...
          </div>
        )
      }

      {
        !chartLoading && chartData && !chartData["Information"] &&
        (
          <ReactChart
            height={"100%"}
            type="candlestick"
            options={getChartOptions(chartData)}
            series={modifyTimeSeriesData(chartData, dataQuery.function, dataQuery.interval)}
          />
        )
      }

      {
        !chartLoading && chartData && chartData["Information"] &&
        (
          <div className='h-full flex justify-center items-center'>
            API limit reached!
          </div>
        )
      }

    </div>
  );
}

export default Chart;