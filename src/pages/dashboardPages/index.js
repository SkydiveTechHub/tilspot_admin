import React, { useEffect, useState } from "react";
import { Section } from "../../components/shared/container/container";
import { useNavigate } from "react-router-dom";
import PreviewAirtimeOrderModal from "../../components/shared/Modals/Airtime/PreviewAirtime";
import PreviewCableOrderModal from "../../components/shared/Modals/cable/PreviewCable";
import PreviewInternetOrderModal from "../../components/shared/Modals/Internet/PreviewInternet";
import PreviewGasOrderModal from "../../components/shared/Modals/gas/PreviewGas";
import PreviewTransportOrderModal from "../../components/shared/Modals/Transport/PreviewTransport";
import PreviewParkingOrderModal from "../../components/shared/Modals/parking/PreviewParking";
import PreviewHousingOrderModal from "../../components/shared/Modals/housing/PreviewHousing";
import PreviewFootballOrderModal from "../../components/shared/Modals/football/PreviewFootball";
import PreviewWasteOrderModal from "../../components/shared/Modals/waste/PreviewWaste";
import PreviewGovernmentOrderModal from "../../components/shared/Modals/government/PreviewGovernment";
import { Button, Dropdown, Space } from 'antd';
import StatisticsModal from "../../components/shared/Modals/StatisticModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllBills, getMyRecord, getOperatorRecord } from "../../store/actions";

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [summaryData, setSummaryData] = useState()
        const [filterDuration, setFilterDuration] = useState('daily')
        const {operatorStat} = useSelector((state)=>state.staff)

    const [modalToView, setModalToView] = useState()

        const fetchOperatorRecord = async() =>{
          try {
            const res = await dispatch(getOperatorRecord(filterDuration))
            console.log(res)
          } catch (error) {
            
          }
          
        }
        const fetchMyRecord = async() =>{
          try {
            const res = await dispatch(getMyRecord(filterDuration))
            console.log(res)
          } catch (error) {
            
          }
          
        }
        const fetchBills = async() =>{
          try {
            const res = await dispatch(getAllBills())
            console.log(res)
          } catch (error) {
            
          }
          
        }
        useEffect(()=>{
            fetchBills()
            fetchOperatorRecord()
        },[])

        const items = [

            {
              key: '1',
              label: (
                <button onClick={()=>(setFilterDuration('daily'))} >
                  Today
                </button>
              ),
            },
            {
              key: '2',
              label: (
                <button onClick={()=>(setFilterDuration('weekly'))} >
                  This Week
                </button>
              ),
            },
            {
              key: '3',
              label: (
                <button onClick={()=>(setFilterDuration('monthly'))} >
                  This Month
                </button>
              ),
            },
    
          ];
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
    
    const  service_modal = {
            airtime:   <PreviewAirtimeOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            provider={'MTN'}
                            phone={'09022334455'}
                            amount={'500'}
                        />,
            internet:   <PreviewInternetOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            provider={'MTN'}
                            plan = {'mtn_2gb_30days'}
                            phone={'09022334455'}
                            amount={'500'}
                        />,
            cable:   <PreviewCableOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            provider={'MTN'}
                            acctNo={'111223344222'}
                            phone={'09022334455'}
                            amount={'500'}
                        />,
            gas:   <PreviewGasOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            provider={'MTN'}
                            acctNo={'09022334455'}
                            amount={'500'}
                        />,

            transportation:   <PreviewTransportOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            d_location={'MTN'}
                            phone={'09022334455'}
                            amount={'500'}
                        />,
            parking:   <PreviewParkingOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            provider={'MTN'}
                            reg ={'8882288c'}
                            phone={'09022334455'}
                            amount={'500'}
                        />,
            football:   <PreviewFootballOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            provider={'MTN'}
                            reg ={'8882288c'}
                            phone={'09022334455'}
                            amount={'500'}
                        />,
            waste:   <PreviewWasteOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            provider={'MTN'}
                            reg ={'8882288c'}
                            phone={'09022334455'}
                            amount={'500'}
                        />,
            government:   <PreviewGovernmentOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            provider={'MTN'}
                            reg ={'8882288c'}
                            phone={'09022334455'}
                            amount={'500'}
                        />,
            housing:   <PreviewHousingOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            provider={'MTN'}
                            reg ={'8882288c'}
                            phone={'09022334455'}
                            amount={'500'}
                        />,
        }

   
        const handleFindModal = (service) => {
            const currentModalObject = service_modal[service];
            if (currentModalObject) {
                setModalToView(currentModalObject);
                setOpen(true);
            } else {
                console.error(`No modal found for service: ${service}`);
            }
        };
    
        return (
            <>
                {open && modalToView}



        <div className="space-y-4">

            

            <Section title={"Statistics"} className="overview-section relative" >
                <>
                    <div className="absolute top-2 right-10">
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

                </>

            </Section>
            <Section title={"Pending Order"} className="overview-section" >
                <div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {
                        serviceEnum.map((i, id)=>
                        <Card
                            tag={i.service_name}
                            TColor={i.serviceTC}
                            iconUrl={i.service_icon}
                            date={'10/2/2024'}
                            time={'13:00'}
                            // date={'Wallet Balance'}
                            title={'Pending Order'}
                            bgColor={i.serviceBG}
                            handleClick={()=>handleFindModal(i.service_type)}
                        />                        
                        )
                    }

                </div>
            </Section>


        </div>

        </>
    );
};

export default Dashboard;

export const Card = ({bgColor, TColor, iconUrl, title,tag, handleClick, date, time }) =>{
    return(
        <div style={{backgroundColor:bgColor}} className="rounded-lg p-3 space-y-4">
            <div className="w-full flex justify-between items-center">
                <div  className="flex gap-2">
                    <span style={{color:TColor}} className="text-[14px]  font-mont">{tag}</span>
                </div>
            </div>
            <h2 style={{color:TColor}} className="font-bold font-mont text-[28px]">{title}</h2>
            <p style={{color:TColor}} className="text-[14px]  font-mont">Date: {date}</p>
            <p style={{color:TColor}} className="text-[14px]  font-mont">Time: {time}</p>
            <button onClick={handleClick} className='w-full rounded-md text-white font-semibold  text-[12px] font-mont bg-[#e0090a] py-2'>Open Order</button>
        </div>
    )
}

const serviceEnum =[
    {
        service_type: 'airtime',
        service_name: 'Airtime',
        serviceBG: 'rgba(34, 34, 34, 0.2)',
        serviceTC: '#000',
        service_icon: '/images/message.png',
    },
    {
        service_type: 'internet',
        service_name: 'Internet',
        serviceBG: 'rgba(255, 95, 5, 0.2)',
        serviceTC: '#000',
        service_icon: '/images/message.png',
    },
    {
        service_type: 'cable',
        service_name: 'Cable',
        serviceBG: 'rgba(86, 204, 242, 0.3)',
        serviceTC: '#000',
        service_icon: '/images/message.png',
    },
    {
        service_type: 'electricity',
        service_name: 'Electricity',
        serviceBG: 'rgba(168, 211, 54, 0.2)',
        serviceTC: '#000',
        service_icon: '/images/message.png',
    },
    {
        service_type: 'gas',
        service_name: 'Gas',
        serviceBG: 'rgba(238, 144, 84, 0.2)',
        serviceTC: '#000',
        service_icon: '/images/message.png',
    },
    {
        service_type: 'parking',
        service_name: 'Parking',
        serviceBG: 'rgba(245, 61, 211, 0.2)',
        serviceTC: '#000',
        service_icon: '/images/message.png',
    },
    {
        service_type: 'transportation',
        service_name: 'Transportation',
        serviceBG: 'rgba(34, 34, 34, 0.2)',
        serviceTC: '#000',
        service_icon: '/images/message.png',
    },
    {
        service_type: 'football',
        service_name: 'Football',
        serviceBG: 'rgba(192, 34, 201, 0.2)',
        serviceTC: '#000',
        service_icon: '/images/message.png',
    },
    {
        service_type: 'waste',
        service_name: 'Waste',
        serviceBG: 'rgba(211, 121, 97, 0.2)',
        serviceTC: '#000',
        service_icon: '/images/message.png',
    },
    {
        service_type: 'government',
        service_name: 'Government',
        serviceBG: 'rgba(34, 34, 34, 0.2)',
        serviceTC: '#000',
        service_icon: '/images/message.png',
    },
    {
        service_type: 'housing',
        service_name: 'Housing',
        serviceBG: 'rgba(34, 34, 34, 0.2)',
        serviceTC: '#000',
        service_icon: '/images/message.png',
    },
]

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