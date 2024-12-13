import React, { useState } from 'react'
import Piecharts from '../../../components/statistics/Piecharts'
import BarCharts from '../../../components/statistics/BarCharts'
import { Button, Dropdown } from 'antd';

const StatisticPage = () => {
    const serviceData = ['Airtime', 'Internet', 'Government', 'Gas', 'Waste', 'Transport', 'Football', 'Cable', 'Parking', 'Housing', 'Electricity'];
    const [activeTab, setActiveTab] = useState('Airtime')
    const [summaryData, setSummaryData] = useState()
    const [filterDuration, setFilterDuration] = useState('week')
    const userCardData = [
        {
          title:'Total Number of Users',
          amount: summaryData?.totalWaste || 0,
          icon:'/images/f3.svg'
        },	
        {
          title:'Total Number of verified Users',
          amount:summaryData?.organizationIncome || 0,
          icon:'/images/f3.svg'
        },	
        {
          title:'Total Number of Unverified Users',
          amount:summaryData?.transactionPoint || 0,
          icon:'/images/f3.svg'
        },	

      
      ]
    const cardData = [
        {
          title:'Total Revenue Generated',
          amount: summaryData?.totalWaste || 0,
          icon:'/images/f1.svg'
        },	
        {
          title:'Total Order Processed',
          amount:summaryData?.organizationIncome || 0,
          icon:'/images/f2.svg'
        },	
        {
          title:'Total Completed Orders',
          amount:summaryData?.transactionPoint || 0,
          icon:'/images/f3.svg'
        },	
        {
          title:'Total Failed Orders',
          amount:summaryData?.commission || 0, 
          icon:'/images/f4.svg'
          
        },	
      
      ]
      const items = [

        {
          key: '1',
          label: (
            <button onClick={()=>(setFilterDuration('today'))} >
              Today
            </button>
          ),
        },
        {
          key: '2',
          label: (
            <button onClick={()=>(setFilterDuration('week'))} >
              This Week
            </button>
          ),
        },
        {
          key: '3',
          label: (
            <button onClick={()=>(setFilterDuration('month'))} >
              This Month
            </button>
          ),
        },

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
   
          <BarCharts duration={filterDuration}/>               
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
			</div>
			<img className="w-40px] h-[40px]" src={icon} alt="icon" />
		</div>
	)
}