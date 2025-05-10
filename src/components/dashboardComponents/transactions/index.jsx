import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Space, Table, Input } from 'antd';
import { CiMenuKebab } from "react-icons/ci";
import { MenuBoard, Trash } from 'iconsax-react';
import Filter from '../../common/Filter';



const TransactionsTable = ({ columns, data, hasFilter, hasSearch, handleSearch, handleFilter, handleView }) => {
  const { Search } = Input;

  const onSearch = (value, _e, info) =>
    console.log(info === null || info === void 0 ? void 0 : info.source, value);

  return (
    <div className='overflow-x-scroll lg:overflow-x-hidden'>
      <div className='w-full justify-between items-center'>
        {
          hasSearch && <Search placeholder="input search text" onSearch={handleSearch} style={{ width: 200 }} />
        }
        {
          hasFilter && <Filter onFilter={handleFilter}/>
        }
        
      </div>
      <Table columns={ columns } dataSource={data} />
    </div>
  );
};

export default TransactionsTable;
