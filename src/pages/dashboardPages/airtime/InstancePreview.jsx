import React, { useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { StatusTag } from '../../../components/shared/button'
import TransactionsTable from '../../../components/dashboardComponents/transactions'
import { Section } from '../../../components/shared/container/container'
import DeleteInstanceModal from '../../../components/shared/Modals/DeleteInstanceModal'
import { Switch } from 'antd'
import { useNavigate } from 'react-router-dom'
import PlnaUpgradeModal from '../../../components/shared/Modals/PlanUpgradeModal'

const InstancePreview = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [upgradeModal, setUpgradeModal] = useState(false)
  return (
    <>
      <PlnaUpgradeModal
        openModal={upgradeModal}
        handleCancel={()=>setUpgradeModal(false)}
        handleOk={()=>setUpgradeModal(false)}

      />
      <DeleteInstanceModal
        openModal={open}
        handleCancel={()=>setOpen(false)}
        handleOk={()=>setOpen(false)}

    />
      <div>
        <div >
          <div className='flex justify-between w-full'>
              <ul className='space-y-3'>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Instance Name:'}/><GrayText style={'text-[16px]'} text={'Nitty Gritty'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Registered Phone no:'}/><GrayText style={'text-[16px]'} text={'03936463473'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Subscription Plan:'}/><GrayText style={'text-[16px]'} text={'Free Plan'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Status:'}/><GrayText style={'text-[16px]'} text={'Enabled'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Instance Activation:'}/><GrayText style={'text-[16px]'} text={'Nitty Gritty'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Allocated messages :'}/><GrayText style={'text-[16px]'} text={'100'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Created date:'}/><GrayText style={'text-[16px]'} text={'10th September, 2020'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Expiry date:'}/><GrayText style={'text-[16px]'} text={'2th September, 2020'}/></li>
              </ul>
              <img src="/images/phone.png" alt="" />
          </div>
          <div className='w-full py-[3rem]'>
              <div className='mx-auto flex items-center justify-between w-full md:w-[50%]'>
                <button onClick={()=>{setUpgradeModal(true)}} className='bg-[#219653] rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/add-icon.png' className='inline-flex pr-2' alt='account'/>Upgrade Plan</button>
                <button onClick={()=>{setOpen(true)}} className='bg-[#FF0000] rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/bin-icon.png' className='inline-flex pr-2' alt='account'/>Delete Instance</button>
              </div>     
          </div>
          
        </div>

        <Section title={"Transaction History"}>
          <TransactionsTable columns={columns} data={data} handleView={()=>navigate('/dashboard/preview-instance')}/>            
        </Section> 
      </div>    
    </>

  )
}

export default InstancePreview



const columns = [
  {
    title: 'INSTANCE ID',
    dataIndex: 'tranx_id',
    key: 'tranx_id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'NAME',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'STATUS',
    key: 'status',
    dataIndex: 'tags', // Fixing the property name
    render: (_, { tags }) => (
      <>
          <StatusTag status={tags}/>
      </>
    ),
  },

  {
    title: 'SUBSCRIPTION PLAN',
    dataIndex: 'tranx_means',
    key: 'tranx_means',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'EXPIRY DATE',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'ACTIVATION',
    dataIndex: 'date',
    key: 'date',
    render: (_, { tags }) => (
      <>
          <Switch/>
      </>
    ),
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