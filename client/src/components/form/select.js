import React from 'react';

export function Select({id, labelText, children, ...restProps}) {
  return (
    <div>
      <label htmlFor={id}>{labelText}</label>
      <select id={id} {...restProps}>
        {children}
      </select>
    </div>
  );
}
