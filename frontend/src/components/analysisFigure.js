import LoanCard from '../components/loanCard'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function AnalysisFigure( {loanList, salary} ) {
    const [totalDebt, setTotalDebt] = useState(0)
    const [paymentTimeline, setPaymentTimeline] = useState([])
    const [incomeRatioTimeline, setIncomeRatioTimeline] = useState([])

    console.log(loanList.length)
   
    useEffect(() => {
        let sum = 0
        for (let i = 0; i < loanList.length; i++) {
            sum += loanList[i].amount;
        }
        setTotalDebt(sum)    
    }, [loanList])

    useEffect(() => {
        if (loanList.length > 0) {
            const timeline = calculatePaymentTimeline(loanList, salary)
            setPaymentTimeline(timeline)
            
            const ratioTimeline = calculateIncomeRatioTimeline(loanList, salary)
            setIncomeRatioTimeline(ratioTimeline)
        }
    }, [loanList, salary])

    console.log("Analysis Figure rendered with data:")
    console.log(salary)
    console.log(loanList)
    console.log(totalDebt)

    return (        
        <div className="analysis-container">
            {/* Summary Stats */}
            <div className="summary-stats">
                <h1 className="totalLoanAmtHeader">Total Debt: ${totalDebt.toLocaleString()}</h1>
                <h2 className="salaryHeader">Expected Salary: ${salary.salary ? salary.salary.toLocaleString() : 'Not Set'}</h2>
                <h2 className="stateHeader">State: {salary.state || 'Not Selected'}</h2>
            </div>
            
            {/* Top Section: Payment Timeline */}
            
            <div className="timeline-section">
                <h2 className="timeline-header">Payment Timeline Overview</h2>
                <div className="timeline-chart">
                    <h3 style={{ textAlign: 'center', marginBottom: '10px', color: '#2c3e50', fontSize: '16px' }}>
                        Monthly Payment ($)
                    </h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={paymentTimeline} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="month" 
                                label={{ value: 'Months After Graduation', position: 'insideBottom', offset: -10 }}
                            />
                            <YAxis />
                            <Tooltip formatter={(value, name) => {
                                return [`$${value.toFixed(2)}`, name]
                            } } />
                            <Legend 
                                layout = "horizontal"
                                verticalAlign = "bottom"
                                align = "center"
                                wrapperStyle = {{
                                    padding: "20px 0px"
                                }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="totalPayment" 
                                stroke="#8884d8" 
                                strokeWidth={2}
                                name="Total Monthly Payment"
                            />
                            <Line 
                                type="monotone" 
                                dataKey="principalPayment" 
                                stroke="#82ca9d" 
                                strokeWidth={2}
                                name="Principal Payment"
                            />
                            <Line 
                                type="monotone" 
                                dataKey="interestPayment" 
                                stroke="#ffc658" 
                                strokeWidth={2}
                                name="Interest Payment"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Income to Payment Ratio Timeline */}
            <div className="ratio-section">
                <h2 className="ratio-header">Payment to Income Ratio Over Time</h2>
                <div className="ratio-chart">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={incomeRatioTimeline} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="month" 
                                label={{ value: 'Months After Graduation', position: 'insideBottom', offset: -10 }}
                            />
                            <YAxis 
                                label={{ value: 'Payment/Income Ratio (%)', angle: -90, position: 'inside' }}
                            />
                            <Tooltip formatter={(value, name) => {
                                return [`${value.toFixed(2)}%`, name]
                            } } />
                            <Legend 
                                layout = "horizontal"
                                verticalAlign = "bottom"
                                align = "center"
                                wrapperStyle = {{
                                    padding: "20px 0px"
                                }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="paymentRatio" 
                                stroke="#e74c3c" 
                                strokeWidth={3}
                                name="Monthly Payment / Net Income (%)"
                                dot={{ fill: '#e74c3c', strokeWidth: 2, r: 4 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="threshold" 
                                stroke="#95a5a6" 
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                name="Recommended Ratio 10%)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom Section: Individual Loan Cards */}
            <div className="loan-cards-section">
                <h2 className="loan-cards-header">Individual Loan Analysis</h2>
                <div className="loan-cards-grid">
                    {loanList.map((loan, index) => (
                        <LoanCard key={index} loan={loan} index={index} salary={salary} /> 
                    ))}
                </div>
            </div>
        </div>
    )
}

// Helper function to calculate payment timeline
function calculatePaymentTimeline(loans, salary) {
    const timeline = []
    const maxMonths = Math.max(...loans.map(loan => loan.termYears * 12))
    
    for (let month = 0; month <= maxMonths; month++) {
        let totalPayment = 0
        let totalPrincipal = 0
        let totalInterest = 0
        
        loans.forEach(loan => {
            // Calculate when this loan starts payments (after grace period)
            const startMonth = loan.gracePeriod || 0
            
            if (month >= startMonth && month < startMonth + (loan.termYears * 12)) {
                const monthlyPayment = calculateMonthlyPayment(loan.amount, loan.interestRate, loan.termYears)
                const remainingBalance = calculateRemainingBalance(loan.amount, loan.interestRate, month - startMonth)
                const interestPayment = remainingBalance * (loan.interestRate / 12)
                const principalPayment = monthlyPayment - interestPayment
                
                totalPayment += monthlyPayment
                totalPrincipal += principalPayment
                totalInterest += interestPayment
            }
        })
        
        timeline.push({
            month: month,
            totalPayment: Math.round(totalPayment * 100) / 100,
            principalPayment: Math.round(totalPrincipal * 100) / 100,
            interestPayment: Math.round(totalInterest * 100) / 100
        })
    }
    
    return timeline
}

// Helper function to calculate income to payment ratio timeline
function calculateIncomeRatioTimeline(loans, salary) {
    if (!salary.salary) return []
    
    const timeline = []
    const maxMonths = Math.max(...loans.map(loan => loan.termYears * 12))
    const netMonthlyIncome = calculateNetMonthlyIncome(salary)
    
    for (let month = 0; month <= maxMonths; month++) {
        let totalPayment = 0
        
        loans.forEach(loan => {
            const startMonth = loan.gracePeriod || 0
            
            if (month >= startMonth && month < startMonth + (loan.termYears * 12)) {
                const monthlyPayment = calculateMonthlyPayment(loan.amount, loan.interestRate, loan.termYears)
                totalPayment += monthlyPayment
            }
        })
        
        const ratio = netMonthlyIncome > 0 ? (totalPayment / netMonthlyIncome) * 100 : 0
        
        timeline.push({
            month: month,
            paymentRatio: Math.round(ratio * 10) / 10,
            threshold: 10 // Recommended ratio threshold (10%)
        })
    }
    
    return timeline
}

// Helper function to calculate net monthly income
function calculateNetMonthlyIncome(salary) {
    // This is a simplified calculation - you might want to use your existing tax calculation
    const grossAnnual = salary.salary
    const estimatedTaxRate = 0.25 // Simplified 25% tax rate
    const netAnnual = grossAnnual * (1 - estimatedTaxRate)
    return netAnnual / 12
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

export default AnalysisFigure