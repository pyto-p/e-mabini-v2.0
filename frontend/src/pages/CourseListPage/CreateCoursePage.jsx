import React, { useCallback, useReducer } from 'react';
import Input from '../../components/common/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../components/common/utils/validator';
import './CreateCoursePage.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
    }

}

function CreateCoursePage() {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      code: {
        value: '',
        isValid: false
      },
      name: {
        value: '',
        isValid: false
      },
      section: {
        value: '',
        isValid: false
      },
      schedday: {
        value: '',
        isValid: false
      },
      schedtime: {
        value: '',
        isValid: false
      },
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ 
      type: 'INPUT_CHANGE', 
      value: value, 
      isValid: isValid, 
      inputId: id 
    });
  }, []);

  const courseSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  return (
    <div className="course-form__page">
      <form className='course-form' onSubmit={courseSubmitHandler}>
        <Input
          id="code" 
          element="input" 
          type="text" 
          label="Course Code" 
          validators={[VALIDATOR_REQUIRE()]} 
          errorText="Please enter a valid course code."  
          onInput={inputHandler}
        />
        <Input
          id="name" 
          element="input" 
          type="text" 
          label="Course Name" 
          validators={[VALIDATOR_REQUIRE()]} 
          errorText="Please enter a course name."  
          onInput={inputHandler}
        />
        <Input
          id="section" 
          element="input" 
          type="text" 
          label="Section" 
          validators={[VALIDATOR_REQUIRE()]} 
          errorText="Please enter a section."  
          onInput={inputHandler}
        />
        <Input
          id="schedday" 
          element="input" 
          type="text" 
          label="Day of Schedule" 
          validators={[VALIDATOR_REQUIRE()]} 
          errorText="Please enter a valid day of schedule."  
          onInput={inputHandler}
        />
        <Input
          id="schedtime" 
          element="input" 
          type="text" 
          label="Time of Schedule" 
          validators={[VALIDATOR_REQUIRE()]} 
          errorText="Please enter a valid time of schedule."  
          onInput={inputHandler}
        />
      <button 
        type='submit' 
        disabled={!formState.isValid} 
        className='course-form__submit'>
          Create Course
      </button>
      </form>
    </div>
  )
}

export default CreateCoursePage