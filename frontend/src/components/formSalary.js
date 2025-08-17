import { useState }  from 'react'

function FormSalary( {onSubmit} ) {

    const [formData, setFormData] = useState({salary: "",
        state: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div className="salary-form-wrapper">
            <div className="salary-form-header">
                <h2>Income Information</h2>
                <p>Enter your expected salary and state to calculate accurate payment-to-income ratios</p>
            </div>
            
            <form className="salaryForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="salary">Expected Annual Salary ($)</label>
                    <input 
                        id="salary"
                        className="salary-input" 
                        name='salary' 
                        type='number' 
                        min="0" 
                        placeholder='e.g., 65000'  
                        value={formData.salary}
                        onChange={handleChange} 
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="state">State of Residence</label>
                    <select 
                        id="state"
                        className="state-dropdown" 
                        onChange={handleChange} 
                        name="state" 
                        value={formData.state}
                        required
                    >
                        <option value="" disabled>Select your state</option>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Idaho">Idaho</option>
                        <option value="Illinois">Illinois</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Kansas">Kansas</option>
                        <option value="Kentucky">Kentucky</option>
                        <option value="Louisiana">Louisiana</option>
                        <option value="Maine">Maine</option>
                        <option value="Maryland">Maryland</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Montana">Montana</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New Hampshire">New Hampshire</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="New York">New York</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="North Dakota">North Dakota</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                        <option value="Utah">Utah</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Washington">Washington</option>
                        <option value="West Virginia">West Virginia</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Wyoming">Wyoming</option>    
                    </select> 
                </div>
                
                <button type='submit' className="submit-salary-button">
                    <span className="button-icon">💼</span>
                    <span>Update Analysis</span>
                </button>
            </form>
        </div>
    )
}

export default FormSalary

