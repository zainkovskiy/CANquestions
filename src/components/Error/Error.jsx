import React from "react";

import "./Error.scss";

export function Error(props) {
  return (
    <div className="error">
      <img
        className="error__img"
        src={ props.url }
        alt="error" 
      />
    </div>
  )
}