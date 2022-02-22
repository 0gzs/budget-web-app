import { useState } from "react";

const useForm = (initialState = {}, validations = [], onSubmit = () => {}) => {
    const { isValid: initialIsValid, errors: initialErrors } = validate(validations, initialState);
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setIsValid] = useState(initialIsValid);
    const [touched, setTouched] = useState({});

    const changeHandler = (event=null, name=null, value=null) => {
        const newValues = { ...values, [name || event.target.name]: value || event.target.value };
        const { isValid, errors } = validate(validations, newValues);
        setValues(newValues); 
        setIsValid(isValid);
        setErrors(errors);
        setTouched({ ...touched, [name || event.target.name]: true });
    };

    const submitHandler = async () => {
        if (!isValid) return setTouched({ ...touched, empty: true })
        else setTouched({ ...touched, empty: false })

        onSubmit(values);
    };
    
    function validate(validations, values) {
        const errors = validations
            .map(validation => validation(values))
            .filter(validation => typeof validation === "object");
        return { 
            isValid: errors.length === 0, 
            errors: errors.reduce((errors, error) => (
                { ...errors, ...error }
            ), {})
        }
    }

    return { values, changeHandler, isValid, errors, touched, submitHandler };
}; 


export default useForm;