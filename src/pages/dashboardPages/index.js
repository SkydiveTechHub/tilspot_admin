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


const Dashboard = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [modalToView, setModalToView] = useState()
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

            <Section title={"Pending Order"} className="overview-section" >
                <div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {
                        serviceEnum.map((i, id)=>
                        <Card
                            tag={i.service_name}
                            TColor={i.serviceTC}
                            iconUrl={i.service_icon}
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

export const Card = ({bgColor, TColor, iconUrl, date, title,tag, handleClick }) =>{
    return(
        <div style={{backgroundColor:bgColor}} className="rounded-lg p-3 space-y-4">
            <div className="w-full flex justify-between items-center">
                <div  className="flex gap-2">
                    <span style={{color:TColor}} className="text-[14px]  font-mont">{tag}</span>
                </div>
            </div>
            <h2 style={{color:TColor}} className="font-bold font-mont text-[28px]">{title}</h2>
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

