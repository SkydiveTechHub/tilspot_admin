import { Modal } from 'antd';
import React, { useState } from 'react'
import { PlansData } from '../../../utils/data';
import { PlansCard2 } from '../../static/home/plans/PlansCard';
import ConfirmModal from './ConfirmModal';
import { BlackText, GrayText } from '../typograph';
import { AuthButton } from '../button';
import BasicModal from './BasicModal';
import FundWalletModal from './FundWalletModal';
import SuccessModal from './SuccessModal';
import { useNavigate } from 'react-router-dom';

const SelectPlanModal = ({children, title, openModal, handleOk, handleCancel }) => {
    const [selectedTab, setSelectedTab] = useState('')
    const [secondModalOpen, setSecondModalOpen] = useState(false);
    const [insufficientModalOpen, setInsufficientModalOpen] = useState(false);
    const [fundModalOpen, setFundModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const router = useNavigate()
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
            router.push('/instances')
        }}
        >
        

            <div className='w-full flex flex-col justify-center items-center'>
                    <BlackText style={'font-[600] text-[16px]'} text={'Instance Added Successfully'}/>
                    <p className={`font-mont text-[#475569] text-center`}> Congratulations your instance  <GrayText style={' text-center font-bold inline'} text={`ESQ `}/>has been added successfully. It’s now fully active and ready for use. Explore all the features and benefits available to you.</p> 
                    
                </div>
      
      
      </SuccessModal>


      <ConfirmModal
        title={'Complete Transaction'}
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
        <p className={`font-mont text-[#475569] text-center`}> Please note that for this process to be completed <GrayText style={' text-center font-bold inline'} text={`NGN ${amount} `}/>will be deducted from your wallet for the selected plan.</p> 
              
        
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
                    <GrayText style={'md:w-[70%] text-center'} text={'Your transaction cannot be completed due to low balance. Please fund your wallet to proceed'}/>
                    
                </div>

                <AuthButton handleClick={()=>{
                        setFundModalOpen(true)
                        setInsufficientModalOpen(false)
                        }} 
                        value={'Fund Wallet'}
                        />
                


            </div>
        </BasicModal>




        <Modal className='basic-modal basic-modal-extra' title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
            <div className='w-full flex flex-col justify-center items-center gap-8'>
                <div className='flex flex-col justify-center items-center'>
                    <BlackText style={'font-[600] text-[18px]'} text={'Select the Best Plan for You'}/>
                    <GrayText className='text-center' text={'Choose the plan that suits your needs and budget. Start enjoying a tailored experience today'}/>
                </div>
                <div className=' flex lg:grid gap-4 grid-cols-5 overflow-x-auto w-full py-4'>
                    {
                        PlansData?.map((i, id)=>
                            <PlansCard2
                            key={id}
                                isSelected={selectedTab === i.slug}
                                handleClick={()=>{
                                    setSelectedTab(i.slug)
                                    setAmount(Number(i.price))
                                }}
                                planAmount={i.price}
                                planFeatures={i.features}
                                planName={i.name}
                                tagged={i.tagged}
                            />
                        )
                    }
                </div> 

                <div className='w-full md:w-[60%]'>
                    <AuthButton handleClick={()=>{
                        setSecondModalOpen(true)
                        handleCancel()
                        }} 
                        value={'Continue'}
                        inactive={selectedTab === '' || selectedTab === null}
                        />
                </div>

            </div>

        </Modal>
      </>
    );
  };

export default SelectPlanModal
