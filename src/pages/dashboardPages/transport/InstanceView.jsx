import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { PryButton, StatusTag } from "../../../components/shared/button";
import { FaChevronRight } from "react-icons/fa";
import AddInternetProvider from "../../../components/shared/Modals/Internet/AddInternetProvider";
import AddTransportProvider from "../../../components/shared/Modals/Transport/AddTransportProvider";
import { Dropdown, Menu, Space, Switch } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import DeleteInstanceModal from "../../../components/shared/Modals/DeleteInstanceModal";
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
        },
        ]
      : []),

  ];


return (

        <div className="space-y-6">
          <DeleteInstanceModal
              openModal={openDelete}
              char={'Transport Provider'}
              handleCancel={()=>setOpenDelete(false)}
              handleOk={()=>setOpenDelete(false)}

          />
          <AddTransportProvider
              openModal={open}
              handleCancel={()=>setOpen(false)}
              handleOk={()=>setOpen(false)}
              userData={userData}
              action={action}
          /> 
          {
            role === 'admin'&&
            <div className="flex justify-between items-center">
              <PryButton handleClick={()=>{setAction('create');setOpen(true)}} text={'Add Transport Route'}/>
              <span className="font-mont">Enable Service: <Switch/></span>
            </div>            
          }
          <div className="">
            
          </div>

            <Section title={"Available Transport Routes"}>
                <TransactionsTable  columns={usable_column} data={data}/>            
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
      title: 'Departure Location',
      dataIndex: 'departure',
      key: 'departure',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Departure Time',
      dataIndex: 'd_time',
      key: 'd_time',
    },
    {
      title: 'Arrival Time',
      dataIndex: 'a_time',
      key: 'a_time',
    },

    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },


  ];


const data = [
    {
    //   key: '1',
      departure: 'Lagos',
      destination: 'Abuja',
      d_time: '9:00',
      a_time: '12:00',
      price: '1000',
    },

  ];