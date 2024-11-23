import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Space, Table } from 'antd';
import { EyeFilled, MoreOutlined } from '@ant-design/icons';
import { Trash } from 'iconsax-react';

const TransactionsTable = ({ columns, data, actionMenu, noAction, handleDelete, handleView }) => {

  const usable_column =  [
    ...columns,
    {
      title: 'ACTION',
      key: 'action',
      render: (_, record) => {

        return (
            <div className=' flex gap-4'>
              {
                handleView && <button onClick={handleView}><img src="/images/eyes.png" alt="" /></button>
              }
              {
                handleDelete && <button onClick={handleDelete}><img src="/images/bin.png" alt="" /></button>
              }
              
            </div>
        );
      },
    },
  ];





  


  return (
    <div className='overflow-x-scroll lg:overflow-x-hidden'>
      <Table columns={noAction ? columns :usable_column} dataSource={data} />
    </div>
  );
};

export default TransactionsTable;
