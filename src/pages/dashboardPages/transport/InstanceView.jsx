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
import { useDispatch, useSelector } from "react-redux";
import { enableOrDisableCategory, getAllCategories } from "../../../store/actions";

const InstanceView = ({data, catStatus, id, ppId}) => {
  const { role } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false)
  const [provId, setProvId] = useState('ppId')
  const [openDelete, setOpenDelete] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [status, setStatus] = useState('')
  const [userData, setUserData] = useState([])
  const [action, setAction] = useState('create')
  const navigate = useNavigate()
  const dispatch =  useDispatch()

    const handleDelete = async () =>{
      try {
        // const res = await dispatch(deleteProvider({
        //   catId :id,
        //   providerId:provId
        // }))
        
  
      } catch (error) {
        console.log(error)
      }
    }
    const onChange = async (checked) => {
      try {
        await dispatch(enableOrDisableCategory(id)).then(
          dispatch(getAllCategories())
        )
  
      } catch (error) {
        console.log(error)
      }
    };

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
              handleOk={handleDelete}

          />
          <AddTransportProvider
              openModal={open}
              handleCancel={()=>{setOpen(false); setAction('create')}}
              handleOk={()=>{setOpen(false); setAction('create')}}
              userData={userData}
              action={action}
              catId={id}
              provId={provId}
          /> 
          {
            role === 'admin'&&
            <div className="flex justify-between items-center">
              <PryButton handleClick={()=>{setAction('create');setOpen(true)}} text={'Add Transport Route'}/>
              <span className="font-mont">Enable Service: <Switch checked={catStatus} onChange={onChange} /></span>
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
      dataIndex: 'start',
      key: 'start',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Departure Time',
      dataIndex: 'departureTime',
      key: 'departureTime',
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
    },

    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },


  ];


