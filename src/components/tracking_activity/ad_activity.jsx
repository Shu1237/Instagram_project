import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const AdActivity = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    const dataBar = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Ad Activity 2024',
                data: [1200, 2000, 1500, 2500, 1800, 3000, 2200, 3500, 2800, 4000, 3200, 4500],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Ad Activity Q1 2025',
                data: [1000, 2444, 144, 2555, null, null, null, null, null, null, null, null],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    const dataLine = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Ad Activity 2024',
                data: [1200, 2000, 1500, 2500, 1800, 3000, 2200, 3500, 2800, 4000, 3200, 4500],
                fill: false,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }
        ]
    };

    const dataDoughnut = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: 'Dataset',
            data: [300, 50, 100],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4
        }]
    };

    return (
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
       
            <div className="mb-6">
                <h2 className="text-xl font-medium text-center mb-4">Followers Growth</h2>
                <div className="h-64">
                    <Bar data={dataBar} options={options} />
                </div>
            </div>

         
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h2 className="text-lg font-medium text-center mb-4">The number of friends</h2>
                    <div className="h-64">
                        <Line data={dataLine} options={options} />
                    </div>
                </div>

         
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h2 className="text-lg font-medium text-center mb-4">The rate of Active</h2>
                    <div className="h-64">
                        <Doughnut data={dataDoughnut} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdActivity;
