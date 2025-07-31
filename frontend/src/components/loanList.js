import { useState, useEffect } from 'react';


function LoanList({ userID }) {
    console.log('refreshed LoanList component with userID:', userID);
    const [loanList, setLoanList] = useState([]);
    const [updateAfterDelete, setUpdateAfterDelete] = useState(0);
    
    const handleDelete = async (loanID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/loans?userID=${userID}&id=${loanID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUpdateAfterDelete(prev => prev + 1); // Trigger a re-fetch of loans
            }
        } catch (error) {
            console.error('Error deleting loan:', error);
        }
    };

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/loans?userID=${userID}`);
                const data = await response.json();
                setLoanList(data);
                console.log('Fetched loans:', data);
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };
        fetchLoans();
        
    }, [userID, updateAfterDelete]);


    return (
        //loan list
        <div>
            {loanList.map((loan) => (
                <div key={loan.id} className="loan-item">
                    <button className = 'loan-list-delete-button' 
                    onClick={()=> handleDelete(loan.id)}> Delete </button>
                    <h3>{loan.name}</h3>
                    <p>Amount: ${loan.amount}</p>
                    <p>Interest Rate: {loan.interestRate * 100}%</p>
                    <p>Term: {loan.termMonths} months</p>
                    <p>Grace Period: {loan.gracePeriod} months</p>
                </div>
            ))}
        </div>
    )

}

export default LoanList;