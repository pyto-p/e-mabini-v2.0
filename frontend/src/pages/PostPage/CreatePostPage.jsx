import React, { useCallback, useReducer } from 'react';
import Input from '../../components/common/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../components/common/utils/validator';
import './PostForm.css';

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

function CreatePostPage() {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      header: {
        value: '',
        isValid: false
      },
      content: {
        value: '',
        isValid: false
      },
      typePost: {
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

  const postSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  return (
    <div className="post-form__page">
      <form className='post-form' onSubmit={postSubmitHandler}>
        <h2>Create Post</h2>
        <Input
          id="typePost"
          element="input"
          type="text"
          label="Type of Post"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter the type of post."
          onInput={inputHandler}
        />
        <Input
          id="header"
          element="input"
          type="text"
          label="Post Header"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a post header."
          onInput={inputHandler}
        />
        <Input
          id="content"
          element="textarea"
          label="Content"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter post content."
          onInput={inputHandler}
        />
        <button
          type='submit'
          disabled={!formState.isValid}
          className='post-form__submit'>
          Create Post
        </button>
      </form>
    </div>
  )
}

export default CreatePostPage;
