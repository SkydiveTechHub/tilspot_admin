import React, { useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { StatusTag } from '../../../components/shared/button'
import TransactionsTable from '../../../components/dashboardComponents/transactions'
import { Section } from '../../../components/shared/container/container'
import DeleteInstanceModal from '../../../components/shared/Modals/DeleteInstanceModal'
import { Switch } from 'antd'
import { useNavigate } from 'react-router-dom'
 
import AddParkingZone from '../../../components/shared/Modals/parking/AddParkingZone'
import AddInternetPlan from '../../../components/shared/Modals/Internet/AddInternetPlan'

const PreviewInternetProvider = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [upgradeModal, setUpgradeModal] = useState(false)

  const usable_column = [
    ...columns,
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => {


        return (
          <div className='flex items-center gap-4'>
            <button><img src="/images/edit.svg" alt="" /></button>
            <button><img src="/images/bin.png" alt="" /></button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <AddInternetPlan
        openModal={upgradeModal}
        handleCancel={()=>setUpgradeModal(false)}
        handleOk={()=>setUpgradeModal(false)}

      />
      <DeleteInstanceModal
        openModal={open}
        char={'Internet Provider'}
        handleCancel={()=>setOpen(false)}
        handleOk={()=>setOpen(false)}

    />
      <div>
        <div >
          <div className='flex justify-between w-full'>
              <ul className='space-y-3'>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Location Name: '}/><GrayText style={'text-[16px]'} text={'New York'}/></li>
              </ul>
              <div className='flex items-center  gap-4'>
                <button onClick={()=>{setUpgradeModal(true)}} className='bg-[#219653] rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/add-icon.png' className='inline-flex pr-2' alt='account'/>Add Plan</button>
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
    dataIndex: 'tranx_id',
    key: 'tranx_id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Duration',
    dataIndex: 'type',
    key: 'type',
  },

  {
    title: 'Duration',
    dataIndex: 'date',
    key: 'date',
  },

  {
    title: 'Price',
    dataIndex: 'type',
    key: 'type',
  },


];


const data = [
  {
  //   key: '1',
    tranx_id: '#31366633',
    type: 'Nifemi',
    tranx_means: 'Free Plan',
    date: '24 Jan, 2023',
    tags: ['Enabled'],
  },


];