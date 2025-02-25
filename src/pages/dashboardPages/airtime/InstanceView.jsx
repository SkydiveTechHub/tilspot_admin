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
import { useDispatch, useSelector } from "react-redux";
import { deleteProvider, enableOrDisableCategory, getAllCategories, getProviderByCategory } from "../../../store/actions";
import { toast } from "react-toastify";

const InstanceView = ({data, catStatus, id}) => {
  const { role } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false)
  const [provId, setProvId] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [status, setStatus] = useState('')
  const [userData, setUserData] = useState([])
  const [action, setAction] = useState('create')
  const navigate = useNavigate()
  const dispatch =  useDispatch()

  const handleDelete = async () =>{
    try {
      const res = await dispatch(deleteProvider({
        catId :id,
        providerId:provId
      }))
      if(res.payload.statusCode) {
        dispatch(getProviderByCategory(id));
        toast.success('Provider Deleted Successfully!')
        setOpenDelete(false)
      }else{
        toast.error(res.payload.message)
        setOpenDelete(false)
      }

    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
      setOpenDelete(false)
    }
  }
  const onChange = async (checked) => {
    const payload ={
      id, checked
    }
    try {
     const res = await dispatch(enableOrDisableCategory(payload))
    if (res.payload.statusCode){
      dispatch(getAllCategories())
    }else{
      toast.error('Category status could not be modified')
    }

    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
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
                setProvId(record._id)
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
              handleOk={handleDelete}

          />
          <AddAirtimeProvider
              openModal={open}
              handleCancel={()=>{setOpen(false); setAction('create')}}
              handleOk={()=>{setOpen(false); setAction('create')}}
              userData={userData}
              action={action}
              catId={id}
              provId={provId}
          /> 
              {
                    role === 'admin' && 
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                      <PryButton handleClick={()=>{setAction('create');setOpen(true)}} text={'Add Airtime Provider'}/>
                      <span className="font-mont">Enable Service: <Switch checked={catStatus} onChange={onChange} /></span>
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
      dataIndex: 'providerLogo',
      key: 'providerLogo',
      render: (text) => <img className="w-[30px]" src={text} alt="icon-img" />,
    },
    {
      title: 'Provider Name',
      dataIndex: 'name',
      key: 'name',
    },



  ];


