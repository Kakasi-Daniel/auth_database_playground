import React, { useState, useEffect, useCallback } from 'react';
import DisplayCards from './components/DisplayCards.jsx';
import CardInput from './components/CardInput.jsx';
import database, { auth } from './firebase';
import rand from 'random-key';

function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [cards, setCards] = useState([]);
  const [authCredits, setAuthCredits] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(authUser =>{
      console.log(authUser);
      if(authUser){
        setUser(authUser);
        getCards().then((cardsArr) => {
          setCards(cardsArr);
        });

      }else{
          setUser(null)
          setCards([])
      }
    })
  }, [])

  async function getUsersList () {

    try{
      const users = await database.ref().child(`users/cfewgew`).get()
      console.log(users.val())
    }catch (err) {
    setError(err.message)
    }

  }

  function pushCard(card) {
    const newCard = { ...card, key: rand.generate() };

    database.ref(`cards/${newCard.key}`).set(newCard);

    setCards((prev) => {
      return [newCard, ...prev];
    });
  }

  async function signOut() {
    const user = await auth.signOut();
  }

  async function signIn() {
    const userCredentials = await auth.createUserWithEmailAndPassword(
      authCredits.email,
      authCredits.password
    );
  }
  function logIn() {
    console.log('login')
    const trylogin = async () => {
      const usrCred = await auth.signInWithEmailAndPassword(
        authCredits.email,
        authCredits.password
      );
    };

    trylogin()
      .then(() => {
        setError(null)
      })
      .catch((err) => setError(err.message));
  }

  const getCards = useCallback(async function () {

    
    const response = await database.ref().child('cards').get();
    const cardsObject = response.val();

    let cardsArray = [];

    for (let key in cardsObject) {
      cardsArray.push(cardsObject[key]);
    }

    return cardsArray;
  }, []);

  function deleteCard(key) {
    database.ref(`cards/${key}`).remove();
    setCards((prev) => prev.filter((card) => card.key !== key));
  }


  const submitHandler = (card) => {
    pushCard(card);
  };

  const removeCardHandler = (key) => {
    const indexToRemove = cards.findIndex((e) => e.key === key);
    let newCards = cards;
    newCards.splice(indexToRemove, 1);
    setCards([...newCards]);
    deleteCard(key);
  };

  return (
    <>
      {error && <p className='error' >{error}</p>}
      {user && (
        <div className="user">
          <div className="userEmail">{user.email}</div>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
      <div className="auth">
        <div className="email">
          <label htmlFor="email">Enter email:</label>
          <input
            onChange={(e) => {
              setAuthCredits((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
            id="email"
            type="email"
          />
        </div>
        <div className="pass">
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) => {
              setAuthCredits((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
            id="password"
            type="password"
          />
        </div>
        <button onClick={signIn}>Sign in</button>
        <button onClick={logIn}>Log in</button>
        <button onClick={getUsersList}>Get Users List</button>
      </div>

      <div className="app">
        <CardInput disabledInputs={!user} onSubmit={submitHandler} />
        <DisplayCards removeCard={removeCardHandler} cards={cards} />
      </div>
    </>
  );
}

export default App;
