import { Tabs } from 'antd';
import React from 'react'
import AllUsers from './AllUsers';
import VerifiedUser from './VerifiedUser';
import UnverifiedUsers from './UnverifiedUsers';

const UsersView = () => {
  const userItems = [
    {
      label: 'All Users',
      key: 1,
      children: <AllUsers/>
    },
    {
      label: 'Verified Users',
      key: 2,
      children: <VerifiedUser/>
    },
    {
      label: 'Unverified Users',
      key: 3,
      children: <UnverifiedUsers/>
    },
  ]
  return (
    <div>
        <Tabs
          defaultActiveKey="1"
          centered
          items={userItems}
        />
    </div>
  )
}

export default UsersView