import React from "react";

import './Title.scss';

export function Title() {
  const getTitle = () => {
    if (dealId) {
      return `Проблема со сделкой ${ dealId }`
    }
    if (reqNumber && reqNumber !== '1') {
      return `Проблема с объектом ${ reqNumber }`
    }
    return `Обращение в СТП`
  }
  return (<div className='title'>
    { getTitle() }
  </div>)
}