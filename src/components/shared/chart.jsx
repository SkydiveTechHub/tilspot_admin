import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';

export const DoughnutChart = ({data}) => {

    const label = data?.map((i)=>i.title)
    const color = data?.map((i)=>i.color)
    const value = data?.map((i)=>i.value)

  const chartOptions = {
    chart: {
      type: 'donut',
    },
    legend: {
        show:false,
        position: 'bottom',
      },
    labels: label,
    // labels: ['Category A', 'Category B', 'Category C'],
    title: {
      text: '',
      align: 'center',
    },
    colors: color,
    // colors: [data?.map((i)=>i.color)], // Custom colors
    plotOptions: {
      pie: {
        donut: {
          size: '65%', // Adjust the size of the donut hole
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const seriesData = value; // The percentage breakdown for each segment

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={seriesData}
        type="donut"
        width="300"
      />
    </div>
  );
};




export const LineChart = () => {
  const chartData = {
    series: [
      {
        name: 'Sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125], // Sample data for the chart
      },
    ],
    options: {
      chart: {
        type: 'line', // Define the chart type as "line"
        
        zoom: {
          enabled: false, // Disables chart zoom
        },
      },
      dataLabels: {
        enabled: false, // Disables data labels on the chart
      },
      stroke: {
        width: 1,
        curve: 'smooth', // Smooth line style
      },
      title: {
        text: '',
        align: 'left', // Aligns the chart title to the left
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], // X-axis categories
      },
      yaxis: {
        title: {
          text: 'Sales', // Y-axis label
        },
      },
    },
  };

  return (
    <div className="line-chart-container">
      {/* The Chart component renders the line chart with the specified options and series data */}
      <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};
