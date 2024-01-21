import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './ComponentsStyles/ChartComponent.css'
function LineChart({ chartData, maxData, minData }) {
  return <Line data={chartData} plugins={[ChartDataLabels]} width={1500} options={{
    aspectRatio:5,
    plugins: {
        legend: {
            display:false,
            labels: false
        },
        datalabels: {
          borderRadius: 4,
          color: '#fff',
          font: {
            weight: 'bold'
          },
        }
    },
    elements: {
      line: {
        fill: false,
        tension: 0.2
      }
    },
    scales: {
        x: {
          grid: {
            display: false,
          },
          display:true,
          ticks: {
            display: true,
            padding: 28,
          },
          position:'bottom',
          gridLines: {
            drawBorder: false,
          },
        },
        y: {
          grid: {
            display: true
          },
          display:false,
          ticks: {
            display: false
          },
          min:minData,
          max:maxData
        },
      },
  }} className="chart" />;
}
export default LineChart