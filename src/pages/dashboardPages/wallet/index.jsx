import { Breadcrumb, Menu, Tag } from 'antd'
import React, { useState } from 'react'
import TransactionsTable from '../../../components/dashboardComponents/transactions'
import { Section } from '../../../components/shared/container/container'
import { DropdownButton, StatusTag } from '../../../components/shared/button'

import { Card } from '..'
import FundWalletModal from '../../../components/shared/Modals/FundWalletModal'

const Wallet = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Function to open the drawer
    const openDrawer = () => {
      setIsDrawerOpen(true);
    };
  
    // Function to close the drawer
    const closeDrawer = () => {
      setIsDrawerOpen(false);
    };


  return (
    <>
    <FundWalletModal
      openModal={open}
      handleCancel={()=>setOpen(false)}
      handleOk={()=>setOpen(false)}

    />

        <div className='flex gap-6 lg:grid grid-cols-3 overflow-x-scroll '>
            <div style={{backgroundColor:'rgba(255, 95, 5, 0.2)'}} className=" min-w-[300px] rounded-lg p-3 w-full space-y-4">
              <div className="w-full flex justify-between items-center">
                  <div  className="flex gap-2">
                      <img src={'/images/w1.png'} alt={'title'}/>
                      <span className="text-[14px]  font-mont">Available Amount</span>
                  </div>
              </div>
              <h2 style={{color:'#FF5F05'}} className="font-bold font-mont text-[28px]">{'10'}</h2>
              <button onClick={()=>setOpen(true)} className='w-full rounded-md text-white font-semibold  text-[12px] font-mont bg-[#814747] py-2'>Fund Wallet</button>
            </div>
            <Card
              tag={'Messages Available'}
              TColor={'#fff'}
              iconUrl={'/images/w2.png'}
              date={''}
              title={'10'}
              bgColor={'black'}

          />
        </div>

        <Section title={"Transaction History"}>
            <TransactionsTable columns={usable_column} data={data}/>            
        </Section>    
    </>

  )
}

export default Wallet


const tabs = ['All',  'Successful', 'Pending', 'Failed']
const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'tranx_id',
      key: 'tranx_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Transaction Means',
      dataIndex: 'tranx_means',
      key: 'tranx_means',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'tags', // Fixing the property name
      render: (_, { tags }) => (
        <>
            <StatusTag status={tags}/>
        </>
      ),
    },


  ];


const data = [
    {
    //   key: '1',
      tranx_id: '31366633',
      type: 'Fund Added',
      tranx_means: 'Bank Transfer',
      date: '24 Jan, 2023',
      tags: ['Successful'],
    },
    {
    //   key: '1',
      tranx_id: '31366633',
      type: 'Fund Added',
      tranx_means: 'Bank Transfer',
      date: '24 Jan, 2023',
      tags: ['Failed'],
    },
    {
    //   key: '1',
      tranx_id: '31366633',
      type: 'Fund Added',
      tranx_means: 'Bank Transfer',
      date: '24 Jan, 2023',
      tags: ['Pending'],
    },
    {
    //   key: '1',
      tranx_id: '31366633',
      type: 'Fund Added',
      tranx_means: 'Bank Transfer',
      date: '24 Jan, 2023',
      tags: ['Successful'],
    },

  ];