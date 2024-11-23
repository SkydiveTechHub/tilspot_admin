import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { BlackText, GrayText } from '../typograph';
import SuccessModal from './SuccessModal';
import { PlansCard1 } from '../../static/home/plans/PlansCard';
import { PlansData } from '../../../utils/data';
import FundWalletModal from './FundWalletModal';
import ConfirmModal from './ConfirmModal';
import BasicModal from './BasicModal';
import { AuthButton } from '../button';
import { useNavigate } from 'react-router-dom';

const PlnaUpgradeModal = ({children, title, openModal, handleOk, handleCancel }) => {
  const [open, setOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState('')
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [insufficientModalOpen, setInsufficientModalOpen] = useState(false);
  const [fundModalOpen, setFundModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')
  let balance = 1000

  return (
    <>
    <FundWalletModal
            openModal={fundModalOpen}
            handleCancel={()=>setFundModalOpen(false)}
            handleOk={()=>setFundModalOpen(false)}
    />

    <SuccessModal
      openModal={successModalOpen}
      handleCancel={()=>setSuccessModalOpen(false)}
      handleOk={()=>setSuccessModalOpen(false)}
      handleContinue={()=>{
          setSuccessModalOpen(false)
          navigate('/instances')
      }}
      >
      

          <div className='w-full flex flex-col justify-center items-center'>
                  <BlackText style={'font-[600] text-[16px]'} text={'Upgrade Successful'}/>
                  <p className={`font-mont text-[#475569] text-center`}> Your subscription has been upgraded from  
                    <GrayText style={' text-center font-bold inline'} text={` Basic plan `}/>
                    to
                    <GrayText style={' text-center font-bold inline'} text={` Premium plan`}/>
                    . Enjoy the new features and benefits of your plan.</p> 
                  
              </div>
    
    </SuccessModal>


    <ConfirmModal
      title={'Confirmation'}
      openModal={secondModalOpen}
      handleCancel={()=>setSecondModalOpen(false)}
      handleOk={()=>setSecondModalOpen(false)}
      proceedText={'Proceed'}
      returnText={'Cancel'}
      handleProceed={()=>{
          if(amount > balance){
              setInsufficientModalOpen(true)
              setSecondModalOpen(false)
          }else{
              setSuccessModalOpen(true)
              setSecondModalOpen(false)
          }
      }}
    >
      <div className=' '>
      <p className={`font-mont text-[#475569] text-center`}> Please note that for this process to be completed <GrayText style={' text-center font-bold inline'} text={`NGN ${amount} `}/>will be deducted from your wallet for the plan upgrade.</p> 
            
      
      </div>
      
    </ConfirmModal>

      {/* insufficient func */}

      <BasicModal
          openModal={insufficientModalOpen}
          handleCancel={()=>setInsufficientModalOpen(false)}
          handleOk={()=>setInsufficientModalOpen(false)}
      >
          <div className='w-full flex flex-col justify-center items-center gap-8'>
              <img src="/images/warning.png" alt="" />
              <div className='w-full flex flex-col justify-center items-center'>
                  <BlackText style={'font-[600] text-[16px]'} text={'Insufficent Funds'}/>
                  <GrayText style={'w-[70%] text-center'} text={'Your transaction cannot be completed due to low balance. Please fund your wallet to proceed'}/>
                  
              </div>

              <AuthButton handleClick={()=>{
                      setFundModalOpen(true)
                      setInsufficientModalOpen(false)
                      }} 
                      value={'Fund Wallet'}
                      />
              


          </div>
      </BasicModal>
      <SuccessModal
        openModal={open}
        handleCancel={()=>setOpen(false)}
        handleOk={()=>setOpen(false)}

      >
        <BlackText style={'font-bold text-[20px]'} text={'Instance Deleted Successfully'}/>
      </SuccessModal>

      <Modal className='basic-modal basic-modal-extra' title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div  className='flex justify-center items-center flex-col gap-6 px-[2rem] space-y-6'>

          <div className='flex flex-col justify-center items-center'>
            <BlackText style={'font-bold text-[20px]'} text={'Upgrade to Unlock Premium Features'}/>
            <GrayText text={'Select the plan that best suits your needs and enjoy a tailored experience with enhanced perks'}/> 
          </div>

          <div>
            <div className={`relative bg-gradient-to-r to-purple-500 from-blue-300 min-w-[350px] rounded-lg p-3 w-full space-y-4`}>

                <div className='bg-white p-1 absolute top-0 left-3 px-3 rounded-b-lg'><span className='font-mont text-[12px] text-transparent bg-clip-text bg-gradient-to-r font-bold to-purple-500 from-blue-300'>Current Plan</span></div>

                <div className="w-full flex justify-between items-center">
                    <div  className="flex gap-2">
                        <img src='/images/upgrade-icon.png' alt={'card'}/>
                    </div>
                    <span className='text-primary text-[10px] py-1 px-2 rounded-full bg-[white] font-mont'>Active</span>
                </div>
                <div>
                  <span  className=" text-white font-medium font-mont text-[20px] block">Premium Plan</span>
                  <span className="text-[12px] text-white font-mont block ">Next billing date:- 10/10/2024</span>
                </div>    
            </div>            
          </div>



          <div className='grid gap-3 md:gap-3 overflow-x-auto lg:grid-cols-4 '>
                    {
                        PlansData?.map((i, id)=>
                          (<>
                              {
                              (!i.tagged)?
                              <PlansCard1
                                key={id}
                                    planAmount={i.price}
                                    planFeatures={i.features}
                                    planName={i.name}
                                    tagged={i.tagged}
                                    handleClick= {()=>{
                                      setSecondModalOpen(true)
                                      setAmount(i.price)
                                      handleCancel()
                                    }}
                                />:
                                null
                            }
                          </>)
                        
                            
                        )
                    }
            </div>


        </div>
      </Modal>
    </>
  );
};
export default PlnaUpgradeModal;