import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTransactions, getTransactionsByCategory } from '../../../../store/actions'
import { toast } from 'react-toastify'
import { Section } from '../../../../components/shared/container/container'
import TransactionsTable from '../../../../components/dashboardComponents/transactions'
import { Satellite } from '@mui/icons-material'
import { Button, Dropdown } from 'antd'
import { Label } from '../../../../components/shared/typograph'
import { checkCategory } from '../../../../store/reducers/providerSlice'

const AdminTransactions = () => {
    const dispatch = useDispatch()
    const {transactions} = useSelector((state)=>state.staff)
    const [filterType, setFilterType] = useState('All')
    const [filterOptionList, setFilterOptionList] = useState([])
    const [filterOption, setFilterOption] = useState('All')
    const { providers, categories } = useSelector((state) => state.providers);
    const {staffs} = useSelector((state)=>state.staff)

    const fetchTransaction = async()=>{
        try {
            const res = await dispatch(getAllTransactions())
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const fetchTransactionByFilter = async(a, b)=>{
      const payload={
        type:a,
        query:b
      }
        try {
          
            const res = await dispatch(getTransactionsByCategory(payload))
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    useEffect(()=>{
        fetchTransaction()
    },[])


    useEffect(() => {
      const baseOptions = [];
    
      if (filterType === 'Category') {
        if (categories && categories.length > 0) {
          console.log(categories);
          const categoryOptions = categories.map((i, id) => ({
            key: `${id + 2}`, 
            label: <button onClick={() => setFilterOption(i._id)}>{i.name}</button>,
          }));
    
          setFilterOptionList([...baseOptions, ...categoryOptions]);
        } else {
          dispatch(checkCategory());
        }
      } else if(filterType === 'Status'){
        const items = [
          {
            key: '1',
            label: (
              <button onClick={()=>(setFilterOption('Approved'))} >
                Approved
              </button>
            ),
          },
          {
            key: '2',
            label: (
              <button onClick={()=>(setFilterOption('Rejected'))} >
                Rejected
              </button>
            ),
          },
          {
            key: '3',
            label: (
              <button onClick={()=>(setFilterOption('Pending'))} >
                Pending
              </button>
            ),
          },
        ]

        setFilterOptionList([...baseOptions, ...items]);
      }else {
        setFilterOptionList(baseOptions);
      }
    }, [filterType, categories, dispatch]);

    useEffect(()=>{
      fetchTransactionByFilter(filterType, filterOption)
    },[filterOption])
    
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


      const items = [
        {
          key: '1',
          label: (
            <button onClick={()=>(setFilterType('All'))} >
              All
            </button>
          ),
        },

        {
          key: '2',
          label: (
            <button onClick={()=>(setFilterType('Category'))} >
              Category
            </button>
          ),
        },
        {
          key: '3',
          label: (
            <button onClick={()=>(setFilterType('Provider'))} >
              Provider
            </button>
          ),
        },
        {
          key: '4',
          label: (
            <button onClick={()=>(setFilterType('Operator'))} >
              Operator
            </button>
          ),
        },
        {
          key: '5',
          label: (
            <button onClick={()=>(setFilterType('Status'))} >
              Status
            </button>
          ),
        },


      ];

  return (
    <div>
        
        <Section title={""}>
          <div className='grid grid-cols-3 gap-6 mb-6'>
            <div className='flex flex-col'>
              <Label text={'Filter Type'}/>
                <Dropdown
                    menu={{
                        items,
                        }}
                        placement="bottomRight"
                    >
                        <Button><span className="font-mont font-semibold">{filterType}</span></Button>
                </Dropdown>              
            </div>
            {
              filterType !== 'All' &&
              <div className='flex flex-col'>
                <Label text={'Filter Options'}/>
                  <Dropdown
                      menu={{
                          items:filterOptionList,
                          }}
                          placement="bottomRight"
                      >
                          <Button><span className="font-mont font-semibold">{filterOption}</span></Button>
                  </Dropdown>              
              </div>
            }



          </div>

          <TransactionsTable columns={usable_column} data={transactions}/>            
        </Section> 
    </div>
  )
}

export default AdminTransactions


const columns = [
    {
      title: 'Category',
      dataIndex: 'billInfo',
      key: 'billInfo',
      render: (record) => <p>{record?.categoryInfo?.name}</p>
    },
    {
      title: 'Provider',
      dataIndex: 'billInfo',
      key: 'billInfo',
      render: (record) => <p>{record?.providerInfo?.name}</p>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'billInfo',
      key: 'billInfo',
      render: (record) => <p>{record?.createdAt.split("T")[0]}</p>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },



  ];
