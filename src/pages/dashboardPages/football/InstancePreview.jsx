import React, { useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { StatusTag } from '../../../components/shared/button'
import TransactionsTable from '../../../components/dashboardComponents/transactions'
import { Section } from '../../../components/shared/container/container'
import DeleteInstanceModal from '../../../components/shared/Modals/DeleteInstanceModal'
import { Switch } from 'antd'
import { useNavigate } from 'react-router-dom'
import AddFootballTicketProvider from '../../../components/shared/Modals/football/AddFootballProvider'

const PreviewFootballMatches = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [upgradeModal, setUpgradeModal] = useState(false)
  return (
    <>
      <AddFootballTicketProvider
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
          <div className='flex justify-between items-start w-full'>
              <ul className='space-y-3'>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'League Name:'}/><GrayText style={'text-[16px]'} text={'Champions League'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Home Team:'}/><GrayText style={'text-[16px]'} text={'Real Madrid'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Away Team:'}/><GrayText style={'text-[16px]'} text={'Chelsea'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Stadium:'}/><GrayText style={'text-[16px]'} text={'Old traford'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Date & Time:'}/><GrayText style={'text-[16px]'} text={'10/12/2202 - 10:00 GMT'}/></li>
              </ul>
              <div className='flex items-center  gap-4'>
                <button onClick={()=>{setUpgradeModal(true)}} className='bg-[#219653] rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/add-icon.png' className='inline-flex pr-2' alt='account'/>Edit Match</button>
                <button onClick={()=>{setOpen(true)}} className='bg-[#FF0000] rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/bin-icon.png' className='inline-flex pr-2' alt='account'/>Delete Match</button>
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

export default PreviewFootballMatches



const columns = [
  {
    title: 'Seat Area',
    dataIndex: 'seat',
    key: 'seat',
  },
  {
    title: 'Price Per Ticket',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Description',
    dataIndex: 'desc',
    key: 'desc',
  },
];

const data = [
  {
  //   key: '1',
    seat: 'Top seat',
    price: '100',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aut provident libero odio magnam',

  },


];