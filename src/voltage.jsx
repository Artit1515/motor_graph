import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

export default function Voltage() {
    const [data, setData] = useState([]);
    const url = "/api/devices/get/last_data";
    const motorId = "NodeMCU_ESP8266";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(url, { motor_id: motorId });
                const res = response.data;
                const newDataPoint = {
                    time: res.msg.timestamp.toString(),
                    voltage: res.msg.voltage, 
                };
                setData(prevData => [...prevData, newDataPoint]);
            } catch (error) {
                console.error('Failed to fetch data from API', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <BarChart
            width={500}
            height={300}
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 120]} /> //domain={[0, 120]} make the limit of the graph to show only 120
            <YAxis dataKey="time" type="category" />
            <Tooltip />
            <Bar dataKey="voltage" fill="#8884d8" name="voltage" />
            <Legend verticalAlign="middle" align="left" layout="vertical" />
        </BarChart>
    );
}