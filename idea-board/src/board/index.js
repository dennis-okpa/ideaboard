import React, { useReducer, useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import reducer from './reducer/';
import Ideas from './ideas';
import moment from 'moment';

export const Context = React.createContext();

const Board = props => {
  const [ideas, dispatch] = useReducer(reducer(moment), []);
  const [count, setCount] = useState(0);

  useEffect(()=>{
    const storedIdeas = localStorage.getItem('ideas');
    dispatch({type:'reset', payload: JSON.parse(storedIdeas) });
  }, []);

  useEffect(()=>{
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }, [ideas]);

  useEffect(()=>{
    const textBoxes = document.body.querySelector("input");
    if(textBoxes) textBoxes.focus();
  }, [count]);

  return (
    <Context.Provider value={dispatch}>
      <Button onClick={()=>{dispatch({type:'add'}); setCount(count+1);}}>Add</Button>
      <Button onClick={()=>dispatch({type:'orderByCreationDate'})}>Order By Date</Button>
      <Button onClick={()=>dispatch({type:'orderByTitle'})}>Order By Title</Button>
      <Container className='board'>
        <Ideas ideas={ideas} />
      </Container>
    </Context.Provider>
  )
};

export default Board;
