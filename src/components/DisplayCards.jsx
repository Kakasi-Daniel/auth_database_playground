import React from 'react';
import Card from './Card.jsx';

function DisplayCards(props) {
  const removeHandler = (key) => {
    return function (e) {
      props.removeCard(key);
    };
  };

  return (
    <>
      {props.cards.map((card) => {
        return (
  
          <Card
            key={card.key}
            remove={removeHandler(card.key)}
            title={card.title}
            author={card.author}
            text={card.text}
          />
        );
      })}
    </>
  );
}

export default DisplayCards;
