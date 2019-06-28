import React from 'react';
import {UserList} from './components/user-list';
import {CreateUser} from './components/create-user';

function App() {
  return (
    <div className="App">
      <CreateUser />
      <UserList />
    </div>
  );
}

export default App;
