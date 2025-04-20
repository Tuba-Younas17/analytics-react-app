

import { Bar, Pie, Line } from "react-chartjs-2";

export const renderChart = (chart) => {
	const type = chart.chartType?.toLowerCase();
	const data = chart.dataPoint?.data || [];
	const xField = chart.plotCombination?.x;
	const yField = chart.plotCombination?.y;

	if (!xField || !yField || data.length === 0) {
		return <p>Invalid chart data</p>;
	}

	const xData = data.map((d) => d[xField]);
	const yData = data.map((d) => parseFloat(d[yField]));

	const chartData = {
		labels: xData,
		datasets: [
			{
				label: `${yField} vs ${xField}`,
				data: yData,
				backgroundColor: "rgba(75, 192, 192, 0.5)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
				fill: false,
				tension: 0.4,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				beginAtZero: true,
			},
			y: {
				beginAtZero: true,
				ticks: {
					autoSkip: true,
				},
			},
		},
	};

	const chartStyle = "w-full h-[300px] sm:h-[350px] md:h-[400px]";

	switch (type) {
		case "bar":
			return (
				<div className={chartStyle}>
					<Bar data={chartData} options={options} />
				</div>
			);
		case "line":
			return (
				<div className={chartStyle}>
					<Line data={chartData} options={options} />
				</div>
			);
		case "pie":
			return (
				<div className={chartStyle}>
					<Pie data={chartData} options={options} />
				</div>
			);
		default:
			return <p>Unsupported chart type: {chart.chartType}</p>;
	}
};
