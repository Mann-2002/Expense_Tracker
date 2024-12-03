import React from "react";

function ExpenseDetails({incomeAmt, expenseAmt}) {
    console.log('incomeAmt,expenseAmt ', incomeAmt,expenseAmt)

    return(
        <div>
            <div className="amounts-container">
                Balance: {incomeAmt - expenseAmt}
            </div>
           
           <div className="amounts-container">
            Income
           <span className="income-amount">{incomeAmt}</span>

            Expense
            <span className="expense-amount">{expenseAmt}</span>

           </div>

        </div>
    )
}

export default ExpenseDetails