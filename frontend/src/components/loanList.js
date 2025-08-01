import { useState, useEffect } from 'react';


function LoanList({ userID }) {
    console.log('refreshed LoanList component with userID:', userID);
    const [loanList, setLoanList] = useState([]);
    const [updateAfterDelete, setUpdateAfterDelete] = useState(0);
    const [loadingLoans, setLoadingLoans] = useState(true);
    
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
                setLoadingLoans(false);
                console.log('Fetched loans:', data);
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };
        fetchLoans();
        
    }, [userID, updateAfterDelete]);

    if (loadingLoans) {
        return <div>Loading Loans...</div>
    }

    return (
        //loan list
        <div>
            {loanList.map((loan) => (
                <div key={loan.id} className="loan-item">
                    <button className = 'loan-list-delete-button' 
                    onClick={()=> handleDelete(loan.id)}> Delete </button>
                    <h3>{loan.name}</h3>
                    <p>Amount: ${loan.amount}</p>
                    <p>Years Until Graduation: {loan.yearsTillGraduation}</p>
                    <p>Interest Rate: {loan.interestRate * 100}%</p>
                    <p>Term: {loan.termYears} Years</p>
                    <p>Grace Period: {loan.gracePeriod} months</p>
                    <p>Subsidized: {loan.subsidized ? "Yes" : "No"}</p>
                </div>
            ))}
        </div>
    )

}

export default LoanList;