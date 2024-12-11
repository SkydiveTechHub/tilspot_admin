import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { PryButton, StatusTag } from "../../../components/shared/button";
import { FaChevronRight } from "react-icons/fa";
import AddGovernmentProvider from "../../../components/shared/Modals/government/AddGovernmentProvider";
import { Dropdown, Menu, Space, Switch } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

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
          <AddGovernmentProvider
              openModal={open}
              handleCancel={()=>setOpen(false)}
              handleOk={()=>setOpen(false)}
          /> 
          {
            role === 'admin'&&
            <div className="flex justify-between items-center">
              <PryButton handleClick={()=>setOpen(true)} text={'Add Government Service'}/>
              <span className="font-mont">Enable Service: <Switch/></span>
            </div>            
          }
          <div className="">
            
          </div>

            <Section title={"Available Government Services"}>
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