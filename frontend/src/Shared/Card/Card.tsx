import React from 'react';
import './Card.scss';

function Card(props: any) {
  return (
    <div className='card'>
      <span className='title'>{props.title}</span>
      {props.children}
    </div>
  );
}
export default Card;
