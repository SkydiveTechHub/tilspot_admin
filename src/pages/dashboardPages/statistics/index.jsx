import React, { useEffect, useState } from 'react'
import Piecharts from '../../../components/statistics/Piecharts'
import BarCharts from '../../../components/statistics/BarCharts'
import { Button, DatePicker, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminGlobalRecord, getUserStat } from '../../../store/actions/staffAction';
import moment from 'moment';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import utc from "dayjs/plugin/utc";
import { Link } from 'react-router-dom';
dayjs.extend(utc);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const StatisticPage = () => {
  const dispatch = useDispatch()
    const {users, bills} = useSelector((state)=>state.staff.usersStat)

    const serviceData = ['Airtime', 'Internet', 'Government', 'Gas', 'Waste', 'Transport', 'Football', 'Cable', 'Parking', 'Housing', 'Electricity'];
    const [activeTab, setActiveTab] = useState('Airtime')
    const [summaryData, setSummaryData] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [chartData, setChartData] = useState([])
    const [filterDuration, setFilterDuration] = useState('daily')
    const dateFormat = 'YYYY-MM-DD';
    const today = dayjs();
    const defaultStart = today.subtract(6, 'day');
    const defaultEnd = today;

    const [dates, setDates] = useState([defaultStart, defaultEnd]);

    const getDayNamesInRange = (start, end) => {
      const startDate = dayjs.utc(start);
      const endDate = dayjs.utc(end);
      const days = [];

      let current = startDate;

      while (current.isSameOrBefore(endDate, 'day')) {
        days.push(current.format('dddd'));
        current = current.add(1, 'day');
      }

      return days;
    };

    const handleChange = (selectedDates) => {
      if (selectedDates && selectedDates[0]) {
        const startDate = selectedDates[0];
        const tentativeEnd = startDate.add(6, 'day');
        const endDate = tentativeEnd.isAfter(today) ? today : tentativeEnd;
        setDates([startDate, endDate]);
      } else {
        setDates([]);
      }
    };

    const fetchUserStat = async() =>{
      try {
        const res = await dispatch(getUserStat())
      } catch (error) {
        
      }
      
    }
    const fetchGlobalRecord = async() =>{
      try {
        const res = await dispatch(getAdminGlobalRecord(filterDuration))
        setChartData(res.payload.responseData)
        setSummaryData(res.payload.totals)
      } catch (error) {
        
      }
      
    }
    const fetchCustomGlobalRecord = async() =>{
      try {
        const res = await dispatch(getAdminGlobalRecord(dates))
        setChartData(res.payload.responseData)
        setSummaryData(res.payload.totals)
      } catch (error) {
        
      }
      
    }

    useEffect(()=>{
      if(filterDuration !== 'custom'){
        fetchGlobalRecord()
      }else{
        fetchCustomGlobalRecord()
      }
      
    },[filterDuration, dates])

    useEffect(()=>{
      fetchGlobalRecord()
      fetchUserStat()
    },[])

    const userCardData = [
        {
          title:'Total Number of Users',
          amount: users?.total || 0,
          icon:'/images/f3.svg'
        },	
        {
          title:'Total Number of verified Users',
          amount:users?.verified || 0,
          icon:'/images/f3.svg'
        },	
        {
          title:'Total Number of Unverified Users',
          amount:users?.unverified || 0,
          icon:'/images/f3.svg'
        },	

      
      ]
    const cardData = [
        {
          title:'Total Revenue Generated',
          amount: summaryData?.totalRevenue || 0,
          icon:'/images/f1.svg'
        },	
        {
          title:'Total Order Processed',
          amount:summaryData?.totalOrders || 0,
          icon:'/images/f2.svg'
        },	
        {
          title:'Total Completed Orders',
          amount:summaryData?.totalApprovedOrder || 0,
          icon:'/images/f3.svg'
        },	
        {
          title:'Total Failed Orders',
          amount:summaryData?.totalRejectedOrder || 0, 
          icon:'/images/f4.svg'
          
        },	
      
      ]
      const items = [

        {
          key: '1',
          label: (
            <button onClick={()=>(setFilterDuration('daily'))} >
              This Week
            </button>
          ),
        },
        {
          key: '2',
          label: (
            <button onClick={()=>(setFilterDuration('weekly'))} >
              This Month
            </button>
          ),
        },
        {
          key: '3',
          label: (
            <button onClick={()=>(setFilterDuration('monthly'))} >
              This Year
            </button>
          ),
        },
        {
          key: '4',
          label: (
            <div
              onClick={(e) => {e.stopPropagation(); setFilterDuration('custom')}} // Prevent dropdown from closing
            >
              <span className='font-semibold'>Custom Date Range</span>
              <div className='flex gap-1 items-center'>
              <RangePicker
                value={dates}
                format={dateFormat}
                onChange={handleChange}
                disabled={[false, true]} // Disable second picker
              />
                {/* <DatePicker
                  onChange={(_, dateString) => setStartDate(moment(dateString))}
                />
                -
                <DatePicker
                  onChange={(_, dateString) => setEndDate(moment(dateString))}
                /> */}
              </div>
            </div>
          ),
        }

      ];
  return (
    <div className='space-y-12'>
        {/* <div className='flex flex-wrap gap-3 items-center'>
            {
                serviceData.map((i, id)=><button onClick={()=>setActiveTab(i)} className={`${activeTab === i? 'bg-[#e0090a] text-white': 'bg-transparent text-black'} py-1 w-[150px] font-mont font-semibold border rounded-lg shadow-md`}>{i}</button>)
            }            
        </div> */}



        {/* <p className='font-bold font-mont'>{activeTab} Statistics</p> */}
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-8 container -order-1 p-4 rounded-lg bg-[#f2f2f2]">
            {
            userCardData.map((i, id)=>{
                return(
                <PointCard key={id} title={i.title} amount={i.amount} icon={i.icon} />
                )
            })
             }
        </div>

      <div className='space-y-4'>
        <div className='flex justify-end'>
            <Dropdown
                menu={{
                    items,
                    }}
                    placement="bottomRight"
                >
                    <Button><span className="font-mont font-semibold">Filter</span></Button>
            </Dropdown>              
        </div>

        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 container -order-1">
            {
            cardData.map((i, id)=>{
                return(
                <PointCard key={id} title={i.title} amount={i.amount} icon={i.icon} />
                )
            })
             }
        </div>
              <BarCharts Cdata={chartData} duration={filterDuration} customDays={getDayNamesInRange(dates[0], dates[1])
}/>
                         
      </div>

    </div>
  )
}

export default StatisticPage


export const PointCard = ({title, amount , icon}) =>{
	return(
		<div className="shadow-md rounded-lg bg-white border border-[#E4E7EC] p-4 flex justify-between gap-3">
			<div>
				<p className="font-[400] font-mont text-[#475367] font-Int text-[12px]">{title}</p>
				<h1 className="font-[600] font-mont text-[#344054] font-Int text-[18px] ">{amount}</h1>
        {title === 'Total Number of Users' && <Link className='underline font-mont text-[12px] text-primary' to='/dashboard/users'>View Users</Link>}
			</div>
			<img className="w-40px] h-[40px]" src={icon} alt="icon" />
		</div>
	)
}