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
import { createInternetPlans, deleteProvider, getPlansByProvider } from '../../../store/actions'
import { checkCategory } from '../../../store/reducers/providerSlice'

const PreviewInternetProvider = () => {
  const params = useParams()
  const [data, setData] = useState()
  const {id} = params
  const dispatch = useDispatch()
  const [catId, setCatId] = useState('')
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [upgradeModal, setUpgradeModal] = useState(false)
  const [deleteZone, setDeleteZone] = useState(false)
  const { categories } = useSelector((state) => state.providers);
  const usable_column = [
    ...columns,
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => {


        return (
          <div className='flex items-center gap-4'>
            <button onClick={()=>setUpgradeModal(true)}><img src="/images/edit.svg" alt="" /></button>
            <button onClick={()=>setDeleteZone(true)}><img src="/images/bin.png" alt="" /></button>
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


  const fetchProviderPlans = async ()=>{
    try {
      const res = await dispatch(getPlansByProvider(id))
      console.log(res)
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
        
  
      } catch (error) {
        console.log(error)
      }
    }
    const handleDeletePlan = async () =>{
      try {
        const res = await dispatch(deleteProvider({
          catId :catId,
          providerId:id
        }))
        
  
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(()=>{
    fetchProviderPlans()
  },[])
  return (
    <>
      <AddInternetPlan
        openModal={upgradeModal}
        handleCancel={()=>setUpgradeModal(false)}
        handleOk={()=>setUpgradeModal(false)}
        id={id}
      />
      <DeleteInstanceModal
        openModal={open}
        char={'Internet Provider'}
        handleCancel={()=>setOpen(false)}
        handleOk={handleDelete}

    />
          <DeleteInstanceModal
        openModal={deleteZone}
        char={'Internet Plan'}
        handleCancel={()=>setDeleteZone(false)}
        handleOk={handleDeletePlan}

    />
      <div>
        <div >
          <div className='flex flex-col md:flex-row justify-between w-full'>
              <ul className='space-y-3'>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Provider Name: '}/><GrayText style={'text-[16px]'} text={data?.provider?.name}/></li>
              </ul>
              <div className='flex flex-col md:flex-row items-center  gap-4'>
                <button onClick={()=>{setUpgradeModal(true)}} className='bg-[#219653] text-sm md:text-lg rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/add-icon.png' className='inline-flex pr-2' alt='account'/>Add Plan</button>
                <button onClick={()=>{setOpen(true)}} className='bg-[#FF0000] rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/bin-icon.png' className='inline-flex pr-2' alt='account'/>Delete Provider</button>
              </div>   
          </div>

          
        </div>

        <Section title={"Available Plans"}>
          <TransactionsTable columns={usable_column} data={data?.options[0]?.options}/>            
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


