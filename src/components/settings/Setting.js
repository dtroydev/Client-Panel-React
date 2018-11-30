import React from 'react';

export default function Setting(props) {
  const {
    description,
    handler,
    value,
  } = props;

  return (
    <div className="row justify-content-between align-items-center">
      <h5>{description}</h5>
      <div
        className="d-inline-block ml-3 text-primary"
        onClick={handler}
        id="registration">{
          value
            ? <i className="far fa-check-square fa-2x"></i>
            : <i className="far fa-square fa-2x"></i>
        }</div>
    </div>
  );
}
