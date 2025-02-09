import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { PryButton, StatusTag } from "../../../components/shared/button";
import { FaChevronRight } from "react-icons/fa";
import AddInternetProvider from "../../../components/shared/Modals/Internet/AddInternetProvider";
import { Dropdown, Menu, Space, Switch } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteInstanceModal from "../../../components/shared/Modals/DeleteInstanceModal";
import { deleteProvider, enableOrDisableCategory, getAllCategories, getProviderByCategory } from "../../../store/actions";

const role = localStorage.getItem('role')
const InstanceView = ({data, catStatus, id}) => {
  const [open, setOpen] = useState(false)
  const [provId, setProvId] = useState(false)
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
              setOpenDelete(false)
            }
      

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
              navigate(`/dashboard/preview-internet/${record._id}`);
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
          <AddInternetProvider
              openModal={open}
              handleCancel={()=>setOpen(false)}
              handleOk={()=>setOpen(false)}
              userData={userData}
              action={action}
              catId={id}
              provId={provId}
          /> 
          <DeleteInstanceModal
              openModal={openDelete}
              char={'Airtime Provider'}
              handleCancel={()=>setOpenDelete(false)}
              handleOk={handleDelete}

          />

          {
            role === 'admin'&&
            <div className="flex justify-between items-center">
              <PryButton handleClick={()=>setOpen(true)} text={'Add Internet Provider'}/>
               <span className="font-mont">Enable Service: <Switch checked={catStatus} onChange={onChange} /></span>
            </div>            
          }


            <Section title={"Available Internet Providers"}>
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

