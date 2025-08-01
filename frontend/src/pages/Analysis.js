import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnalysisFigure from '../components/analysisFigure.js';
import FormSalary from '../components/formSalary.js'

function Analysis( {userID} ) {
    const navigate = useNavigate();
    const [loanList, setLoanList] = useState([]);
    const [loadingLoans, setLoadingLoans] = useState(true);
    const [salaryData, setSalaryData] = useState(null)
    
    const handleExit = () => {
        navigate('/');
    }

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

        
    }, [userID]);

    const handleSalarySubmit = (salaryData) => {
        setSalaryData(salaryData)
    };



    if (loadingLoans) {
        return <div>Loading Loans...</div>;
    } else if (loanList.length > 0) {
        return (
            <div>
                <button onClick = {handleExit} className = "to-home-page-button">Back to Home</button>
                <h1>Loan Breakdown</h1>
                <FormSalary onSubmit={handleSalarySubmit}/>
                <AnalysisFigure loanList={loanList} salary={salaryData} />
            </div>
        )
    } else if (loanList.length === 0) {
        return (
            <div>
                <button onClick={handleExit} className="to-home-page-button">Back to Home</button>
                 <h1>Loan Breakdown</h1>
                 <p>No loans found. Add loans for analysis</p>
            </div> 
        )
    }

    // function sortTime(loanData) {

    // }

}

export default Analysis;

