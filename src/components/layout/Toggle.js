import React from 'react';
import Switch from 'react-switch';

const Toggle = props => (
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

export default Toggle;
