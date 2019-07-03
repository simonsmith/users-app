import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Input, Select} from './form';

export function UserEditForm({
  roleEntities,
  legendText,
  buttonText,
  onSubmit,
  clearOnSubmit = false,
  initialInputValues,
}) {
  const [inputState, setInputState] = useState(initialInputValues);
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const {value, id} = event.target;
    setInputState(state => ({...state, [id]: value}));
  };

  const clearForm = () => {
    const clearedInputs = Object.keys(initialInputValues).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setInputState(clearedInputs);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData = {
      ...inputState,
      role: roleEntities[inputState.role],
    };
    onSubmit(dispatch, formData);
    if (clearOnSubmit) {
      clearForm();
    }
  };

  const textInputs = [
    {label: 'Name', id: 'name'},
    {label: 'Username', id: 'username'},
    {label: 'Email', id: 'email', type: 'email'},
    {label: 'Telephone', id: 'phone', type: 'tel'},
    {label: 'Website', id: 'website'},
  ];

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>{legendText}</legend>
        {textInputs.map(input => (
          <Input
            required
            key={input.id}
            labelText={input.label}
            id={input.id}
            value={inputState[input.id]}
            onChange={handleInputChange}
            type={input.type || 'text'}
          />
        ))}
        <Select
          value={inputState.role}
          onChange={handleInputChange}
          id="role"
          labelText="Select a role"
        >
          {Object.entries(roleEntities).map(([id, role]) => {
            return (
              <option key={id} value={id}>
                {role.title}
              </option>
            );
          })}
        </Select>
        <button>{buttonText}</button>
      </fieldset>
    </form>
  );
}
