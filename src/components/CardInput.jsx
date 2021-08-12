import React, { useState } from 'react';
import styled from "styled-components";
import classes from './CardInput.module.scss';
import {auth} from '../firebase'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-between;
  
  
  & input{
    text-align: center;
  }
  


`;

const CardInput = (props) => {
  const [card, setCard] = useState({
    title: '',
    author: '',
    text: '',
    date: ''
  });

  const checkValid = () =>{
    if(card.title.trim().length > 3 && card.author.trim().length > 3 && card.text.trim().length > 20 && card.date !== ''){
      return true
    }
    return false
  }

  const inputHandlerGenerator = (type) => {
    return function (e) {
      
      
      setCard((prev) => {
        return {
          ...prev,
          [type]: e.target.value,
        };
      });
    }
  };

  const submitHandler = (e) => { 
    e.preventDefault();
    props.onSubmit(card);
    // setCard({
    //   title: '',
    //   author: '',
    //   text: '',
    //   date: ''
    // });
  };

  return (
    <Form  className={classes['card']} onSubmit={submitHandler}  >
      <input
        onChange={inputHandlerGenerator('title')}
        value={card.title}
        placeholder="title"
        type="text"
        disabled={props.disabledInputs}
      />
      <input
        onChange={inputHandlerGenerator('text')}
        value={card.text}
        placeholder="text (minimum 20chars)"
        type="text"
        disabled={props.disabledInputs}
      />
      {auth.currentUser && (card.text.trim().length < 20 && <p>Text should be at least 20 characters</p>)}
      <input
        onChange={inputHandlerGenerator('author')}
        value={card.author}
        placeholder="author"
        type="text"
        disabled={props.disabledInputs}
      /> 
      <input onChange={inputHandlerGenerator('date')} 
      placeholder="date"
      value={card.date}
      type="date"
      disabled={props.disabledInputs}/>
      <button  disabled={!(checkValid() && auth.currentUser)} type="submit">Add Card</button>
    </Form>
  );
};

export default CardInput;
