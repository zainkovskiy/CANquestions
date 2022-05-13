import React from 'react';

import './Success.scss';

export function Success(props) {
  return (
    <div className='success'>
      <img
        className='success__img'
        src={props.url}
        alt="image"
      />
      <p className='success__text'>Ваше обращение успешно зарегистрировано</p>
    </div>
  )
}