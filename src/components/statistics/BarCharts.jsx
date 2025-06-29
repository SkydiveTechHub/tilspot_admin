import { Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'

const BarCharts = ({ duration, Cdata, customDays }) => {
  const [data, setData] = useState([])

  console.log(Cdata)

  useEffect(() => {
    if (duration === 'daily') {
      setData([
        { name: "Sunday", approveCount: Cdata[0]?.approvedCount || 0, rejectCount: Cdata[0]?.rejectedCount || 0 },
        { name: "Monday", approveCount: Cdata[1]?.approvedCount || 0, rejectCount: Cdata[1]?.rejectedCount || 0 },
        { name: "Tuesday", approveCount: Cdata[2]?.approvedCount || 0, rejectCount: Cdata[2]?.rejectedCount || 0 },
        { name: "Wednesday", approveCount: Cdata[3]?.approvedCount || 0, rejectCount: Cdata[3]?.rejectedCount || 0 },
        { name: "Thursday", approveCount: Cdata[4]?.approvedCount || 0, rejectCount: Cdata[4]?.rejectedCount || 0 },
        { name: "Friday", approveCount: Cdata[5]?.approvedCount || 0, rejectCount: Cdata[5]?.rejectedCount || 0 },
        { name: "Saturday", approveCount: Cdata[6]?.approvedCount || 0, rejectCount: Cdata[6]?.rejectedCount || 0 }
      ])
    } else if (duration === 'weekly') {
      setData([
        { name: "Week 1", approveCount: Cdata[0]?.approvedCount || 0, rejectCount: Cdata[0]?.rejectedCount || 0 },
        { name: "Week 2", approveCount: Cdata[1]?.approvedCount || 0, rejectCount: Cdata[1]?.rejectedCount || 0 },
        { name: "Week 3", approveCount: Cdata[2]?.approvedCount || 0, rejectCount: Cdata[2]?.rejectedCount || 0 },
        { name: "Week 4", approveCount: Cdata[3]?.approvedCount || 0, rejectCount: Cdata[3]?.rejectedCount || 0 }
      ])
    } else if (duration === 'monthly') {
      setData([
        { name: "Jan", approveCount: Cdata[0]?.approvedCount || 0, rejectCount: Cdata[0]?.rejectedCount || 0 },
        { name: "Feb", approveCount: Cdata[1]?.approvedCount || 0, rejectCount: Cdata[1]?.rejectedCount || 0 },
        { name: "Mar", approveCount: Cdata[2]?.approvedCount || 0, rejectCount: Cdata[2]?.rejectedCount || 0 },
        { name: "Apr", approveCount: Cdata[3]?.approvedCount || 0, rejectCount: Cdata[3]?.rejectedCount || 0 },
        { name: "May", approveCount: Cdata[4]?.approvedCount || 0, rejectCount: Cdata[4]?.rejectedCount || 0 },
        { name: "Jun", approveCount: Cdata[5]?.approvedCount || 0, rejectCount: Cdata[5]?.rejectedCount || 0 },
        { name: "Jul", approveCount: Cdata[6]?.approvedCount || 0, rejectCount: Cdata[6]?.rejectedCount || 0 },
        { name: "Aug", approveCount: Cdata[7]?.approvedCount || 0, rejectCount: Cdata[7]?.rejectedCount || 0 },
        { name: "Sep", approveCount: Cdata[8]?.approvedCount || 0, rejectCount: Cdata[8]?.rejectedCount || 0 },
        { name: "Oct", approveCount: Cdata[9]?.approvedCount || 0, rejectCount: Cdata[9]?.rejectedCount || 0 },
        { name: "Nov", approveCount: Cdata[10]?.approvedCount || 0, rejectCount: Cdata[10]?.rejectedCount || 0 },
        { name: "Dec", approveCount: Cdata[11]?.approvedCount || 0, rejectCount: Cdata[11]?.rejectedCount || 0 }
      ])
    } else if (duration === 'custom') {
      console.log('is custom date range')
      const customData = customDays.map((dayName, index) => ({
        name: dayName,
        approveCount: Cdata[index]?.approvedCount || 0,
        rejectCount: Cdata[index]?.rejectedCount || 0,
      }))
      setData(customData)
    }
  }, [duration, Cdata, customDays])

  console.log(data)

  return (
    <div>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="approveCount" fill="#002b6f" />
        <Bar dataKey="rejectCount" fill="red" />
      </BarChart>
    </div>
  )
}

export default BarCharts
