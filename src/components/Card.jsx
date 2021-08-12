import React from 'react';
import styles from './Card.module.scss';

function  Card(props) {

  return (
    <div className={styles.card}>
      <h1>{props.title}</h1>
      <p>
        {props.text}
      </p>
      <em>{props.date}</em>
      <div className={styles.lower}>by {props.author}</div>
      <button onClick={props.remove} >Remove</button>
    </div>
  );
}

export default Card;
