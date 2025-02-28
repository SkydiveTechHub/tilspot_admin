import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactionsByCategory } from '../../../../store/actions'
import { toast } from 'react-toastify'
import { Section } from '../../../../components/shared/container/container'
import TransactionsTable from '../../../../components/dashboardComponents/transactions'
import { Satellite } from '@mui/icons-material'

const AdminTransactions = () => {
    const dispatch = useDispatch()
    const {transactions} = useSelector((state)=>state.staff)

    const fetchTransactionByCategory = async()=>{
        try {
            const res = await dispatch(getTransactionsByCategory())
            console.log(res)
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    useEffect(()=>{
        fetchTransactionByCategory()
    },[])



    const usable_column = [
        ...columns,
        // ...(role === 'admin'
        //   ? [
        // {
        //   title: "ACTION",
        //   key: "action",
        //   render: (_, record) => {
        //     const handleMenuClick = (e) => {
        //       const { key } = e;
        //       switch (key) {
        //         case "1":
        //           navigate(`/dashboard/parking-location/${record._id}`);
        //           break;
        //           case "2":
        //             setAction('edit')
        //             setOpen(true)
        //             setUserData(record)
        //             break;
        //           case "3":
        //             setOpenStatus(true)
        //             setStatus(record.tags[0])
        //             break;
        //           case "4":
        //               setOpenDelete(true)
        //               setProvId(record._id)
        //           break;
        //         default:
        //           break;
        //       }
        //     };
    
        //     const menu = (
        //       <Menu onClick={handleMenuClick}>
        //         <Menu.Item key="1">View</Menu.Item>
        //         <Menu.Item key="2">Edit</Menu.Item>
        //         {/* <Menu.Item key="3">Enable</Menu.Item> */}
        //         <Menu.Item key="4">Delete</Menu.Item>
        //       </Menu>
        //     );
    
        //     return (
        //       <Dropdown overlay={menu} trigger={['click']}>
        //         <Space>
        //           <CiMenuKebab />
        //         </Space>
        //       </Dropdown>
        //     );
        //   },
        // }]:[]),
      ];
  return (
    <div>
        
        <Section title={"Available Parking Locations"}>
                <TransactionsTable columns={usable_column} data={transactions}/>            
            </Section> 
    </div>
  )
}

export default AdminTransactions


const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },



  ];
