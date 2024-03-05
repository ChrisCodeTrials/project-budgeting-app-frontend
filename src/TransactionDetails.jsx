import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { convertDate } from './App'
import "../css/transDetail.css"

function TransactionDetails() {
    const { id } = useParams()
    const [transactionDetail, setTransactionDetail] = useState()

    
    useEffect(() => {
        fetch(`http://localhost:3003/api/transactions/${id}`)
        .then((res) => res.json())
        .then((data) => setTransactionDetail(data.transaction));
    }, [id]);
  
    if(!transactionDetail) return null 
  return (
    <div className="transaction-details-container">
        <h1 className="transaction-details-title">Transaction</h1>
        <p className="transaction-details-number">Transaction Number: {transactionDetail.id}</p>
        <h4 className="transaction-details-item-name">{transactionDetail.item_name}</h4>
        <p className="transaction-details-date">Date of Transaction: {convertDate(transactionDetail.date)}</p>
        <p className="transaction-details-from">From: {transactionDetail.from}</p>
      <div className="transaction-details-buttons">
      <Link to="/">
        <button className='return-home-button'>
          Return Home
        </button>
      </Link>
      <Link to={`/edit/${id}`}>
      <button className='edit-button'>Edit</button>
      </Link>
      </div>
    </div>
  )
}

export default TransactionDetails