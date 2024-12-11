import { Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'
                      


const BarCharts = ({duration}) => {
    

    const weeklyData = [
        {
          "name": "Sunday",
          "uv": 4000,
          "pv": 2400
        },
        {
          "name": "Monday",
          "uv": 3000,
          "pv": 1398
        },
        {
          "name": "Tuesday",
          "uv": 2000,
          "pv": 9800
        },
        {
          "name": "Wednesday",
          "uv": 2780,
          "pv": 3908
        },
        {
          "name": "Thursday",
          "uv": 1890,
          "pv": 4800
        },
        {
          "name": "Friday",
          "uv": 2390,
          "pv": 3800
        },
        {
          "name": "Saturday",
          "uv": 3490,
          "pv": 4300
        }
      ]
    const yearlyData = [
        {
          "name": "January",
          "uv": 4000,
          "pv": 2400
        },
        {
          "name": "Feburary",
          "uv": 3000,
          "pv": 1398
        },
        {
          "name": "March",
          "uv": 2000,
          "pv": 9800
        },
        {
          "name": "April",
          "uv": 2780,
          "pv": 3908
        },
        {
          "name": "May",
          "uv": 1890,
          "pv": 4800
        },
        {
          "name": "June",
          "uv": 2390,
          "pv": 3800
        },
        {
          "name": "July",
          "uv": 3490,
          "pv": 4300
        },
        {
          "name": "August",
          "uv": 3490,
          "pv": 4300
        },
        {
          "name": "September",
          "uv": 3490,
          "pv": 4300
        },
        {
          "name": "October",
          "uv": 3490,
          "pv": 4300
        },
        {
          "name": "November",
          "uv": 3490,
          "pv": 4300
        },
        {
          "name": "December",
          "uv": 3490,
          "pv": 4300
        },
      ]
    const monthlyData = [
        {
          "name": "week 1",
          "uv": 4000,
          "pv": 2400
        },
        {
          "name": "Week 2",
          "uv": 3000,
          "pv": 1398
        },
        {
          "name": "Week 3",
          "uv": 2000,
          "pv": 9800
        },
        {
          "name": "Week 4",
          "uv": 2780,
          "pv": 3908
        },

      ]

      const [data, setData] = useState(weeklyData)

      useEffect(()=>{
        if(duration === 'week'){
            setData(weeklyData)
        }else if(duration === 'month'){
            setData(monthlyData)
        }else{
            setData(yearlyData)
        }
      },[duration])
      
            

  return (
    
    <div>
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar width={10} dataKey="pv" fill="#002b6f" />
            {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
    </div>
  )
}

export default BarCharts
