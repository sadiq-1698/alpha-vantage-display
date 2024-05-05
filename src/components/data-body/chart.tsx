import { useContext } from 'react';
import ReactChart from 'react-apexcharts';
import { StockContext } from '../../utils/contexts/StockContext';
import getChartOptions from '../../utils/methods/get-chart-options';
import modifyVolumeSeries from '../../utils/methods/modify-volume-series';
import modifyTimeSeriesData from '../../utils/methods/modify-time-series-data';

const Chart = () => {
  const { chartData, dataQuery, chartLoading } = useContext(StockContext);

  return (
    <div className='h-[95%] w-[70%] pt-6 relative'>
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
          <>

            <div className='h-[30%] absolute bottom-[2%] opacity-40 w-full pl-5'>
              <ReactChart
                type="bar"
                height={"100%"}
                series={modifyVolumeSeries(chartData, dataQuery.function, dataQuery.interval)}
                options={getChartOptions(chartData, "bar", dataQuery.function, dataQuery.interval)}
              />
            </div>

            <ReactChart
              height={"100%"}
              type="candlestick"
              options={getChartOptions(chartData)}
              series={modifyTimeSeriesData(chartData, dataQuery.function, dataQuery.interval)}
            />
          </>

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