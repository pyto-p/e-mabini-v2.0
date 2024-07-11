import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../components/common/FormElements/Input';
import { useForm } from '../../components/common/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../components/common/utils/validator';
import { COURSES } from '../../dummyData';
import './CourseForm.css';

function UpdateCoursePage() {
  const [isLoading, setIsLoading] = useState(true);
  const courseid = useParams().courseid;

  const [formState, inputHandler, setFormData] = useForm({
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
  }, false);

  const identifiedCourse = COURSES.find(course => course.code.toLowerCase().replace(/\s/g, "") === courseid.toLowerCase());

  useEffect(() => { 
    setFormData({
      code: {
        value: identifiedCourse.code,
        isValid: true
      },
      name: {
        value: identifiedCourse.name,
        isValid: true
      },
      section: {
        value: identifiedCourse.section,
        isValid: true
      },
      schedday: {
        value: identifiedCourse.schedday,
        isValid: true
      },
      schedtime: {
        value: identifiedCourse.schedtime,
        isValid: true
      },
    }, true);
    setIsLoading(false);
  }, [setFormData, identifiedCourse]);

  const courseUpdateHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  if (!identifiedCourse) {
    return <h2 className='center'>Course not found</h2>;
  }

  if (isLoading) {
    return <h2 className='center'>Loading</h2>;
  }

  return (
    <div className="course-form__page">
      <form className='course-form' onSubmit={courseUpdateHandler}>
        <Input
          id="code"
          element="input"
          type="text"
          label="Course Code"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid course code."
          onInput={inputHandler}
          initialValue={formState.inputs.code.value}
          initialValid={formState.inputs.code.isValid}
        />
        <Input
          id="name"
          element="input"
          type="text"
          label="Course Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid course name."
          onInput={inputHandler}
          initialValue={formState.inputs.name.value}
          initialValid={formState.inputs.name.isValid}
        />
        <Input
          id="section"
          element="input"
          type="text"
          label="Section"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid course section."
          onInput={inputHandler}
          initialValue={formState.inputs.section.value}
          initialValid={formState.inputs.section.isValid}
        />
        <Input
          id="schedday"
          element="input"
          type="text"
          label="Schedule Day"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid schedule day."
          onInput={inputHandler}
          initialValue={formState.inputs.schedday.value}
          initialValid={formState.inputs.schedday.isValid}
        />
        <Input
          id="schedtime"
          element="input"
          type="text"
          label="Schedule Time"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid schedule time."
          onInput={inputHandler}
          initialValue={formState.inputs.schedtime.value}
          initialValid={formState.inputs.schedtime.isValid}
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

export default UpdateCoursePage