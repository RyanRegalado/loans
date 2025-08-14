function LoanCard( {loan, index} ) {
    console.log("Loan Card Rendered with ", loan)
    return (
        <div className = 'loanCardPart'>
            <p> Name: {loan['name']} </p>
        </div>
    )
}

export default LoanCard