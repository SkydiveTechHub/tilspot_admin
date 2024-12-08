import React, { useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { StatusTag } from '../../../components/shared/button'
import TransactionsTable from '../../../components/dashboardComponents/transactions'
import { Section } from '../../../components/shared/container/container'
import DeleteInstanceModal from '../../../components/shared/Modals/DeleteInstanceModal'
import { Switch } from 'antd'
import { useNavigate } from 'react-router-dom'
 
import AddParkingZone from '../../../components/shared/Modals/parking/AddParkingZone'

const PreviewParkingLocation = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [upgradeModal, setUpgradeModal] = useState(false)
  return (
    <>
      <AddParkingZone
        openModal={upgradeModal}
        handleCancel={()=>setUpgradeModal(false)}
        handleOk={()=>setUpgradeModal(false)}

      />
      <DeleteInstanceModal
        openModal={open}
        char={'Parking Location'}
        handleCancel={()=>setOpen(false)}
        handleOk={()=>setOpen(false)}

    />
      <div>
        <div >
          <div className='flex justify-between w-full'>
              <ul className='space-y-3'>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Location Name:'}/><GrayText style={'text-[16px]'} text={'New York'}/></li>
              </ul>
              <div className='flex items-center  gap-4'>
                <button onClick={()=>{setUpgradeModal(true)}} className='bg-[#219653] rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/add-icon.png' className='inline-flex pr-2' alt='account'/>Add Zone</button>
                <button onClick={()=>{setOpen(true)}} className='bg-[#FF0000] rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/bin-icon.png' className='inline-flex pr-2' alt='account'/>Delete Location</button>
              </div>   
          </div>

          
        </div>

        <Section title={"Available Zones"}>
          <TransactionsTable columns={columns} data={data} handleView={()=>navigate('/dashboard/preview-instance')}/>            
        </Section> 
      </div>    
    </>

  )
}

export default PreviewParkingLocation



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