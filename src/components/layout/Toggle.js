import React from 'react';
import Switch from 'react-switch';

export default function Toggle(props) {
  return (
    <label htmlFor="normal-switch">
      <h5 className="text-left">
        <span className="align-top">Alphabetic </span>
        <Switch
          onChange={props.handler}
          checked={props.checked}
          id="normal-switch"
        />
      </h5>
    </label >
  );
}
