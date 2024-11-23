import React from 'react'
import {DoughnutChart} from '../../shared/chart';
import { DropdownButton } from '../../shared/button';

const TransactionChart = ({title, data}) => {

    const DayMenu = [
        {
            label: 'Today',
            key: '1',
        },
        {
            label: 'Yesterday',
            key: '2',
        },
        {
            label: 'All Time',
            key: '3',
        },

        ];

  return (
    <div className='flex flex-col justify-center items-center bg-white shadow-lg rounded-[12px] p-6 gap-6 w-full'>
        <div className='flex justify-between items-center w-full'>
            <p className='font-mont font-[500] text-[16px] '>{title}</p>
            <DropdownButton list={DayMenu}/> 
        </div>
        <div className='w-full flex justify-center items-center'>
            <DoughnutChart data={data}/>
        </div>
        <div className='w-full grid grid-cols-2 lg:flex justify-center gap-10 items-center'>
            {
                data?.map((i, id)=>{
                    return(
                        <div key={id}>
                            <div className='flex items-center gap-2 '>
                                <div style={{border: `3px solid ${i.color}`}} className='h-[12px] w-[12px] rounded-full '></div>
                                <p className='font-[400] font-mont text-[12px]'>{i.title}</p>
                            </div>
                            <div className='pl-6'>
                               <p className='font-[600] font-mont text-[14px]'>{i.value}</p> 
                            </div>
                            
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default TransactionChart