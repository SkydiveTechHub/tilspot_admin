import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal } from 'antd';
import { getOperatorPeriodicRecord } from '../../../store/actions';
import { useDispatch } from 'react-redux';

const StatisticsModal = ({totalRevenue, totalOrder, totalCompleted, totalFailed, title, staffId, openModal, handleOk, handleCancel, handleContinue }) => {
  const dispatch = useDispatch()

  const [filterDuration, setFilterDuration] = useState('today')
  const [hasRecord, setHasRecord] = useState(false)
  const [summaryData, setSummary] = useState({})

  const fetchRecord = async () => {
    const params = {
        adminId:staffId,
        period: filterDuration
      }
    try {
      if(staffId){
        let res =  await dispatch(getOperatorPeriodicRecord(params)) 
        if (res?.payload?.responseData.length > 0){
          setHasRecord(true)
         setSummary(res?.payload?.responseData[0])
        }else{
          setHasRecord(false)
        }    
      }


    } catch (error) {
      
    }
  };

  useEffect(()=>{
    fetchRecord()
  }, [filterDuration, staffId])


  const cardData = [
    {
      title:'Total Revenue Generated',
      amount: summaryData?.totalAmount || 0,
      icon:'/images/f1.svg'
    },	
    {
      title:'Total Order Processed',
      amount:summaryData?.processedCount || 0,
      icon:'/images/f2.svg'
    },	
    {
      title:'Total Completed Orders',
      amount:summaryData?.approvedCount || 0,
      icon:'/images/f3.svg'
    },	
    {
      title:'Total Failed Orders',
      amount:summaryData?.rejectedCount || 0, 
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
        <button onClick={()=>(setFilterDuration('currentWeek'))} >
          This Week
        </button>
      ),
    },
    {
      key: '3',
      label: (
        <button onClick={()=>(setFilterDuration('currentMonth'))} >
          This Month
        </button>
      ),
    },

  ];
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Modal className='basic-modal' title={`${title}'s Performance Overview`} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div  className='flex justify-center items-center flex-col gap-6 px-[2rem]'>
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

          {
            hasRecord?
              <div className="grid grid-cols-2 gap-4 container ">
                            {
                            cardData.map((i, id)=>{
                                return(
                                <PointCard key={id} title={i.title} amount={i.amount} icon={i.icon} />
                                )
                            })
                            }
                </div>:

                <h2 className='text-center'>No Record Found</h2>


          }

          <button onClick={() => {
            handleContinue()
            handleCancel()
            }} className='w-full rounded-md text-white font-semibold  text-[12px] font-mont bg-[#e0090a] py-2'>Continue</button>
        </div>
      </Modal>
    </>
  );
};
export default StatisticsModal;

 const PointCard = ({title, amount , icon}) =>{
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