import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { PryButton, StatusTag } from "../../../components/shared/button";
import { FaChevronRight } from "react-icons/fa";
import AddParkingProvider from "../../../components/shared/Modals/parking/AddParkingProvider";
import { Dropdown, Menu, Space, Switch } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import DeleteInstanceModal from "../../../components/shared/Modals/DeleteInstanceModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteLocation, deleteProvider, enableOrDisableCategory, getAllCategories, getLocations } from "../../../store/actions";
import { toast } from "react-toastify";

const InstanceView = ({data, catStatus, id}) => {
  const { role } = useSelector((state) => state.auth);
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
      const res = await dispatch(deleteLocation(provId))
      if(res.payload.statusCode) {
        dispatch(getLocations());
        toast.success('Location Deleted Successfully!')
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
              navigate(`/dashboard/parking-location/${record._id}`);
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
          <AddParkingProvider
              openModal={open}
              handleCancel={()=>setOpen(false)}
              handleOk={()=>setOpen(false)}
              userData={userData}
              action={action}
          /> 
          <DeleteInstanceModal
              openModal={openDelete}
              char={'Parking Location'}
              handleCancel={()=>setOpenDelete(false)}
              handleOk={handleDelete}

          />
          {
            role === 'admin'&&
            <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
              <PryButton handleClick={()=>{setAction('create');setOpen(true)}} text={'Add Parking Location'}/>
             <span className="font-mont">Enable Service: <Switch checked={catStatus} onChange={onChange} /></span>
            </div>            
          }


            <Section title={"Available Parking Locations"}>
            <TransactionsTable hasSearch={true}  handleSearch={handleSearch} columns={usable_column} data={tableData}/>           
            </Section> 

        </div>
    );
};

export default InstanceView;


const columns = [

  {
    title: 'Location Name',
    dataIndex: 'name',
    key: 'name',
  },



];

