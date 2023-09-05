import './Form.css';

import { useState, useEffect } from 'react';

function Form() {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [strengthPass, setStrengthPass] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setStrengthPass(validateStrength(formValues.password));
    console.log(formValues);
  };

  const handleReturn = e => {
    setFormValues(initialValues);
    setIsSubmit(false);
    setFormErrors({});
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formErrors);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = values => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const noSpacesRegex = /^\S*$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    if (!values.username) {
      errors.username = 'Username is required!';
    } else if (!noSpacesRegex.test(values.username)) {
      errors.username = 'No blank spaces allowed!';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    } else if (values.password.length > 10) {
      errors.password = 'Password cannot exceed more than 10 characters';
    } else if (!passwordRegex.test(values.password)) {
      errors.password = 'This is not a valid password';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm password';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords does not match';
    }
    return errors;
  };

  const validateStrength = pass => {
    let message = '';
    const strongPassRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    const mediumPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    const weakPassRegex = /^(?=.*[a-z])(?=.*[A-Z])/;

    if (pass) {
      if (strongPassRegex.test(pass)) {
        message = 'strong';
      } else if (mediumPassRegex.test(pass)) {
        message = 'medium';
      } else if (weakPassRegex.test(pass)) {
        message = 'weak';
      }
    } else {
      message = '';
    }
    return message;
  };

  return (
    <div>
      <div className="formBox">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="successMessageBox">
            <p className="successMessage">Signed in successfully</p>
            <button onClick={handleReturn} className="button" type="submit">
              Go back
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="header">
              <h1>Signin Form</h1>
            </div>
            <div className="inputBox">
              <label className="label">Username</label>
              <input
                onChange={handleChange}
                value={formValues.username}
                className="input"
                type="text"
                placeholder="Username"
                name="username"
              ></input>
              {formErrors.username && (
                <p className="errorMessage">{formErrors.username}</p>
              )}
            </div>

            <div className="inputBox">
              <label className="label">Email</label>
              <input
                onChange={handleChange}
                value={formValues.email}
                className="input"
                type="email"
                placeholder="email@mail.com"
                name="email"
              ></input>
              {formErrors.email && (
                <p className="errorMessage">{formErrors.email}</p>
              )}
            </div>

            <div className="inputBox">
              <label className="label">Password</label>
              <input
                onChange={handleChange}
                value={formValues.password}
                className="input"
                type="password"
                placeholder="**************"
                name="password"
              ></input>
              {strengthPass !== '' && (
                <div className={strengthPass}>
                  <p className="strengthMessage">{strengthPass}</p>
                </div>
              )}

              {formErrors.password && (
                <p className="errorMessage">{formErrors.password}</p>
              )}
            </div>

            <div className="inputBox">
              <label className="label">Confirm password</label>
              <input
                onChange={handleChange}
                value={formValues.confirmPassword}
                className="input"
                type="password"
                placeholder="**************"
                name="confirmPassword"
              ></input>
              {formErrors.confirmPassword && (
                <p className="errorMessage">{formErrors.confirmPassword}</p>
              )}
            </div>

            <div>
              <button onClick={handleSubmit} className="button" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Form;
