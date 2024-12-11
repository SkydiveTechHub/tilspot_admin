import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { PryButton, StatusTag } from "../../../components/shared/button";
import { FaChevronRight } from "react-icons/fa";
import AddInternetProvider from "../../../components/shared/Modals/Internet/AddInternetProvider";
import { Dropdown, Menu, Space, Switch } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const role = localStorage.getItem('role')
const InstanceView = () => {
  const [open, setOpen] = useState(false)
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
              navigate("/dashboard/preview-internet");
              break;
            case "2":
              setOpen(true)
              break;
            case "3":
              // Handle enable action
              break;
            case "4":
              // Handle delete action
              break;
            default:
              break;
          }
        };

        const menu = (
          <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">View</Menu.Item>
            <Menu.Item key="2">Edit</Menu.Item>
            {/* <Menu.Item key="3">Enable</Menu.Item> */}
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
          <AddInternetProvider
              openModal={open}
              handleCancel={()=>setOpen(false)}
              handleOk={()=>setOpen(false)}
          /> 

          {
            role === 'admin'&&
            <div className="flex justify-between items-center">
              <PryButton handleClick={()=>setOpen(true)} text={'Add Internet Provider'}/>
              <span className="font-mont">Enable Service: <Switch/></span>
            </div>            
          }


            <Section title={"Available Internet Providers"}>
                <TransactionsTable handleDelete={()=>{}} columns={usable_column} data={data}/>            
            </Section> 

        </div>
    );
};

export default InstanceView;

export const Card = ({bgColor, TColor, iconUrl, date, title,tag }) =>{
  return(
      <div style={{backgroundColor:bgColor}} className="min-w-[300px] rounded-lg p-3 w-full space-y-4">
          <div className="w-full flex justify-between items-center">
              <div  className="flex gap-2">
                  <img src={iconUrl} alt={title}/>
                  <span style={{color:TColor}} className="text-[14px]  font-mont">{tag}</span>
              </div>
              <FaChevronRight/>
          </div>
          <h2 style={{color:TColor}} className="font-bold font-mont text-[28px]">{title}</h2>
          <p style={{color:TColor}} className="text-[12px] font-mont">Last Updated:-{date}</p>
      </div>
  )
}

const columns = [
    {
      title: 'Icon',
      dataIndex: 'tranx_id',
      key: 'tranx_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Provider Name',
      dataIndex: 'type',
      key: 'type',
    },




  ];


const data = [
    {
    //   key: '1',
      tranx_id: '/images/mtn.png',
      type: 'MTN',
      // tranx_means: 'Bank Transfer',
     
    },

  ];