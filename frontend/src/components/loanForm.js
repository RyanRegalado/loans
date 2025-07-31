import {useState} from 'react';

function LoanForm({ userID, onClose }) {

    console.log('LoanForm component rendered with userID:', userID);
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        interestRate: '',
        termMonths: '',
        gracePeriod: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData( prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loanData = {
            userID,
            name: formData.name,
            amount: Number(formData.amount),
            interestRate: Number(formData.interestRate),
            termMonths: parseInt(formData.termMonths, 10),
            gracePeriod: parseInt(formData.gracePeriod, 10)
        };
        

        try {
            await fetch('http://localhost:5000/api/loans', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(loanData)
            });
            onClose(); // Close the modal after submission
        } catch (error) {
            console.error('Error adding loan:', error);
        }

    };

    return (
        <form onSubmit={handleSubmit} className='loan-form'>
            <input name='name' placeholder='Name (ex: Freshman Year)' onChange={handleChange} required/>
            <input name='amount' placeholder='Principle ($)' type='number' onChange={handleChange} required/>
            <input name='interestRate' placeholder='Interest Rate (ex: 0.07)' min='0' max='1' type='number' step='0.01' onChange={handleChange} required/>
            <input name='termMonths' placeholder='Term (Months)' type='number' onChange={handleChange} required/>
            <input name='gracePeriod' placeholder='Grace Period (Months)' type='number' onChange={handleChange} required/>
            
            <button type='submit'> Done </button>
            <button type='button' onClick={onClose}> Cancel </button>
        </form>
    )
}


export default LoanForm;