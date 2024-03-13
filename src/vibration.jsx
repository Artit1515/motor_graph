import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function Vibration() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newDataPoint = {
                time: new Date().toLocaleTimeString(),
                temperature: Math.floor(Math.random() * 120),
            };

            setData(prevData => [...prevData, newDataPoint]);
        }, 2000);

        
        return () => clearInterval(interval);
    }, []);

    return (
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
}

