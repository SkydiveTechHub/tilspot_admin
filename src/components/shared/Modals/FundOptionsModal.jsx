import { Modal } from 'antd';
import React, { useState } from 'react';
import { BlackText, GrayText } from '../typograph';
import AddInstanceModal from './AddAirt';
import { AuthButton } from '../button';
import SuccessModal from './SuccessModal';
import VoucherModal from './VoucherModal';

const FundOptionsModal = ({ title, openModal, handleOk, handleCancel }) => {
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [openVoucher, setOpenVoucher] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <>
      <VoucherModal
        openModal={openVoucher}
        handleCancel={()=>setOpenVoucher(false)}
        handleOk={()=>setOpenVoucher(false)}
        handleContinue={()=>setOpenVoucher(false)}      
      />
      <SuccessModal
        openModal={secondModalOpen}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
        handleContinue={()=>setSecondModalOpen(false)}
      >
        <div className='flex justify-center items-center flex-col'>
          <BlackText
              style="font-[700] text-center"
              text="Wallet Funded Successfully"
            />
          <GrayText
              style="font-[400] text-center w-[70%]"
              text="Your wallet has been successfully funded with an additional 30 messages. Transaction completed successfully."
            />
                   
        </div>

      </SuccessModal>


      <Modal
        className="basic-modal"
        title={"Payment"}
        open={openModal}
        onOk={() => {
          handleOk();
        }}
        onCancel={() => {
          handleCancel();
        }}
      >
        <div className="w-full h-[80%] flex justify-center items-center flex-col gap-6 md:px-[2rem]">
          <GrayText
            style="font-[400] text-center"
            text="Choose your preferred payment method to finalize your transaction safely and quickly."
          />

          <div className='w-full space-y-3'>
            <SelectTab
              title="Payment with Card"
              isSelected={selectedOption === 'card'}
              handleClick={()=>setSelectedOption('card')}
              imgUrl={'/images/card.png'}
            />
            <SelectTab
              title="Payment with Bank Transfer"
              isSelected={selectedOption === 'transfer'}
              handleClick={()=>setSelectedOption('transfer')}
              imgUrl={'/images/transfer.png'}
            />
            <SelectTab
              title="Payment with Voucher"
              isSelected={selectedOption === 'voucher'}
              handleClick={()=>setSelectedOption('voucher')}
              imgUrl={'/images/voucher.png'}
            />
          </div>
 
            <AuthButton handleClick={()=>{
              if (selectedOption === 'voucher'){
                setOpenVoucher(true)
              }else{
                setSecondModalOpen(true)
              }
              
              handleCancel()
            }} 
            value={'Continue'}
            inactive={selectedOption === '' || selectedOption === null}
            />
          
        </div>
      </Modal>
    </>
  );
};

export default FundOptionsModal;


const SelectTab = ({title, isSelected, imgUrl, handleClick})=>{
  return(
      <div onClick={handleClick} className={ `font-mont p-[1px] rounded-md ${isSelected ? 'bg-gradient-to-r to-purple-500 from-blue-300':'bg-[#4F4F4F]'} `}>
        <button className='rounded-md w-full h-full p-2 bg-white flex justify-between items-center'>
          <div className='flex gap-3 items-center'>
            <img src={imgUrl} alt="" />
            <GrayText style="font-[400] text-[#4F4F4F]" text={title}/>
          </div>

          <img src={isSelected? '/images/circle-check-filled.png':'/images/circle-check-outline.png'} alt="" />
        
        </button>
      </div>   

  )
}