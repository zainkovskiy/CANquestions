import React from "react";
import { Button } from "@mui/material";

import './Title.scss';

export function Title() {
  const handlerClick = () => {
    window.location.replace(`https://crm.centralnoe.ru/attention/?reqNumber=${reqNumber}&dealId=${dealId}&source=${source}`)
  }

  const getTitle = () => {
    if (dealId) {
      return `Проблема со сделкой ${dealId}`
    }
    if (reqNumber && reqNumber !== '1') {
      return `Проблема с объектом ${reqNumber}`
    }
    return `Обращение в СТП`
  }
  return (<div className='title'>
    {getTitle()}
    <Button
      size='small'
      variant='text'
      onClick={handlerClick}
      sx={{
        color: '#fff'
      }}
    >
      Назад
    </Button>
  </div>)
}