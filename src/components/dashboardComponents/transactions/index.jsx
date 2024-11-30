import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Space, Table } from 'antd';
import { CiMenuKebab } from "react-icons/ci";
import { MenuBoard, Trash } from 'iconsax-react';


const TransactionsTable = ({ columns, data, actionMenu, noAction, handleEdit, handleDelete, handleView }) => {


  return (
    <div className='overflow-x-scroll lg:overflow-x-hidden'>
      <Table columns={ columns } dataSource={data} />
    </div>
  );
};

export default TransactionsTable;
