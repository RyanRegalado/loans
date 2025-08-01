import { useState }  from 'react'

function FormSalary( {onSubmit} ) {

    const [formData, setFormData] = useState(0)

    const handleChange = (e) => {
        const { value } = e.target;
        setFormData(value)
        console.log(value)

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <form className="salaryForm" onSubmit = {handleSubmit}>
            <label> Expected Salary After Graduation: <input className = 'salary' name='salary' type='number' min = '0' placeholder='ex: 60000' onChange={handleChange}/> </label>
        </form>
    )
}

export default FormSalary

