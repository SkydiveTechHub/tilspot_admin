import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { PryButton, StatusTag } from "../../../components/shared/button";
import { FaChevronRight } from "react-icons/fa";
import AddHousingProvider from "../../../components/shared/Modals/housing/AddHousingProvider";
import { Dropdown, Menu, Space, Switch } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import DeleteInstanceModal from "../../../components/shared/Modals/DeleteInstanceModal";
import { useDispatch } from "react-redux";
import { deleteProvider, enableOrDisableCategory, getAllCategories, getProviderByCategory } from "../../../store/actions";
import { toast } from "react-toastify";

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
      const [tableData, setTableData] = useState(data)
    
        useEffect(()=>{
          setTableData(data)
        },[data])
        
      const handleSearch = (key)=>{
         
        if(key === ''){
          setTableData(data)
        }else{
          const filterData = data.filter((i)=>(i.name.toLowerCase()).includes(key.toLowerCase())
        )
          setTableData(filterData)
        }
      }

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
          <DeleteInstanceModal
              openModal={openDelete}
              char={'Housing Provider'}
              handleCancel={()=>setOpenDelete(false)}
              handleOk={handleDelete}

          />
          <AddHousingProvider
              openModal={open}
              handleCancel={()=>{setOpen(false); setAction('create')}}
              handleOk={()=>{setOpen(false); setAction('create')}}
              catId={id}
              action={action}
              userData={userData}
              provId={provId}
          /> 

{
            role === 'admin' &&
            <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
              <PryButton handleClick={()=>setOpen(true)} text={'Add Housing Provider'}/>
            <span className="font-mont">Enable Service: <Switch checked={catStatus} onChange={onChange} /></span>
            </div>            
          }


            <Section title={"Available Housing Providers"}>
                <TransactionsTable hasSearch={true} handleDelete={()=>{}} handleSearch={handleSearch} columns={usable_column} data={tableData}/>         
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