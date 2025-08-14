import { useState } from "react";
import Modal from 'react-modal';
import LoanForm from "../components/loanForm";
import LoanList from "../components/loanList";
import { useNavigate } from "react-router-dom";

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
        <div>
            <button onClick={() => setModalIsOpen(true)} className='add-loan-button'>Add Loan</button>
            <h1>User id: {userID} </h1>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLablel="Add Loan Modal"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        padding: '20px',
                        borderRadius: '10px',
                        backgroundColor: '#f0f0f0'
                    }
                }}
            > 

                <LoanForm 
                    userID={userID}
                    onClose={handleLoanAdded}
                    />
            </Modal>

            <LoanList key={refreshKey} userID={userID} />
            <button onClick={handlePageSwitch} className = "to-analysis-page-button">Analyze</button>

        </div>
    )
}


export default Home

