import LoanCard from '../components/loanCard'
import { useState, useEffect } from 'react'

function AnalysisFigure( {loanList, salary} ) {
    const [totalDebt, setTotalDebt] = useState(0)

    console.log(loanList.length)
   
    useEffect(() => {
        let sum = 0
        for (let i = 0; i < loanList.length; i++) {
            sum += loanList[i].amount;
        }

        setTotalDebt(sum)    
    }, [loanList])

    console.log("Analysis Figure rendered with data:")
    console.log(salary)
    console.log(loanList)
    console.log(totalDebt)


    
    return (
        <div>
            <h1 className = 'totalLoanAmtHeader'>Total Debt: {totalDebt}</h1>
            <h2 className = 'salaryHeader'>Salary: {salary['salary']}</h2>
            <h2 className = 'stateHeader'> State: {salary['state']} </h2>
            {loanList.map((loan, index) => (
                <LoanCard key={index} loan={loan} index={index}  />
            ))}
        </div>
    )
}



export default AnalysisFigure