import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { PryButton, StatusTag } from "../../../components/shared/button";
import { FaChevronRight } from "react-icons/fa";
import AddGovernmentProvider from "../../../components/shared/Modals/government/AddGovernmentProvider";
import { Dropdown, Menu, Space } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const InstanceView = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const usable_column = [
    ...columns,
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => {
        const handleMenuClick = (e) => {
          const { key } = e;
          switch (key) {
            case "1":
              navigate("/dashboard/parking-location");
              break;
            case "2":
              // Handle edit action
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
            <Menu.Item key="3">Enable</Menu.Item>
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
    },
  ];


return (

        <div className="space-y-6">
          <AddGovernmentProvider
              openModal={open}
              handleCancel={()=>setOpen(false)}
              handleOk={()=>setOpen(false)}
          /> 
          <div className="">
            <PryButton handleClick={()=>setOpen(true)} text={'Add Government Provider'}/>
          </div>

            <Section title={"Available Government Providers"}>
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
      title: 'Transaction ID',
      dataIndex: 'tranx_id',
      key: 'tranx_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Transaction Means',
      dataIndex: 'tranx_means',
      key: 'tranx_means',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'tags', // Fixing the property name
      render: (_, { tags }) => (
        <>
            <StatusTag status={tags}/>
        </>
      ),
    },


  ];


const data = [
    {
    //   key: '1',
      tranx_id: '31366633',
      type: 'Fund Added',
      tranx_means: 'Bank Transfer',
      date: '24 Jan, 2023',
      tags: ['Successful'],
    },
    {
    //   key: '1',
      tranx_id: '31366633',
      type: 'Fund Added',
      tranx_means: 'Bank Transfer',
      date: '24 Jan, 2023',
      tags: ['Failed'],
    },
    {
    //   key: '1',
      tranx_id: '31366633',
      type: 'Fund Added',
      tranx_means: 'Bank Transfer',
      date: '24 Jan, 2023',
      tags: ['Pending'],
    },
    {
    //   key: '1',
      tranx_id: '31366633',
      type: 'Fund Added',
      tranx_means: 'Bank Transfer',
      date: '24 Jan, 2023',
      tags: ['Successful'],
    },

  ];