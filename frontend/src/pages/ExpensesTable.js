import React from 'react'

function ExpensesTable({expenses, handDeleteExpense }) 
{
    console.log('ExpensesTable-->',expenses)
    return (
        <div className='expense-list'>
            {
            expenses?.map((expense, index)=> (
                <div Key={index} className='expense-item'>
                    <button className='delete-button' 
                    onClick={()=> handDeleteExpense(expense._id)}
                    >X</button>
                    <div className='expense-description'>{expense.text}</div>
                    <div className='expense-amount'
                        style={{
                            color: expense.amount > 0 ? '#1aff1a' : '#e74c3c' 
                        }}
                    >
                        {expense.amount}
                        </div>
                </div>
            ))
        }
        </div>
    )
}

export default ExpensesTable