import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { PryButton, StatusTag } from "../../../components/shared/button";
import { FaChevronRight } from "react-icons/fa";
import AddAirtimeProvider from "../../../components/shared/Modals/Airtime/AddAirtimeProvider";

import { Dropdown, Menu, Space, Switch } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAccordion } from "@material-tailwind/react";
import DeleteInstanceModal from "../../../components/shared/Modals/DeleteInstanceModal";
import ConfirmModal from "../../../components/shared/Modals/ConfirmModal";

const role = localStorage.getItem('role')
const InstanceView = () => {
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [status, setStatus] = useState('')
  const [userData, setUserData] = useState([])
  const [action, setAction] = useState('create')
  const navigate = useNavigate()

  const usable_column = [
    ...columns,
    ...(role === 'admin'
      ? [
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => {
        const handleMenuClick = (e) => {
          const { key } = e;
          switch (key) {
            case "1":
              navigate("");
              break;
            case "2":
              setAction('edit')
              setOpen(true)
              setUserData(record)
              break;
            case "3":
              setOpenStatus(true)
              setStatus(record.tags[0])
              break;
            case "4":
                setOpenDelete(true)
              break;
            default:
              break;
          }
        };

        const menu = (
          <Menu onClick={handleMenuClick}>
            {/* <Menu.Item key="1">View</Menu.Item> */}
            <Menu.Item key="2">Edit</Menu.Item>
            {/* <Menu.Item key="3">{record.tags[0] === 'Enabled'?'Disable':'Enable'}</Menu.Item> */}
            <Menu.Item key="4">Delete</Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <Space>
              <CiMenuKebab />
            </Space>
          </Dropdown>
        );
      },
    }]:[]),
  ];

return (

        <div className="space-y-6">
          <ConfirmModal
              openModal={openStatus}
              title={status === 'Enabled'?'Disable Provider':'Enable Provider'}
              handleCancel={()=>setOpenStatus(false)}
              handleProceed={()=>setOpenStatus(false)}
              handleReturn={()=>setOpenStatus(false)}
              handleOk={()=>setOpenStatus(false)}  
              proceedText={status === 'Enabled'?'Disable':'Enable'}
              returnText={'Cancel'}        
          >
            <span>Are you sure you want to Enable this Provider?</span>

          </ConfirmModal>
          <DeleteInstanceModal
              openModal={openDelete}
              char={'Airtime Provider'}
              handleCancel={()=>setOpenDelete(false)}
              handleOk={()=>setOpenDelete(false)}

          />
          <AddAirtimeProvider
              openModal={open}
              handleCancel={()=>setOpen(false)}
              handleOk={()=>setOpen(false)}
              userData={userData}
              action={action}
          /> 
              {
                    role === 'admin' && 
                    <div className="flex justify-between items-center w-fll">
                      <PryButton handleClick={()=>{setAction('create');setOpen(true)}} text={'Add Airtime Provider'}/>
                      <span className="font-mont">Enable Service: <Switch /></span>
                    </div>
                  }


            <Section title={"Available Airtime Providers"}>
                <TransactionsTable handleDelete={()=>{}} columns={usable_column} data={data}/>            
            </Section> 

        </div>
    );
};

export default InstanceView;

const columns = [
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      render: (text) => <img src={text} alt="icon-img" />,
    },
    {
      title: 'Provider Name',
      dataIndex: 'name',
      key: 'name',
    },



  ];


const data = [
    {
      key: '1',
      name: 'MTN',
      icon: '/images/mtn.png',
    },
    {
      key: '2',
      name: 'Airtel',
      icon: '/images/airtel.png',
    },


  ];