import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createNewUser, selectRoles} from '../store/users';
import {useShallowEqualSelector} from '../util/use-shallow-equal-selector';
import {Input, Select} from './form';

export function CreateUser() {
  const [inputState, setInputState] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    role: '',
  });
  const dispatch = useDispatch();
  const {entities: roleEntities} = useShallowEqualSelector(selectRoles);

  const handleInputChange = event => {
    const {value, id} = event.target;
    setInputState(state => ({...state, [id]: value}));
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(createNewUser(inputState));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        labelText="Name"
        id="name"
        value={inputState.name}
        onChange={handleInputChange}
      />
      <Input
        labelText="Username"
        id="username"
        value={inputState.username}
        onChange={handleInputChange}
      />
      <Input
        labelText="Email"
        id="email"
        value={inputState.email}
        onChange={handleInputChange}
        type="email"
      />
      <Input
        labelText="Telephone"
        id="phone"
        value={inputState.phone}
        onChange={handleInputChange}
        type="tel"
      />
      <Input
        labelText="Website"
        id="website"
        value={inputState.website}
        onChange={handleInputChange}
      />
      <Select
        value={inputState.role}
        onChange={handleInputChange}
        id="role"
        labelText="Select a role"
      >
        {roleEntities &&
          Object.entries(roleEntities).map(([id, role]) => {
            return (
              <option key={id} value={id}>
                {role.title}
              </option>
            );
          })}
      </Select>
      <button>Create</button>
    </form>
  );
}
