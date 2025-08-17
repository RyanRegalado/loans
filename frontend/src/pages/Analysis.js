import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnalysisFigure from '../components/analysisFigure.js';
import FormSalary from '../components/formSalary.js'
import '../css/analysis.css';

function Analysis( {userID} ) {
    const navigate = useNavigate();
    const [loanList, setLoanList] = useState([]);
    const [loadingLoans, setLoadingLoans] = useState(true);
    const [salaryData, setSalaryData] = useState({salary: "", state: ""})
    
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

    const handleSalarySubmit = (sal) => {
        setSalaryData(sal)
    };

    if (loadingLoans) {
        return (
            <div className="analysis-loading">
                <div className="loading-spinner"></div>
                <p>Loading your loan analysis...</p>
            </div>
        );
    } else if (loanList.length > 0) {
        return (
            <div className="analysis-page">
                {/* Header Section */}
                <header className="analysis-header">
                    <div className="header-content">
                        <button onClick={handleExit} className="back-button">
                            <span className="button-icon">←</span>
                            <span>Back to Home</span>
                        </button>
                        <h1 className="analysis-title">Loan Breakdown</h1>
                        <p className="analysis-subtitle">Comprehensive analysis of your student loan portfolio</p>
                    </div>
                </header>

                {/* Salary Form Section */}
                <section className="salary-form-section">
                    <div className="salary-form-container">
                        <FormSalary onSubmit={handleSalarySubmit}/>
                    </div>
                </section>

                {/* Analysis Content */}
                <section className="analysis-content">
                    <AnalysisFigure loanList={loanList} salary={salaryData} />
                </section>
            </div>
        )
    } else if (loanList.length === 0) {
        return (
            <div className="analysis-page">
                {/* Header Section */}
                <header className="analysis-header">
                    <div className="header-content">
                        <button onClick={handleExit} className="back-button">
                            <span className="button-icon">←</span>
                            <span>Back to Home</span>
                        </button>
                        <h1 className="analysis-title">Loan Breakdown</h1>
                        <p className="analysis-subtitle">Comprehensive analysis of your student loan portfolio</p>
                    </div>
                </header>

                {/* Empty State */}
                <section className="empty-analysis-section">
                    <div className="empty-analysis-content">
                        <div className="empty-icon">📊</div>
                        <h2>No Loans Found</h2>
                        <p>Add some loans to your portfolio to see detailed analysis and insights.</p>
                        <button onClick={handleExit} className="add-loans-button">
                            <span className="button-icon">+</span>
                            <span>Add Loans</span>
                        </button>
                    </div>
                </section>
            </div>
        )
    }
}

export default Analysis;

