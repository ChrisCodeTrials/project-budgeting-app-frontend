import { useState, useEffect } from "react"
import Transactions from "./Transactions"
import TransactionDetails from "./TransactionDetails"
import TransactionForm from "./TransactionForm"
import ErrorMessage from "../ErrorMessage"
import Nav from "./Nav"
import { Routes, Route } from "react-router-dom"


function convertDate(regDate) {
  const options = { month: 'long', day: 'numeric' };
  const date = new Date(regDate + 'Z');
  return date.toLocaleDateString('en-US', options);
}
const App = () => {
  const [transactions, setTransactions] = useState([])
  const [edit, setEdit] = useState({show: false, id:null})

  useEffect(() => {
    fetch("http://localhost:3003/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions))
  }, [transactions])
  
    return (
      <div>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <Transactions 
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />
          <Route
            path="/:id"
            element={<TransactionDetails
            />} 
          />
          <Route
            path="/edit/:id"
            element={
              <TransactionForm
                edit={edit}
                setEdit={setEdit}
                setTransactions={setTransactions}
              />
            }
          />
          <Route
          path="/new"
          element={
            <TransactionForm
              edit={edit}
              setEdit={setEdit}
              setTransactions={setTransactions}
            />
          }
        />
        </Routes>
      </div>
    )
}

export {convertDate}
export default App
