import React, { useEffect, useState } from "react";
import { Section } from "../../../components/shared/container/container";
import TransactionsTable from "../../../components/dashboardComponents/transactions";
import { PryButton, StatusTag } from "../../../components/shared/button";
import { FaChevronRight } from "react-icons/fa";
import AddAirtimeProvider from "../../../components/shared/Modals/Airtime/AddAirtimeProvider";
import AddElectricityProvider from "../../../components/shared/Modals/electricity/AddElectricityProvider";


const InstanceView = () => {
  const [open, setOpen] = useState(false)

return (

        <div className="space-y-6">
          <AddElectricityProvider
              openModal={open}
              handleCancel={()=>setOpen(false)}
              handleOk={()=>setOpen(false)}
          /> 
          <div className="">
            <PryButton handleClick={()=>setOpen(true)} text={'Add Electricity Provider'}/>
          </div>

            <Section title={"Available Electricity Providers"}>
                <TransactionsTable handleDelete={()=>{}} columns={columns} data={data}/>            
            </Section> 

        </div>
    );
};

export default InstanceView;

export const Card = ({bgColor, TColor, iconUrl, date, title,tag }) =>{
  return(
      <div style={{backgroundColor:bgColor}} className="min-w-[300px] rounded-lg p-3 w-full space-y-4">
          <div className="w-full flex justify-between items-center">
              <div  className="flex gap-2">
                  <img src={iconUrl} alt={title}/>
                  <span style={{color:TColor}} className="text-[14px]  font-mont">{tag}</span>
              </div>
              <FaChevronRight/>
          </div>
          <h2 style={{color:TColor}} className="font-bold font-mont text-[28px]">{title}</h2>
          <p style={{color:TColor}} className="text-[12px] font-mont">Last Updated:-{date}</p>
      </div>
  )
}

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