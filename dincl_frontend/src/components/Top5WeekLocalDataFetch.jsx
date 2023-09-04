import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { Pie } from "react-chartjs-2"; // Import the Pie component
import { Chart, PieController, ArcElement, CategoryScale } from "chart.js";
import datalabels from 'chartjs-plugin-datalabels';

Chart.register(datalabels);
Chart.register(PieController, ArcElement, CategoryScale);

const Top5WeeklyDataFetchComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalItems, setTotalItems] = useState(0); // State to store the total number of items

    useEffect(() => {
        const apiUrl = "http://127.0.0.1:8000/api/v1/top5weekly/?format=json";
        const countApiUrl =
            "http://127.0.0.1:8000/api/v1/top5_weekly_count?format=json"; // New API endpoint for fetching count

        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const fetchCount = async () => {
            try {
                const countResponse = await axios.get(countApiUrl);
                setTotalItems(countResponse.data.count); // Set the total number of items from the count API
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        Promise.all([fetchData(), fetchCount()]); // Fetch both data and count concurrently
    }, []);

    if (loading) {
        return <div className="component">Loading...</div>;
    }

    if (error) {
        return <div className="component">Error: {error}</div>;
    }

    // Data for the pie chart

    const colors = [
        "#FFA07A",
        "#87CEFA",
        "#98FB98",
        "#FFB6C1",
        "#DDA0DD",
        "#FFD700",
        "#20B2AA",
        "#FF6347",
        "#B0E0E6",
        "#FFC0CB",
        "#D3D3D3",
        "#F0E68C",
        "#C71585",
        "#FF4500",
        "#32CD32",
        "#DB7093",
    ];

    const options = {
        plugins: {
            datalabels: {
                display: true,
                color: "black", // Adjust this to pick your desired color.
                formatter: function (value, context) {
                    return context.chart.data.labels[context.dataIndex];
                },
            },
        },
        // other options...
    };

    const pieData = {
        labels: data.map((item) => item.voivodship),
        datasets: [
            {
                data: data.map((item) => item.survey_count),
                backgroundColor: colors.slice(0, data.length),
            },
        ],
    };

    return (
        <div className="component">
            <h2>Top 5 Voivoidships Weekly</h2>
            <Pie data={pieData} options={options} />
            <p>Total items: {totalItems}</p>
        </div>
    );
};

export default Top5WeeklyDataFetchComponent;
