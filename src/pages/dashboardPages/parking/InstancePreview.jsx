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
  const [deleteZone, setDeleteZone] = useState(false)
  const [upgradeModal, setUpgradeModal] = useState(false)

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
      <DeleteInstanceModal
        openModal={deleteZone}
        char={'Parking Zone'}
        handleCancel={()=>setDeleteZone(false)}
        handleOk={()=>setDeleteZone(false)}

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
          <TransactionsTable columns={usable_column} data={data} />            
        </Section> 
      </div>    
    </>

  )
}

export default PreviewParkingLocation



const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Pricing',
    dataIndex: 'pricing',
    key: 'pricing',
  },



];


const data = [
  {
  //   key: '1',
    name: 'LA',
    pricing: 'Pricing',
  },


];