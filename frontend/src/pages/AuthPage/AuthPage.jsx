import React, { useEffect, useState } from 'react';
import Input from '../../components/common/FormElements/Input';
import { useForm } from '../../components/common/hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../components/common/utils/validator';
import './AuthPage.css';

function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userType, setUserType] = useState('student'); // default user type

  const [formState, inputHandler, setFormData] = useForm(
    {
      idNumber: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          email: {
            value: '',
            isValid: false
          }
        },
        formState.inputs.idNumber.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          email: {
            value: formState.inputs.email.value,
            isValid: formState.inputs.email.isValid
          }
        },
        formState.inputs.idNumber.isValid &&
          formState.inputs.password.isValid &&
          formState.inputs.email.isValid
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (isLoginMode) {
      setFormData(
        {
          idNumber: formState.inputs.idNumber,
          password: formState.inputs.password
        },
        formState.inputs.idNumber.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          idNumber: formState.inputs.idNumber,
          password: formState.inputs.password,
          email: formState.inputs.email
        },
        formState.inputs.idNumber.isValid &&
          formState.inputs.password.isValid &&
          formState.inputs.email.isValid
      );
    }
  }, [isLoginMode, setFormData, formState.inputs]);

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs, userType);
    // Implement your authentication logic here
  };

  const userTypeHandler = (type) => {
    setUserType(type);
  };

  return (
    <div className="auth-page">
      <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
      <hr />
      <div className="auth-page__user-type">
        <label>
          <input
            type="radio"
            name="userType"
            value="student"
            checked={userType === 'student'}
            onChange={() => userTypeHandler('student')}
          />
          Student
        </label>
        <label>
          <input
            type="radio"
            name="userType"
            value="professor"
            checked={userType === 'professor'}
            onChange={() => userTypeHandler('professor')}
          />
          Professor/Faculty Member
        </label>
      </div>
      <form onSubmit={authSubmitHandler}>
        <Input
          element="input"
          id="idNumber"
          type="text"
          label="ID Number"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(9)]}
          errorText="Please enter your ID number."
          onInput={inputHandler}
          initialValue={formState.inputs.idNumber.value}
          initialValid={formState.inputs.idNumber.isValid}
        />
        {!isLoginMode && (
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
            initialValue={formState.inputs.email.value}
            initialValid={formState.inputs.email.isValid}
          />
        )}
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
          initialValue={formState.inputs.password.value}
          initialValid={formState.inputs.password.isValid}
        />

        <button className="btn" type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </button>
      </form>
      <button className="switch-mode" onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </button>
    </div>
  );
}

export default AuthPage;
