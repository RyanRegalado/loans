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
        <div className="loan-form-container">
            <div className="form-header">
                <h2>Add New Loan</h2>
                <p>Enter the details of your student loan</p>
            </div>
            
            <form onSubmit={handleSubmit} className='loan-form'>
                <div className="form-group">
                    <label htmlFor="name">Loan Name</label>
                    <input 
                        id="name"
                        name='name' 
                        placeholder='e.g., Freshman Year, Federal Direct Loan' 
                        value={formData.name}
                        onChange={handleChange} 
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Principal Amount ($)</label>
                    <input 
                        id="amount"
                        name='amount' 
                        placeholder='e.g., 5000' 
                        type='number' 
                        value={formData.amount}
                        onChange={handleChange} 
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="interestRate">Interest Rate (%)</label>
                        <input 
                            id="interestRate"
                            name='interestRate' 
                            placeholder='e.g., 5.5' 
                            type='number' 
                            step='0.01' 
                            min='0' 
                            max='100'
                            value={formData.interestRate}
                            onChange={handleChange} 
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="termYears">Term (Years)</label>
                        <input 
                            id="termYears"
                            name='termYears' 
                            placeholder='e.g., 10' 
                            type='number' 
                            value={formData.termYears}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="yearsTillGraduation">Years Until Graduation</label>
                        <input 
                            id="yearsTillGraduation"
                            name='yearsTillGraduation' 
                            placeholder='e.g., 2' 
                            type='number' 
                            value={formData.yearsTillGraduation}
                            onChange={handleChange} 
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gracePeriod">Grace Period (Months)</label>
                        <input 
                            id="gracePeriod"
                            name='gracePeriod' 
                            placeholder='e.g., 6' 
                            type='number' 
                            value={formData.gracePeriod}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                </div>

                <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                        <input 
                            name='subsidized' 
                            type='checkbox' 
                            checked={formData.subsidized} 
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                        This is a subsidized loan
                    </label>
                </div>

                <div className="form-actions">
                    <button type='button' onClick={onClose} className="cancel-button">
                        Cancel
                    </button>
                    <button type='submit' className="submit-button">
                        Add Loan
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoanForm;