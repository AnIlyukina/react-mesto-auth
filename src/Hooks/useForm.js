import React from "react";

const useForm = () => {


  const[values, setValues] = React.useState({});

  const[errors, setErrors] = React.useState({})

  const [isValid, setIsValid] = React.useState(false)


  const handleChange = (e) =>{

    let name = e.target.name
    let value = e.target.value
  
    setValues({
      ...values,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: e.target.validationMessage
    })

    setIsValid(e.target.closest(".popup__form").checkValidity())
  }


  return{
    values,
    errors,
    handleChange,
    isValid,
    setValues,
    setErrors,
    setIsValid
  }

  
}

export default useForm;