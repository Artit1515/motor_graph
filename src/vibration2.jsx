import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Vibration2 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = "http://localhost:3000/todos";
        const motorId = "1";
        const fetchData = async () => {
            try {
                // Add new data
                const newTemperature = Math.floor(Math.random() * 100);
                const newTimestamp = new Date().toISOString();
                await axios.post(url, { motor_id: motorId, temperature: newTemperature, timestamp: newTimestamp });

                // Fetch data
                const response = await axios.get(`${url}?motor_id=${motorId}`);
                if (Array.isArray(response.data)) {
                    const newData = response.data.map(item => {
                        const date = new Date(item.timestamp);
                        if (isNaN(date)) {
                            console.error('Invalid timestamp format:', item.timestamp);
                            return null;
                        }
                        return {
                            time: date.toLocaleTimeString(),
                            temperature: item.temperature,
                        };
                    }).filter(item => item !== null);
                    setData(prevData => [...prevData, ...newData]);
                }
            } catch (error) {
                console.error('Failed to fetch data from API', error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <LineChart width={500} height={300} data={data}>
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
};

export default Vibration2;