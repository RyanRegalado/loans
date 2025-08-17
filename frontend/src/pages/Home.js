import { useState } from "react";
import Modal from 'react-modal';
import LoanForm from "../components/loanForm";
import LoanList from "../components/loanList";
import { useNavigate } from "react-router-dom";
import '../css/home.css';

Modal.setAppElement('#root');

function Home({ userID })  {
    console.log('Home component rendered with userID:', userID);

    const navigate = useNavigate();

    const handlePageSwitch = () => {
        navigate('../Analysis');
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleLoanAdded = () => {
        setRefreshKey(prevKey => prevKey + 1); // Trigger a re-fetch of loans
        setModalIsOpen(false); // Close the modal after adding a loan
    };

    return (
        <div className="home-container">
            {/* Header Section */}
            <header className="home-header">
                <div className="header-content">
                    <h1 className="app-title">College Loan Manager</h1>
                    <p className="app-subtitle">Track, manage, and analyze your student loans with ease</p>
                </div>
            </header>

            {/* Introduction Section */}
            <section className="intro-section">
                <div className="intro-content">
                    <h2>Welcome to Your Loan Dashboard</h2>
                    <p>Start by adding your student loans below. We'll help you visualize your debt, calculate payments, and plan your financial future.</p>
                    <div className="intro-features">
                        <div className="feature">
                            <span className="feature-icon">📊</span>
                            <span>Visual Analytics</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">💰</span>
                            <span>Payment Planning</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">📈</span>
                            <span>Debt Tracking</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Add Loan Section - Centered */}
            <section className="add-loan-section">
                <div className="add-loan-container">
                    <button 
                        onClick={() => setModalIsOpen(true)} 
                        className='add-loan-button'
                    >
                        <span className="button-icon">+</span>
                        <span>Add New Loan</span>
                    </button>
                </div>
            </section>

            {/* Loan List Section */}
            <section className="loans-section">
                <div className="loans-container">
                    <h3 className="loans-title">Your Loans</h3>
                    <LoanList key={refreshKey} userID={userID} />
                </div>
            </section>

            {/* Analysis Button Section */}
            <section className="analysis-section">
                <button onClick={handlePageSwitch} className="to-analysis-page-button">
                    <span className="button-icon">📊</span>
                    <span>Analyze My Loans</span>
                </button>
            </section>

            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Add Loan Modal"
                className="loan-modal"
                overlayClassName="modal-overlay"
            > 
                <LoanForm 
                    userID={userID}
                    onClose={handleLoanAdded}
                />
            </Modal>
        </div>
    )
}

export default Home

