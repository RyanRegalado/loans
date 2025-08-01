import {useState} from 'react';

function LoanForm({ userID, onClose }) {

    console.log('LoanForm component rendered with userID:', userID);
    const [formData, setFormData] = useState({
        name: '',
        yearsTillGraduation: '',
        amount: '',
        interestRate: '',
        termYears: '',
        gracePeriod: '',
        subsidized: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        setFormData( prev => ({...prev, [name]: type === 'checkbox' ? checked : value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loanData = {
            userID,
            name: formData.name,
            yearsTillGraduation: parseInt(formData.yearsTillGraduation, 10),
            amount: Number(formData.amount),
            interestRate: Number(formData.interestRate),
            termYears: parseInt(formData.termYears, 10),
            gracePeriod: parseInt(formData.gracePeriod, 10),
            subsidized: formData.subsidized
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
            <input name='yearsTillGraduation' placeholder='Years Until Graduation' type='number' onChange={handleChange} required/>
            <input name='amount' placeholder='Principle ($)' type='number' onChange={handleChange} required/>
            <input name='interestRate' placeholder='Interest Rate (ex: 0.07)' min='0' max='1' type='number' step='0.01' onChange={handleChange} required/>
            <input name='termYears' placeholder='Term (Years)' type='number' onChange={handleChange} required/>
            <input name='gracePeriod' placeholder='Grace Period (Months)' type='number' onChange={handleChange} required/>
            <label className= "checkbox-label"> Subsidized <input name='subsidized' type='checkbox' checked={formData.subsidized} onChange={handleChange} /> </label>
            <button type='submit'> Done </button>
            <button type='button' onClick={onClose}> Cancel </button>
        </form>
    )
}


export default LoanForm;