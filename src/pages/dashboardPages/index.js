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
import { io } from "socket.io-client";
import { useSocket } from "../../hooks/SocketContext";

const userData = JSON.parse(localStorage.getItem('userData'))
const url = process.env.REACT_APP_SOCKET_URL;


const Dashboard = () => {

    const socket = useSocket();
    const [billData, setBillsData] = useState([])
    const [currentBillData, setCurrentBillData] = useState({})
    const {role} = useSelector((state)=>state.auth)

    useEffect(() => {
      if (!socket) return;
  
      socket.on("completedBills", ({bills, date, time}) => {
        console.log(bills);
        localStorage.setItem('bills', JSON.stringify(bills))
          setBillsData(bills)
      });
  
      // Cleanup on component unmount
      return () => {
        socket.off("completedBills");
      };
    }, [socket]);


    const userData = JSON.parse(localStorage.getItem('userData'))
    // const socket = useSocket();
    useEffect(() => {
      if (role) {
  
        const userId = userData.id; 
        const userType = 'admin';
  
        if (userId) {

          socket.emit("identify", { userId, userType });
          console.log("Emitting 'identify' event with:", { userId, userType });
        } else {
          console.error("Missing userId or userType");
        }
  

        // socket.on("identify", (response) => {
        //   console.log("Identify response from server:", response);
        // });

        return () => {
          if (socket) {
            socket.off("identify");
          }
        };
      }
  

    }, []);


    // const availableBills = JSON.parse(localStorage.getItem('bills'))
    // useEffect(() => {
    //   if (availableBills) {
    //     setBillsData(availableBills)
    //   }
    // }, []);



    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [summaryData, setSummaryData] = useState()
        const [filterDuration, setFilterDuration] = useState('daily')
        const {operatorStat} = useSelector((state)=>state.staff)

    const [modalToView, setModalToView] = useState()

        const fetchOperatorRecord = async() =>{
            const params = {
                period:filterDuration,
                id: userData.id
            }
          try {
            const res = await dispatch(getOperatorRecord(params))
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
        // const fetchBills = async() =>{
        //   try {
        //     const res = await dispatch(getAllBills())
        //     console.log(res)
        //   } catch (error) {
            
        //   }
          
        // }
        useEffect(()=>{
            userData.role === 'operator'?fetchMyRecord():fetchOperatorRecord();
            
            
        },[filterDuration])



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
                            provider={currentBillData?.bill?.providerName}
                            phone={currentBillData?.bill?.providerData?.phoneNumber}
                            amount={currentBillData?.bill?.amount}
                            billId={currentBillData?.billId}
                        />,
            internet:   <PreviewInternetOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            provider={currentBillData?.bill?.providerName}
                            plan = {currentBillData?.bill?.providerData?.plan}
                            phone={currentBillData?.bill?.providerData?.accountNumber}
                            amount={currentBillData?.bill?.amount}
                            billId={currentBillData?.billId}
                        />,
            cable:   <PreviewCableOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            billId={currentBillData?.billId}
                            provider={currentBillData?.bill?.providerName}
                            acctNo={currentBillData?.bill?.providerData?.accountNumber}
                            phone={currentBillData?.bill?.providerData?.phoneNumber}
                            amount={currentBillData?.bill?.amount}
                        />,
            gas:   <PreviewGasOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            billId={currentBillData?.billId}
                            provider={currentBillData?.bill?.providerName}
                            acctNo={currentBillData?.bill?.providerData?.phoneNumber}
                            amount={currentBillData?.bill?.amount}
                        />,

            transportation:   <PreviewTransportOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            billId={currentBillData?.billId}
                            d_location={'MTN'}
                            phone={currentBillData?.bill?.providerData?.phoneNumber}
                            amount={currentBillData?.bill?.amount}
                        />,
            parking:   <PreviewParkingOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            billId={currentBillData?.billId}
                            provider={currentBillData?.bill?.providerName}
                            reg ={currentBillData?.bill?.providerData?.carRegistrationNumber}
                            duration ={currentBillData?.bill?.providerData?.duration}
                            price ={currentBillData?.bill?.providerData?.price}
                            location ={currentBillData?.bill?.providerData?.locationName}
                            zone ={currentBillData?.bill?.providerData?.zone}
                            phone={currentBillData?.bill?.providerData?.phoneNumber}
                            amount={currentBillData?.bill?.amount}
                        />,
            football:   <PreviewFootballOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            billId={currentBillData?.billId}
                            provider={currentBillData?.bill?.providerName}
                            reg ={'8882288c'}
                            phone={currentBillData?.bill?.providerData?.phoneNumber}
                            amount={currentBillData?.bill?.amount}
                        />,
            waste:   <PreviewWasteOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            billId={currentBillData?.billId}
                            provider={currentBillData?.bill?.providerName}
                            reg ={'8882288c'}
                            phone={currentBillData?.bill?.providerData?.phoneNumber}
                            amount={currentBillData?.bill?.amount}
                        />,
            government:   <PreviewGovernmentOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            billId={currentBillData?.billId}
                            provider={currentBillData?.bill?.providerName}
                            reg ={'8882288c'}
                            phone={currentBillData?.bill?.providerData?.phoneNumber}
                            amount={currentBillData?.bill?.amount}
                        />,
            housing:   <PreviewHousingOrderModal
                            openModal={open}
                            handleCancel={()=>setOpen(false)}
                            handleOk={()=>setOpen(false)}
                            billId={currentBillData?.billId}
                            provider={currentBillData?.bill?.providerName}
                            reg ={'8882288c'}
                            phone={currentBillData?.bill?.providerData?.phoneNumber}
                            amount={currentBillData?.bill?.amount}
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
            <Section title={"Pending Order"} className="overview-section">

              {
                billData.length === 0 ?<div className="flex items-center justify-center h-[200px]"> <h1 className="font-mont font-bold text-[18px]">No Pending Bills</h1> </div>:
             
              <div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {billData.map((bill, index) => {
                  const matchedService = serviceEnum.find(
                    (service) => service.service_name === bill.bill.categoryName
                  );
                  if (matchedService) {
                    return (
                      <Card
                        key={index}
                        tag={matchedService.service_name}
                        TColor={matchedService.serviceTC}
                        iconUrl={matchedService.service_icon}
                        date={bill.bill.createdAt.split('T')[0] || "N/A"} // Assuming `bill` contains a `date` key, replace "N/A" with a fallback value.
                        time={bill.bill.createdAt.split('T')[1].split('.')[0] || "N/A"} // Assuming `bill` contains a `time` key, replace "N/A" with a fallback value.
                        title={bill.bill.title || "Pending Order"} // Assuming `bill` contains a `title` key.
                        bgColor={matchedService.serviceBG}
                        handleClick={() => {handleFindModal(matchedService.service_type); setCurrentBillData(bill)}}
                      />
                    );
                  }

                  return null; // Skip items that don't have a matching service enum.
                })}
              </div>
               }
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