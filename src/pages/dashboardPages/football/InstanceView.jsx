import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { PryButton, StatusTag } from "../../../components/shared/button";
import { FaChevronRight } from "react-icons/fa";
import AddFootballTicketProvider from "../../../components/shared/Modals/football/AddFootballProvider";
import { Dropdown, Menu, Space, Switch } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMatch, enableOrDisableCategory, getAllCategories } from "../../../store/actions";
import DeleteInstanceModal from "../../../components/shared/Modals/DeleteInstanceModal";

const role = localStorage.getItem('role')
const InstanceView = ({data, catStatus, id, p_Id}) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
    const [provId, setProvId] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [status, setStatus] = useState('')
  const [userData, setUserData] = useState([])
  const [action, setAction] = useState('create')
  const dispatch =  useDispatch()

  console.log(data)

  const handleDelete = async () =>{
    try {
      const res = await dispatch(deleteMatch(provId))
      

    } catch (error) {
      console.log(error)
    }
  }
  const onChange = async (checked) => {
    const payload ={
      id, checked
    }
    try {
      await dispatch(enableOrDisableCategory(payload)).then(
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
              navigate(`/dashboard/preview-football/${record.providerId}-${record._id}`);
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
                  setProvId(record._id)
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
          <DeleteInstanceModal
              openModal={openDelete}
              char={'Match'}
              handleCancel={()=>setOpenDelete(false)}
              handleOk={handleDelete}

          />
          <AddFootballTicketProvider
              openModal={open}
              handleCancel={()=>{setOpen(false); setAction('create')}}
              handleOk={()=>{setOpen(false); setAction('create')}}
              action={action}
              catId={id}
              provId={p_Id}
              userData={userData}
          /> 
          {
            role === 'admin'&&
            <div className="flex justify-between items-center">
              <PryButton handleClick={()=>setOpen(true)} text={'Add Football Match'}/>
               <span className="font-mont">Enable Service: <Switch checked={catStatus} onChange={onChange} /></span>
            </div>            
          }


            <Section title={"Available Football Matches"}>
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

// teams: 'homeTeam - awayTeam'

const columns = [
    {
      title: 'League Name',
      dataIndex: 'league',
      key: 'league',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Teams',
      dataIndex: 'teams',
      key: 'teams',
    },
    {
      title: 'Stadium',
      dataIndex: 'stadium',
      key: 'stadium',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Date',
      dataIndex: 'dateTime',
      key: 'dateTime',
      render: (text) => <p>{text.split('T')[0]}</p>,
    },

  ];


const data = [
    {
      key: '1',
      name: 'Champions League',
      teams: 'Real Madrid - Chelsea',
      stadium: 'Old Traford',
      date: '24 Jan, 2023',
    },

  ];