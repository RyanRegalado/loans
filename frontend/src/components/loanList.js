import { useState, useEffect } from 'react';


function LoanList({ userID }) {
    console.log('Loanlist component rendered with userID:', userID);
    const [loanList, setLoanList] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/loans?userID=${userID}`);
                const data = await response.json();
                console.log('Fetched data:', data)
                setLoanList(data);
                console.log('Fetched loans:', data);
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };
        fetchLoans();
    
    }, [userID]);

    return (
        <div></div>
    )


    // return (
    //     <ul>
    //         {loanList.map((loan => (
    //             <li key={loan.id}>
    //                 {loan.name} - ${loan.amount} at {loan.interestRate * 100}% for {loan.termMonths} months. No payments for {loan.gracePeriod} months.
    //             </li>
    //         )))}

    //     </ul>
    // )

}

export default LoanList;