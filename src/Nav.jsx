import React from 'react'
import { Link } from 'react-router-dom'
import '../css/nav.css'

function Nav() {
  return (
    <div className='nav-container'>
        <section className='nav-text'>
            <h1>
              Budgeting App
            </h1> 
            <Link to="/new">
                <button>New Transaction</button>
            </Link>
        </section>
    </div>
  )
}

export default Nav