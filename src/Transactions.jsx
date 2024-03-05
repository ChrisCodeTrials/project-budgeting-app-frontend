import { Link } from "react-router-dom"
import {convertDate} from "./App"
import '../css/transaction.css'

function Transactions({ transactions, setTransactions}) {
    function calculateTotalAmount(transactionsData) {
        let total = 0
        transactionsData.forEach(transaction => {
            total += Number(transaction.amount)
        })
        return total
    }
    const total = calculateTotalAmount(transactions)

    function handleDelete(id) {
        const options = {
          method: "DELETE",
        }
        fetch(`http://localhost:3003/api/transactions/${id}`, options)
          .then((res) => res.json())
          .then((data) => setTransactions(data.transactions))
    }

    function getStyleByTotal(total) {
        if (total < 0) {
            return { color: 'red' }
        } else if (total >= 0 && total <= 100) {
            return { color: 'yellow' }
        } else {
            return { color: 'green' }
        }
    }
    const headerStyle = getStyleByTotal(total);

  return (
    <div className="transaction-container">
        <section className="total-container">
            <h1 style={headerStyle}>Bank Account Total: {total < 0 ? "-$" + Math.abs(total) + " " + "🥲" : "$" + total + " " + "🤑"}</h1>
        </section>
        {transactions.map(({id, date, amount, category}) => (
            <div className="transaction" key={id}>
                <p>{convertDate(date)}</p>
                <Link to={`/${id}`}>
                    <h4 className="tran-link">{category}</h4>
                </Link>
                <h2>{amount < 0 ? "-$" + Math.abs(amount) : "$" + amount}</h2>
                <Link to={`/edit/${id}`}>
                    <button className="edit">Edit</button>
                </Link>    
                <button className="delete" onClick={() => handleDelete(id)}>Delete</button>
            </div>
        ))}
    </div>
  )
}

export default Transactions