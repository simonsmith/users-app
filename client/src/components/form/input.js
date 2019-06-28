import React from 'react';

export function Input({id, labelText, ...restProps}) {
  return (
    <div>
      <label htmlFor={id}>{labelText}</label>
      <input type="text" id={id} {...restProps} />
    </div>
  );
}
