import React from 'react'
import { useSelector } from 'react-redux';
import AdminTransactions from './AdminTranx';
import OperatorTransactions from './OperatorTranx';

const TransactionsPage = () => {
    const { role } = useSelector((state) => state.auth);
  return (
    <div>{role === 'admin' ? <AdminTransactions/> : <OperatorTransactions/>}</div>
  )
}

export default TransactionsPage