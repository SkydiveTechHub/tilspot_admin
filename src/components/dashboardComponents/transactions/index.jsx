import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Space, Table, Input } from 'antd';
import { CiMenuKebab } from "react-icons/ci";
import { MenuBoard, Trash } from 'iconsax-react';
import Filter from '../../common/Filter';
import { formatReadableDate } from '../../../utils/methods';



const TransactionsTable = ({
  columns,
  data,
  filterDate,
  hasFilter,
  hasSearch,
  totalData = 0,
  handleSearch = () => {},
  handleFilter = () => {},
  handleView = () => {},
  handlePaginationChange = (page) => {},
}) => {
  const { Search } = Input;
  const onSearch = (value, _e, info) =>{
    handleSearch(value)
  }
    ;

  return (
    <div className='overflow-x-scroll lg:overflow-x-hidden p-3 rounded-lg bg-white border w-full'>
      <div className="w-full flex justify-between items-center mb-4">
        {hasSearch && (
          <Search
            placeholder="Search Result"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        )}
        <div></div>
        {hasFilter && 
        <div className='flex items-center gap-2'>
          <span className='text-[12px] font-mont'>{formatReadableDate(filterDate?.start)} - {formatReadableDate(filterDate?.end)}</span>
          <Filter onFilter={handleFilter} />
        </div>
        }
      </div>

      <Table columns={ columns } dataSource={data} pagination={{ pageSize: 20, total: totalData, onChange: (page) => { handlePaginationChange(page) } }} />
    </div>
  );
};

export default TransactionsTable;
