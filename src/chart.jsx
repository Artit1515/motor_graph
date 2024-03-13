import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDataPoint = {
        temperature: Math.floor(Math.random() * 120),
      };

      setData(prevData => [...prevData, newDataPoint]);
    }, 2000); 

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
            <Cell fill="#808080" /> // Set the color of the "gate" temperature to green
          </Pie>
          <text x={200} y={200} dy={8} textAnchor="middle" fill="#000">{`${data[data.length - 1].temperature}°c`}</text>
        </PieChart>
      )}
      {data.length > 0 && <p>Last temperature: {data[data.length - 1].temperature}</p>}
    </>
  );
}

export default Chart;