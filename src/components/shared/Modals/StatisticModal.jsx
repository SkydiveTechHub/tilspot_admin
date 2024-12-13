import React, { useState } from 'react';
import { Button, Dropdown, Modal } from 'antd';

const StatisticsModal = ({totalRevenue, totalOrder, totalCompleted, totalFailed, title, openModal, handleOk, handleCancel, handleContinue }) => {
      const [filterDuration, setFilterDuration] = useState('week')
  const cardData = [
    {
      title:'Total Revenue Generated',
      amount: totalRevenue || 0,
      icon:'/images/f1.svg'
    },	
    {
      title:'Total Order Processed',
      amount:totalOrder || 0,
      icon:'/images/f2.svg'
    },	
    {
      title:'Total Completed Orders',
      amount:totalCompleted || 0,
      icon:'/images/f3.svg'
    },	
    {
      title:'Total Failed Orders',
      amount: totalFailed || 0, 
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

          <div className="grid grid-cols-2 gap-4 container ">
                            {
                            cardData.map((i, id)=>{
                                return(
                                <PointCard key={id} title={i.title} amount={i.amount} icon={i.icon} />
                                )
                            })
                            }
                        </div>

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