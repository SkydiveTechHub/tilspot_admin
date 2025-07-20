import React, { useEffect, useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { StatusTag } from '../../../components/shared/button'
import TransactionsTable from '../../../components/dashboardComponents/transactions'
import { Section } from '../../../components/shared/container/container'
import DeleteInstanceModal from '../../../components/shared/Modals/DeleteInstanceModal'
import { Switch } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
 
import AddParkingZone from '../../../components/shared/Modals/parking/AddParkingZone'
import AddInternetPlan from '../../../components/shared/Modals/Internet/AddInternetPlan'
import { useDispatch, useSelector } from 'react-redux'
import { createInternetPlans, deleteProvider, deleteProviderPlan, getPlansByProvider } from '../../../store/actions'
import { checkCategory } from '../../../store/reducers/providerSlice'
import { toast } from 'react-toastify'
import UpdateInternetPlan from '../../../components/shared/Modals/Internet/UpdateInternetPlan'

const PreviewInternetProvider = () => {
  const params = useParams()
  const [data, setData] = useState()
  const [tableData, setTableData] = useState([])
  const [rowData, setRowData] = useState()
  const {id} = params
  const dispatch = useDispatch()
  const [catId, setCatId] = useState('')
  const [planId, setPlanId] = useState('')
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [upgradeModal, setUpgradeModal] = useState(false)
  const [deletePlan, setDeletePlan] = useState(false)
  const { categories, internetPlans } = useSelector((state) => state.providers);
  useEffect(() => {
    if (internetPlans) {
      setTableData(internetPlans);
    }
  }, [internetPlans]);


  const usable_column = [
    ...columns,
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => {


        return (
          <div className='flex items-center gap-4'>
            <button onClick={()=>{setUpgradeModal(true); setRowData(record)}}><img src="/images/edit.svg" alt="" /></button>
            <button onClick={()=>{setDeletePlan(true); setPlanId(record?._id)}}><img src="/images/bin.png" alt="" /></button>
          </div>
        );
      },
    },
  ];

      useEffect(() => {
        if (categories) {
          const cat = categories.find((i) => i.name === 'Internet');
          setCatId(cat._id);
        } else {
          dispatch(checkCategory())
        }
      }, [categories]);

    const handleSearch = (key) => {
      if (key === '') {
        fetchProviderPlans()
      } else {
        const filterData = data.options[0].options.filter((i) => (i.name.toLowerCase()).includes(key.toLowerCase()));
        setTableData(filterData);
      }
    };

  const fetchProviderPlans = async ()=>{
    try {
      const res = await dispatch(getPlansByProvider(id))
      setData(res.payload.data)
    } catch (error) {
      
    }
  }

    const handleDelete = async () =>{
      try {
        const res = await dispatch(deleteProvider({
          catId :catId,
          providerId:id
        }))
            if(res.payload.statusCode) {
              toast.success('Provider Deleted Successfully!')
              navigate('/dashboard/internet')
              setOpen(false)
            }else{
              toast.error(res.payload.message)
              setOpen(false)
            }
        
  
      } catch (error) {
        console.log(error)
            toast.error('Something went wrong')
            setOpen(false)
      }
    }
    const handleDeletePlan = async () =>{
      try {
        const res = await dispatch(deleteProviderPlan({
          planId,
          providerId:id
        }))
            if(res.payload.statusCode) {
              fetchProviderPlans()
              toast.success('Provider Plan Deleted Successfully!')
              setDeletePlan(false)
            }else{
              toast.error(res.payload.message)
              setDeletePlan(false)
            }
        
  
      } catch (error) {
        console.log(error)
            toast.error('Something went wrong')
            setDeletePlan(false)
      }
    }

  useEffect(()=>{
    fetchProviderPlans()
  },[])
  return (
    <>
      <AddInternetPlan
        openModal={addModal}
        handleCancel={()=>setAddModal(false)}
        handleOk={()=>setAddModal(false)}
        userData={data}
        id={id}
      />
      <UpdateInternetPlan
        openModal={upgradeModal}
        handleCancel={()=>setUpgradeModal(false)}
        handleOk={()=>setUpgradeModal(false)}
        userData={rowData}
        id={id}
      />

      <DeleteInstanceModal
        openModal={open}
        char={'Internet Provider'}
        handleCancel={()=>setOpen(false)}
        handleOk={handleDelete}

    />
        <DeleteInstanceModal
        openModal={deletePlan}
        char={'Internet Plan'}
        handleCancel={()=>setDeletePlan(false)}
        handleOk={handleDeletePlan}

    />
      <div>
        <div >
          <div className='flex flex-col md:flex-row justify-between w-full'>
              <ul className='space-y-3'>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Provider Name: '}/><GrayText style={'text-[16px]'} text={data?.provider?.name}/></li>
              </ul>
              <div className='flex flex-col md:flex-row items-center  gap-4'>
                <button onClick={()=>{setAddModal(true)}} className='bg-[#219653] text-sm md:text-lg rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/add-icon.png' className='inline-flex pr-2' alt='account'/>Add Plan</button>
                <button onClick={()=>{setOpen(true)}} className='bg-[#FF0000] rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/bin-icon.png' className='inline-flex pr-2' alt='account'/>Delete Provider</button>
              </div>   
          </div>

          
        </div>

        <Section title={"Available Plans"}>
          <TransactionsTable hasSearch={true} handleSearch={handleSearch} columns={usable_column} data={tableData}/>            
        </Section> 
      </div>    
    </>

  )
}

export default PreviewInternetProvider



const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },


  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },


];


