import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const App = () => {
    const [data, setData] = useState([]);
    const [metrics, setMetrics] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/api/oil-prices')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the oil prices data!", error);
            });

        axios.get('http://localhost:5000/api/metrics')
            .then(response => {
                setMetrics(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the metrics!", error);
            });
    }, []);

    return (
        <div>
            <h1>Brent Oil Prices Dashboard</h1>
            <h2>Metrics</h2>
            <p>RMSE: {metrics.rmse}</p>
            <p>MAE: {metrics.mae}</p>

            <h2>Oil Prices Over Time</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Price" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default App;
