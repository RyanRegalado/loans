import { useState } from "react";
import Modal from 'react-modal';
import LoanForm from "../components/loanForm";
import LoanList from "../components/loanList";

Modal.setAppElement('#root');

function Home({ userID })  {
    console.log('Home component rendered with userID:', userID);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)} className='add-loan-button'>Add Loan</button>

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
                    onClose={() => setModalIsOpen(false)}
                    />
            </Modal>

            <LoanList userID={userID} />
        </div>
    )
}

export default Home

