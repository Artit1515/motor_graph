import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,Legend} from 'recharts';

export default function Voltage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newDataPoint = {
                time: new Date().toLocaleTimeString(),
                R: Math.floor(Math.random() * 120),
                S: Math.floor(Math.random() * 120),
                T: Math.floor(Math.random() * 120),
            };
    
            setData([newDataPoint]); 
        }, 2000); 
    
      
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
            <XAxis type="number" />
            <YAxis dataKey="time" type="category" />
            <Tooltip />
            <Bar dataKey="R" fill="#8884d8" name="R" />
        <Bar dataKey="S" fill="#82ca9d" name="S" />
        <Bar dataKey="T" fill="#ffc658" name="T" />
        <Legend verticalAlign="middle" align="left" layout="vertical" />
        </BarChart>
    );
}

