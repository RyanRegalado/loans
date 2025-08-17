import { useState } from 'react'
import { useEffect } from 'react'
import stateTaxData from '../stateTaxData.json'
import federalTaxData from '../fedTaxData.json'

function LoanCard( {loan, index, salary} ) {
    const [monthlyPayment, setMonthlyPayment] = useState(0)
    const [totalInterest, setTotalInterest] = useState(0)
    const [salaryBool, setSalaryBool] = useState(false)
    const [fedTaxData, setFedTaxData] = useState(0)
    const [taxData, setTaxData] = useState(null)
    const [netIncome, setNetIncome] = useState(0)
    
    useEffect(() => {
        if (salary['salary'] === "") {
                setSalaryBool(false)
                console.log("False")
            } else {
                setSalaryBool(true)
                console.log("True")
            }
    }, [salary]) // Salary input status (true/false)
  
    useEffect(() => {
        const state = salary['state']
        const taxInfo = stateTaxData['stateTax'][state]
        setTaxData(taxInfo)
        setFedTaxData(federalTaxData['federalTax']['Single'])
    }, [salary]) // Sets federal and state tax information

    useEffect(() => {
        let mon = calculateMonthlyPayment(loan['amount'], loan['interestRate'], loan['termYears'])
        setMonthlyPayment(mon)
        let interest = (monthlyPayment*loan['termYears']*12) - loan['amount']
        let rounded = Math.round(interest * 100) / 100
        setTotalInterest(rounded)
    }, [loan, monthlyPayment]) // Calculates and sets monthly payment and interest

    useEffect(() => {
        
        try {
            let netIncome = taxCalculation(fedTaxData, taxData, salary['salary'])
            let netRounded = Math.round(netIncome*100) / 100
            setNetIncome(netRounded)
        } catch (error) { }

    }, [fedTaxData, taxData, salary]) // Calculates Tax and sets Net Income

    return (
        <div className = 'loanCardPart'>
            <p> Name: {loan['name']} </p>
            <p> Total Interest Paid: ${totalInterest} </p>
            <p> Monthly Payment: ${monthlyPayment} for {loan['termYears']*12} months </p>
            {salaryBool ? <p>   Net Income: ~${netIncome}  </p> : <p>Net Monthly Income: No Salary Added</p>}
            {salaryBool ? <p>   Monthly Net: ~${Math.round(netIncome / 12 * 100) / 100}  </p> : <p>Net Monthly Income: No Salary Added</p>} 
        </div>
    )
}

function calculateMonthlyPayment(principle, interest, term) {
    let months = term * 12;
    let rate = interest / 12;
    let oneplusr = (1 + rate)**months;
    let result = principle * ((rate*oneplusr)/(oneplusr - 1));
    let rounded = Math.round(result * 100) / 100
    return rounded;
}

function taxCalculation(fedTaxInfo, taxInfo, salary) {
    let afterFedSalary = taxIterator(fedTaxInfo, salary)
    console.log(afterFedSalary)
    let afterStateSalary = taxIterator(taxInfo, afterFedSalary)
    console.log(afterStateSalary)
    return afterStateSalary;
}

function taxIterator(taxInfo, salary) {
    let totalTax = 0;
    for (let i = 0; i < taxInfo.length; i++) {
        let bracket = taxInfo[i]
        let rate = bracket.rate / 100
        let min = bracket.min
        let max = bracket.max
        if (salary > min && max === null) {
            totalTax  += ((salary - min) * rate)
        } else if (salary > max) {
            totalTax += ((max - min) * rate)
        } else if (salary < max) {
            totalTax += ((salary-min) * rate)
            break;
        }
    }
    console.log(salary, totalTax)
    return salary - totalTax
}





export default LoanCard