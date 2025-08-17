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
                // Sort by creation date (most recent first) - assuming loans have timestamps
                // If no timestamp, we'll sort by ID in descending order
                const sortedData = data.sort((a, b) => b.id - a.id);
                setLoanList(sortedData);
                setLoadingLoans(false);
                console.log('Fetched loans:', sortedData);
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };
        fetchLoans();
        
    }, [userID, updateAfterDelete]);

    if (loadingLoans) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your loans...</p>
            </div>
        );
    }

    if (loanList.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No loans added yet</h3>
                <p>Click "Add New Loan" to get started</p>
            </div>
        );
    }

    return (
        <div className="loan-grid">
            {loanList.map((loan) => (
                <div key={loan.id} className="loan-card">
                    <div className="loan-card-header">
                        <h3 className="loan-name">{loan.name}</h3>
                        <button 
                            className="delete-button" 
                            onClick={() => handleDelete(loan.id)}
                            title="Delete loan"
                        >
                            ×
                        </button>
                    </div>
                    
                    <div className="loan-principal">
                        <span className="principal-amount">${loan.amount.toLocaleString()}</span>
                        <span className="principal-label">Principal</span>
                    </div>
                    
                    <div className="loan-details">
                        <div className="detail-row">
                            <span className="detail-label">Interest Rate:</span>
                            <span className="detail-value">{(loan.interestRate * 100).toFixed(2)}%</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Term:</span>
                            <span className="detail-value">{loan.termYears} years</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Grace Period:</span>
                            <span className="detail-value">{loan.gracePeriod} months</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Years to Graduation:</span>
                            <span className="detail-value">{loan.yearsTillGraduation}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Subsidized:</span>
                            <span className={`detail-value ${loan.subsidized ? 'subsidized-yes' : 'subsidized-no'}`}>
                                {loan.subsidized ? "Yes" : "No"}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LoanList;