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
import { useDispatch } from 'react-redux'
import { createInternetPlans, getPlansByProvider } from '../../../store/actions'

const PreviewInternetProvider = () => {
  const params = useParams()
  const {id} = params
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [upgradeModal, setUpgradeModal] = useState(false)
  const [deleteZone, setDeleteZone] = useState(false)
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


  const fetchProviderPlans = async ()=>{
    try {
      const res = dispatch(getPlansByProvider(id))
      console.log(res)
    } catch (error) {
      
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
        handleOk={()=>setOpen(false)}

    />
          <DeleteInstanceModal
        openModal={deleteZone}
        char={'Internet Plan'}
        handleCancel={()=>setDeleteZone(false)}
        handleOk={()=>setDeleteZone(false)}

    />
      <div>
        <div >
          <div className='flex flex-col md:flex-row justify-between w-full'>
              <ul className='space-y-3'>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Location Name: '}/><GrayText style={'text-[16px]'} text={'New York'}/></li>
              </ul>
              <div className='flex items-center  gap-4'>
                <button onClick={()=>{setUpgradeModal(true)}} className='bg-[#219653] text-sm md:text-lg rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/add-icon.png' className='inline-flex pr-2' alt='account'/>Add Plan</button>
                <button onClick={()=>{setOpen(true)}} className='bg-[#FF0000] rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/bin-icon.png' className='inline-flex pr-2' alt='account'/>Delete Provider</button>
              </div>   
          </div>

          
        </div>

        <Section title={"Available Plans"}>
          <TransactionsTable columns={usable_column} data={data}/>            
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


const data = [
  {
  //   key: '1',
    name: 'Long Sub',
    duration: '30days',
    price: '1000',
  },


];