// src/components/TotalRevenueChart.jsx
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
    Label
} from "recharts";

const data = [
    { date: "10 Mar", current: 200, previous: 100 },
    { date: "11 Mar", current: 1400, previous: 900 },
    { date: "12 Mar", current: 1300, previous: 1300 },
    { date: "13 Mar", current: 1500, previous: 700 },
    { date: "14 Mar", current: 1000, previous: 1000 },
    { date: "15 Mar", current: 1600, previous: 1200 },
];

const TotalRevenueChart = () => {
    return (
        <div className="bg-white rounded-xl shadow p-4 w-full">
            <div className="mb-2">
                <h2 className="text-lg font-semibold">Total Revenue</h2>
                <p className="text-sm text-green-600">↑ 2.5% Last week</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="current"
                        stroke="#16a34a" // green
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="previous"
                        stroke="#dc2626" // red
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalRevenueChart;
