import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const Vibration = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const url =`/api/devices/get/last_data`;
        const motorId = "NodeMCU_ESP8266"
        const fetchData = async () => {
            try {
                const response = await axios.post(url, { motor_id: motorId });
                console.log(response.data.msg.timestamp);
                const res = response.data;
                const newData = [{
                    time: res.msg.timestamp.toString(),
                    temperature: res.msg.temperature,
                }]
                setData(prevData => [...prevData, ...newData]);

                // if (Array.isArray(response.data.data)) {
                //     console.log("is array....");
                //     const newData = {
                //         time: response.data.data[0].timestamp.toLocaleTimeString(),
                //         temperature: response.data.data[0].temperature,
                //     }
                //     // const newData = response.data.map(item => {
                //     //     const date = new Date(item.timestamp);
                //     //     if (isNaN(date)) {
                //     //         console.error('Invalid timestamp format:', item.timestamp);
                //     //         return null;
                //     //     }
                //     //     return {
                //     //         time: date.toLocaleTimeString(),
                //     //         temperature: item.temperature,
                //     //     };
                //     // }).filter(item => item !== null);
                //     setData(prevData => [...prevData, ...newData]);
                // }
            } catch (error) {
                console.error('Failed to fetch data from API', error);
            }
        console.log(data)

        };

        fetchData();

        // const onCall = () => {
        //     const user = {"motor_id": "NodeMCU_ESP8266"}
        //       const reqOption = {
        //           method:'POST',
        //           headers: {
        //               'Content-Type': 'application/json',
        //           },
        //           body: JSON.stringify(user),
        //       }
        
        //       fetch(`/api/devices/get/motor_data`, reqOption)
        //         .then((response) => {
        //           if (response.ok) {
        //             const newData = response.data.map(item => {
        //                 const motor_data = new Date(item.timestamp);
        //                     if (isNaN(date)) {
        //                         console.error('Invalid timestamp format:', item.timestamp);
        //                         return null;
        //                     }
        //                     return {
        //                         time: motor_data.toLocaleTimeString(),
        //                         temperature: item.temperature,
        //                     };
        //                     }).filter(item => item !== null);
        //                 setData(prevData => [...prevData, ...newData]);
        //             // return response.json();
                    
        //           } else if (response.status === 400) {
        //             throw new Error('Incorrect username or password');
        //           } else if (response.status === 404) {
        //             throw new Error('User not found');
        //           } else {
        //             throw new Error('An unexpected error occurred');
        //           }
        //         })
        //         .then((data) => {
        //           setData(data);
        //           console.log('User logged in:', this.data);
        //           // Handle success or navigate to another page
        //           navigate("/");
        //         })
        //         .catch((error) => {
        //           setError(error.message);
        //           console.error('Error logging in:', error);
        //           // Display an error message to the user
        //         });
        // }

        // onCall();
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <LineChart
            width={500}
            height={300}
            data={data.slice(-5)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="5 2" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
};

export default Vibration;