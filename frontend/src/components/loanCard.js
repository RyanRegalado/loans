import { useState } from 'react'
import { useEffect } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import stateTaxData from '../stateTaxData.json'
import federalTaxData from '../fedTaxData.json'

function LoanCard( {loan, index, salary} ) {
    const [monthlyPayment, setMonthlyPayment] = useState(0)
    const [totalInterest, setTotalInterest] = useState(0)
    const [salaryBool, setSalaryBool] = useState(false)
    const [fedTaxData, setFedTaxData] = useState(0)
    const [taxData, setTaxData] = useState(null)
    const [netIncome, setNetIncome] = useState(0)
    const [paymentBreakdown, setPaymentBreakdown] = useState([])
    const [incomeRatioData, setIncomeRatioData] = useState([])
    
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
        
        // Calculate payment breakdown for charts
        const breakdown = calculatePaymentBreakdown(loan['amount'], loan['interestRate'], loan['termYears'])
        setPaymentBreakdown(breakdown)
        
    }, [loan, monthlyPayment]) // Calculates and sets monthly payment and interest

    useEffect(() => {
        try {
            let netIncome = taxCalculation(fedTaxData, taxData, salary['salary'])
            let netRounded = Math.round(netIncome*100) / 100
            setNetIncome(netRounded)
            
            // Calculate payment to income ratio for pie chart
            const netMonthlyIncome = netRounded / 12
            const paymentPercentage = netMonthlyIncome > 0 ? (monthlyPayment / netMonthlyIncome) * 100 : 0
            const remainingPercentage = Math.max(0, 100 - paymentPercentage)
            
            const pieChartData = [
                { 
                    name: 'Monthly Payment', 
                    value: monthlyPayment, 
                    color: '#e74c3c',
                    percentage: Math.round(paymentPercentage * 10) / 10
                },
                { 
                    name: 'Remaining Income', 
                    value: Math.max(0, netMonthlyIncome - monthlyPayment), 
                    color: '#27ae60',
                    percentage: Math.round(remainingPercentage * 10) / 10
                }
            ]
            setIncomeRatioData(pieChartData)
        } catch (error) { }
    }, [fedTaxData, taxData, salary, monthlyPayment]) // Calculates Tax and sets Net Income

    return (
        <div className="loanCardPart">
            <div className="loan-card-header">
                <h3>{loan['name']}</h3>
            </div>

            <div className="loan-card-content">
                {/* Left Side - Pie Chart */}
                <div className="pie-chart-section">
                    <div className="chart-container">
                        <h4>Monthly Payment vs Income Ratio</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <Pie
                                    data={incomeRatioData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {incomeRatioData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`$${value.toFixed(2)}`, name]} />
                            </PieChart>
                        </ResponsiveContainer>
                        {salaryBool && (
                            <div className="ratio-info">
                                <p><strong>Payment/Income Ratio:</strong> {((monthlyPayment / (netIncome / 12)) * 100).toFixed(1)}%</p>
                                <p><strong>Net Monthly Income:</strong> ${(netIncome / 12).toFixed(2)}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side - Basic Info */}
                <div className="loan-basic-info-section">
                    <div className="loan-basic-info">
                        <p><strong>Principal:</strong> ${loan['amount'].toLocaleString()}</p>
                        <p><strong>Interest Rate:</strong> {(loan['interestRate'] * 100).toFixed(2)}%</p>
                        <p><strong>Term:</strong> {loan['termYears']} years</p>
                        <p><strong>Monthly Payment:</strong> ${monthlyPayment.toFixed(2)}</p>
                        <p><strong>Total Interest:</strong> ${totalInterest.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Payment Breakdown Chart */}
            <div className="payment-breakdown-section">
                <div className="chart-container">
                    <h4>Payment Breakdown (First 5 Years)</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={paymentBreakdown.slice(0, 60)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                            <Legend />
                            <Bar dataKey="principal" stackId="a" fill="#8884d8" name="Principal" />
                            <Bar dataKey="interest" stackId="a" fill="#82ca9d" name="Interest" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="loan-card-footer">
                {salaryBool ? (
                    <div className="income-analysis">
                        <p><strong>Net Annual Income:</strong> ~${netIncome.toLocaleString()}</p>
                        <p><strong>Net Monthly Income:</strong> ~${Math.round(netIncome / 12 * 100) / 100}</p>
                        <p><strong>Payment-to-Income Ratio:</strong> {((monthlyPayment / (netIncome / 12)) * 100).toFixed(1)}%</p>
                    </div>
                ) : (
                    <p className="no-salary"><strong>Net Monthly Income:</strong> No Salary Added</p>
                )}
            </div>
        </div>
    )
}

// Helper function to calculate payment breakdown over time
function calculatePaymentBreakdown(principal, interestRate, termYears) {
    const breakdown = []
    const monthlyRate = interestRate / 12
    const totalMonths = termYears * 12
    const monthlyPayment = calculateMonthlyPayment(principal, interestRate, termYears)
    
    for (let year = 1; year <= Math.min(termYears, 5); year++) {
        let yearPrincipal = 0
        let yearInterest = 0
        
        for (let month = (year - 1) * 12; month < Math.min(year * 12, totalMonths); month++) {
            const remainingBalance = calculateRemainingBalance(principal, interestRate, month)
            const interestPayment = remainingBalance * monthlyRate
            const principalPayment = monthlyPayment - interestPayment
            
            yearPrincipal += principalPayment
            yearInterest += interestPayment
        }
        
        breakdown.push({
            year: `Year ${year}`,
            principal: Math.round(yearPrincipal * 100) / 100,
            interest: Math.round(yearInterest * 100) / 100
        })
    }
    
    return breakdown
}

function calculateMonthlyPayment(principle, interest, term) {
    let months = term * 12;
    let rate = interest / 12;
    let oneplusr = (1 + rate)**months;
    let result = principle * ((rate*oneplusr)/(oneplusr - 1));
    let rounded = Math.round(result * 100) / 100
    return rounded;
}

function calculateRemainingBalance(principal, interestRate, monthsPaid) {
    const monthlyRate = interestRate / 12
    const totalMonths = 30 * 12 // Assuming 30-year term for calculation
    const monthlyPayment = calculateMonthlyPayment(principal, interestRate, 30)
    
    if (monthsPaid >= totalMonths) return 0
    
    const remainingBalance = principal * Math.pow(1 + monthlyRate, monthsPaid) - 
                           monthlyPayment * ((Math.pow(1 + monthlyRate, monthsPaid) - 1) / monthlyRate)
    
    return Math.max(0, remainingBalance)
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