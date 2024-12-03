import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { PryButton, StatusTag } from "../../../components/shared/button";
import { FaChevronRight } from "react-icons/fa";
import AddAirtimeProvider from "../../../components/shared/Modals/Airtime/AddAirtimeProvider";

import { Dropdown, Menu, Space } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAccordion } from "@material-tailwind/react";
import DeleteInstanceModal from "../../../components/shared/Modals/DeleteInstanceModal";

const InstanceView = () => {
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
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
              navigate("");
              break;
            case "2":
              // Handle edit action
              break;
            case "3":
              // Handle enable action
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
          <DeleteInstanceModal
              openModal={open}
              char={'Airtime Provider'}
              handleCancel={()=>setOpen(false)}
              handleOk={()=>setOpen(false)}

          />
          <AddAirtimeProvider
              openModal={open}
              handleCancel={()=>setOpen(false)}
              handleOk={()=>setOpen(false)}
          /> 
          <div className="">
            <PryButton handleClick={()=>setOpen(true)} text={'Add Airtime Provider'}/>
          </div>

            <Section title={"Available Airtime Providers"}>
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
      title: 'Provider ID',
      dataIndex: 'tranx_id',
      key: 'tranx_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'type',
      key: 'type',
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
      type: 'MTN',
      tranx_means: 'Bank Transfer',
      date: '24 Jan, 2023',
      tags: ['Enabled'],
    },
    {
    //   key: '1',
      tranx_id: '31366633',
      type: 'Glo',
      tranx_means: 'Bank Transfer',
      date: '24 Jan, 2023',
      tags: ['Disabled'],
    },


  ];