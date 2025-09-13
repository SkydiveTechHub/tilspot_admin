import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Space, Table, Input } from 'antd';
import { CiMenuKebab } from "react-icons/ci";
import { MenuBoard, Trash } from 'iconsax-react';
import Filter from '../../common/Filter';



const TransactionsTable = ({
  columns,
  data,
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
        {hasFilter && <Filter onFilter={handleFilter} />}
      </div>

      <Table columns={ columns } dataSource={data} pagination={{ pageSize: 20, total: totalData, onChange: (page) => { handlePaginationChange(page) } }} />
    </div>
  );
};

export default TransactionsTable;
