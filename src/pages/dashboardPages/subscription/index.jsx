import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { FaChevronRight } from "react-icons/fa";
import { StatusTag } from "../../../components/shared/button";
import { ConfirmationNumber } from "@mui/icons-material";
import ConfirmModal from "../../../components/shared/Modals/ConfirmModal";
import { BlackText, GrayText } from "../../../components/shared/typograph";
import SuccessModal from "../../../components/shared/Modals/SuccessModal";
import { useNavigate } from "react-router-dom";
import PlnaUpgradeModal from "../../../components/shared/Modals/PlanUpgradeModal";


const SubscriptionPage = () => {
  const [open, setOpen] = useState(false)
  const [upgradeModal, setUpgradeModal] = useState(false)
  const [openCancel, setOpenCancel] = useState(false)
  const navigate = useNavigate()
    return (
    <>
      <PlnaUpgradeModal
        openModal={upgradeModal}
        handleCancel={()=>setUpgradeModal(false)}
        handleOk={()=>setUpgradeModal(false)}

      />
      <SuccessModal
        openModal={openCancel}
        handleCancel={()=>setOpenCancel(false)}
        handleOk={()=>setOpenCancel(false)}
        handleContinue={()=>{
          setOpenCancel(false)
          navigator('/dashboard')
        }}
      >
        <BlackText style={'font-bold text-center text-[20px]'} text={'Subscription Cancelled '}/>
      </SuccessModal>
      <ConfirmModal
        title={'Confirmation'}
        openModal={open}
        proceedText={'Yes, Cancel'}
        returnText={'No, Go back'}
        handleCancel={()=>setOpen(false)}
        handleOk={()=>setOpen(false)}
        handleProceed={()=>{
          setOpen(false)
          setOpenCancel(true)
        }}
        handleReturn={()=>setOpen(false)}
      >
        <div>
          <GrayText style={'text-center'} text='Are you sure you want to cancel this subscription?'/>
        </div>
      </ConfirmModal>


        <div className="space-y-6">

            <Section title={"Overview"} className="overview-section" >
                <div className="flex gap-6 overflow-x-scroll ">
                    <SubCard
                        tag={'Wallet Balance'}
                        TColor={'#000'}
                        iconUrl={'Wallet Balance'}
                        date={'Wallet Balance'}
                        title={'100'}
                        style={'bg-[#407BFF]'}
                        handleUpgrade={()=>setUpgradeModal(true)}
                        handleCancel={()=>setOpen(true)}

                    />
                    <SubCard
                        tag={'Current Plan'}
                        TColor={'#15B607'}
                        iconUrl={'Wallet Balance'}
                        date={'Wallet Balance'}
                        title={'Premium Plan'}
                        style={'bg-gradient-to-r to-purple-500 from-blue-300'}
                        handleUpgrade={()=>setUpgradeModal(true)}
                        handleCancel={()=>setOpen(true)}
                    />
                    <SubCard
                        tag={'Wallet Balance'}
                        TColor={'#FF5F05'}
                        iconUrl={'Wallet Balance'}
                        date={'Wallet Balance'}
                        title={'100'}
                        style={'bg-gradient-to-r to-purple-500 from-blue-300'}
                        handleUpgrade={()=>setUpgradeModal(true)}
                        handleCancel={()=>setOpen(true)}
                    />
                </div>
            </Section>

            <Section title={"Subscription History"}>
                <TransactionsTable columns={columns} data={data} handleView={()=>navigate('/dashboard/preview-instance')}/>            
            </Section> 

        </div>      
      </>

    );
};

export default SubscriptionPage;
















export const SubCard = ({style, TColor, iconUrl, date, title,tag, handleUpgrade, handleCancel }) =>{
    return(
        <div className={`${style} min-w-[350px] rounded-lg p-3 w-full space-y-4`}>
            <div className="w-full flex justify-between items-center">
                <div  className="flex gap-2">
                    <img src='/images/upgrade-icon.png' alt={title}/>
                </div>
                <span className='text-primary text-[10px] py-1 px-2 rounded-full bg-[white] font-mont'>Active</span>
            </div>
            <div>
              <span  className=" text-white font-medium font-mont text-[20px] block">{title}</span>
              <span className="text-[12px] text-white font-mont block ">Last Updated:-{date}</span>
            </div>


            <div className='flex items-center justify-between w-full'>
              <button onClick={handleUpgrade} style={{color:TColor}} className='font-mont rounded-[8px] bg-white py-[5px] px-11 text-[16px] font-[500] leading-[24px]'>Upgrade</button>
              <button onClick={handleCancel} className='font-mont bg-transparent border border-white rounded-[8px] text-white py-[5px] px-11 text-[16px] font-[500] leading-[24px]'>Cancel</button>
          </div>     
        </div>
    )
}


const columns = [
    {
      title: 'Subscription plan',
      dataIndex: 'tranx_id',
      key: 'tranx_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Instance Name',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Expiry date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'tags', // Fixing the property name
      render: (_, { tags }) => (
        <>
            <StatusTag status={tags}/>
        </>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'tranx_means',
      key: 'tranx_means',
      render: (text) => <a>{text}</a>,
    },




  ];


const data = [
    {
    //   key: '1',
      tranx_id: 'Standard Plan',
      type: 'ESQ',
      tranx_means: 'N20,000',
      date: '20 - Oct - 2024',
      tags: ['Active'],
    },
    





  ];