import React from "react";

import './Title.scss';

export function Title() {
  return (<div className='title'>
    {
      dealId ?
        <>Проблема со сделкой { dealID }</> :
        <>Проблема с объектом { reqNumber }</>
    }
  </div>)
}