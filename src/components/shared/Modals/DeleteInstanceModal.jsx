import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { BlackText, GrayText } from '../typograph';
import SuccessModal from './SuccessModal';

const DeleteInstanceModal = ({children, title, openModal, handleOk, handleCancel, char,  processStatus }) => {
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    if(processStatus){
      setOpen(true);
      handleCancel()
    }
  })
  return (
    <>
      <SuccessModal
        openModal={open}
        handleCancel={()=>setOpen(false)}
        handleOk={()=>setOpen(false)}

      >
        <BlackText style={'font-bold text-[20px]'} text={`${char} Deleted Successfully`}/>
      </SuccessModal>

      <Modal className='basic-modal' title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div  className='flex justify-center items-center flex-col gap-6 px-[2rem]'>
          <img src="/images/delete-dark.png" alt="good-luck" />

          <BlackText style={'font-bold text-[20px]'} text={`Delete ${char}`}/>
          <GrayText text={'Please note, this  action can’t be undone'}/>

          <div className='flex items-center justify-between w-full'>
            <button onClick={()=>{setOpen(false); handleCancel()}} className='bg-[#fff] border border-black rounded-[8px] text-black py-[10px] px-11 text-[16px] font-[500] leading-[24px]'>Cancel</button>
            <button onClick={()=>{
              handleOk()
            }} className='bg-[#FF0000] rounded-[8px] text-white py-[10px] px-11 text-[16px] font-[500] leading-[24px]'>Delete</button>
          </div>   
        </div>
      </Modal>
    </>
  );
};
export default DeleteInstanceModal;