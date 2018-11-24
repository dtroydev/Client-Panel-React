import React from 'react';
import Switch from 'react-switch';

export default function Toggle(props) {
  return (
    <h5 className="h-100">
      <span className="align-top mr-1">Alphabetic</span>
      <Switch
        onChange={props.handler}
        checked={props.checked}
      />
    </h5>
  );
}
