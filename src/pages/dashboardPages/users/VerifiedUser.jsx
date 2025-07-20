import React, { useEffect } from 'react'
import TransactionsTable from '../../../components/dashboardComponents/transactions'
import { useDispatch } from 'react-redux';
import { getAllUsers, getAllVerifiedUsers } from '../../../store/actions';

const VerifiedUsers = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [usable_column, setUsableColumn] = React.useState(columns);

  const fetchAllVerifiedUsers = async () => {
    try {
      const response = await dispatch(getAllVerifiedUsers());
        setTableData(response.payload);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };



  const handleSearch = (key) => {
     ;
    if (key === '') {
      setTableData(data);
    } else {
      const filterData = data.filter((i) => (i.name.toLowerCase()).includes(key.toLowerCase()));
      setTableData(filterData);
    }
  };

  useEffect(() => {
    fetchAllVerifiedUsers();
  }, []);    
        
  return (
    <div>
      <TransactionsTable hasSearch={true} handleDelete={()=>{}} handleSearch={handleSearch} columns={usable_column} data={tableData}/>
    </div>
  )
}

export default VerifiedUsers


const columns = [
  {
    title: '',
    dataIndex: 'profileImage',
    key: 'profileImage',
    render: (text) => <img className="w-[30px]" src={text} alt="icon-img" />,
  },
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
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Loyalty Points',
      dataIndex: 'loyaltyPoints',
      key: 'loyaltyPoints',
    },
  ];

