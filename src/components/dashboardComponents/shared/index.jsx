import { useDispatch } from "react-redux"
import useForm from "../../../hooks/useForm"
import { AuthButton } from "../../shared/button"
import FormInput from "../../shared/FormInput"
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from "react-router-dom"
import { logout } from "../../../store/reducers/authSlice";
import { useSocket } from "../../../hooks/SocketContext";



export const DeactivateModal = ({children, title, openModal, handleOk, handleCancel }) => {

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Modal className='basic-modal deactive' title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex flex-col justify-center items-center gap-6 p-8 ">
            <img src="/images/deactivate.svg" alt="icon" />
            <h2 className="font-mont text-[24px] font-[500]">Deactivate {title}</h2>
            <p className="font-mont text-[14px] font-[400] text-[gray]">Are you sure you want to deactivate this {title}?</p>
            <div className="space-x-6">
                <button className="font-mont text-[16px] font-[400] bg-[#F9F9F9] rounded-lg p-[10px]">Close</button>
                <button className="font-mont text-[16px] font-[400] text-[white] bg-[#F6695E] rounded-lg p-[10px]">Deactivate</button>
            </div>            
        </div>

        {children}
      </Modal>
    </>
  );
};
export const LogoutModal = ({children, title, openModal, handleOk, handleCancel }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout= ()=>{
    dispatch(logout())
        navigate('/') 
  }

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Modal className='basic-modal deactive' title='' open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex flex-col justify-center items-center gap-6 p-8 ">
            {/* <img src="/images/deactivate.svg" alt="icon" /> */}
            <h2 className="font-mont text-[24px] font-[500]">Logout</h2>
            <p className="font-mont text-[14px] font-[400] text-[gray]">Are you sure you want to logout?</p>
            <div className="space-x-6">
                <button onClick={handleCancel} className="font-mont text-[16px] w-[150px] font-[400] bg-[#F9F9F9] rounded-lg p-[10px]">Cancel</button>
                <button onClick={()=>{handleLogout()}} className="font-mont text-[16px] w-[150px] font-[400] text-[white] bg-primary rounded-lg p-[10px]">Log Out</button>
            </div>            
        </div>

        {children}
      </Modal>
    </>
  );
};


export const searchInput = ({text})=>{
    return(
        <div className="border rounded-lg">
            <input type="text" placeholder={`Search in ${text}`} />
            <button></button>
        </div>
    )
}