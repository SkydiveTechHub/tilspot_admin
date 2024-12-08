import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { PryButton, StatusTag } from "../../../components/shared/button";
import { FaChevronRight } from "react-icons/fa";
import AddGovernmentProvider from "../../../components/shared/Modals/government/AddGovernmentProvider";
import { Dropdown, Menu, Space } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import AddStaffModal from "../../../components/shared/Modals/staff/AddStaffModal";
import DeleteInstanceModal from "../../../components/shared/Modals/DeleteInstanceModal";
import EditStaffModal from "../../../components/shared/Modals/staff/EditStaffModal";

const InstanceView = () => {
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [userData, setUserData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
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
              // 
              break;
            case "2":
              setUserData(record)
              setOpenEdit(true)
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
            {/* <Menu.Item key="1">View</Menu.Item> */}
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
    },
  ];


return (
        <div className="space-y-6">
          <DeleteInstanceModal
              openModal={openDelete}
              char={'Staff'}
              handleCancel={()=>setOpenDelete(false)}
              handleOk={()=>setOpenDelete(false)}

          />
          <AddStaffModal
              openModal={open}
              handleCancel={()=>setOpen(false)}
              handleOk={()=>setOpen(false)}
          /> 
          <EditStaffModal
              openModal={openEdit}
              handleCancel={()=>setOpenEdit(false)}
              handleOk={()=>setOpenEdit(false)}
              userData={userData}
          /> 
          <div className="">
            <PryButton handleClick={()=>{setOpen(true)}} text={'Add Staff'}/>
          </div>

            <Section title={"Registered Staffs"}>
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
      title: 'First Name',
      dataIndex: 'fname',
      key: 'fname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lname',
      key: 'lname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },



  ];


const data = [
    {
      key: '1',
      fname: 'Michael',
      lname: 'Shalom',
      email: 'awesome@gmail.com',
      role:'Admin'
    },
    {
      key: '2',
      fname: 'Till',
      lname: 'Shalom',
      email: 'awesome@gmail.com',
      role:'Operator'
    },
    {
      key: '3',
      fname: 'Awesome',
      lname: 'Shalom',
      email: 'awesome@gmail.com',
      role:'Operator'
    },


  ];