import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../components/common/FormElements/Input';
import { useForm } from '../../components/common/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../components/common/utils/validator';
import { POSTS } from '../../dummyData';
import './PostForm.css';

function UpdatePostPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { courseid, postid } = useParams();


  const [formState, inputHandler, setFormData] = useForm({
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
    }
  }, false);

  const identifiedPost = POSTS.find(post => {
    return post.code.toLowerCase().replace(/\s/g, "") === courseid.toLowerCase().replace(/\s/g, "") && post.id === parseInt(postid);
  });

  useEffect(() => {
    if (identifiedPost) {
      setFormData({
        header: {
          value: identifiedPost.header,
          isValid: true
        },
        content: {
          value: identifiedPost.content,
          isValid: true
        },
        typePost: {
          value: identifiedPost.typePost,
          isValid: true
        }
      }, true);
      setIsLoading(false);
    }
  }, [setFormData, identifiedPost]);

  const postUpdateHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  if (!identifiedPost) {
    return <h2 className='center'>Post not found</h2>;
  }

  if (isLoading) {
    return <h2 className='center'>Loading</h2>;
  }

  return (
    <div className="post-form__page">
      <form className='post-form' onSubmit={postUpdateHandler}>
        <h2>Update Post</h2>
        <Input
          id="typePost"
          element="input"
          type="text"
          label="Author"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter the typePost's name."
          onInput={inputHandler}
          initialValue={formState.inputs.typePost.value}
          initialValid={formState.inputs.typePost.isValid}
        />
        <Input
          id="header"
          element="input"
          type="text"
          label="Post Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid header."
          onInput={inputHandler}
          initialValue={formState.inputs.header.value}
          initialValid={formState.inputs.header.isValid}
        />
        <Input
          id="content"
          element="textarea"
          label="Content"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter content."
          onInput={inputHandler}
          initialValue={formState.inputs.content.value}
          initialValid={formState.inputs.content.isValid}
        />
        <button
          type='submit'
          disabled={!formState.isValid}
          className='post-form__submit'>
          Update Post
        </button>
      </form>
    </div>
  )
}

export default UpdatePostPage;
