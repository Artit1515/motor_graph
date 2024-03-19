import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

function Chart() {
  const [data, setData] = useState([]);
  const url ="/api/devices/get/last_data";
  const motorId ="NodeMCU_ESP8266"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(url, { motor_id: motorId });
        const newData = {
          temperature: response.data.msg.temperature,
        };
        setData(prevData => [...prevData, newData]);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000); 
    console.log("fetching data");
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {data.length > 0 && (
        <PieChart width={400} height={400}>
          <Pie
            data={[data[data.length - 1], { temperature: 60 }]} 
            cx={200}
            cy={200}
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            fill={data[data.length - 1].temperature > 60 ? "#ff0000" : "#8884d8"} 
            dataKey="temperature"
          >
            <Cell fill={data[data.length - 1].temperature > 60 ? "#ff0000" : "#8884d8"} /> 
            <Cell fill="#808080" /> 
          </Pie>
        </PieChart>
      )}
    </>
  );
}

export default Chart;