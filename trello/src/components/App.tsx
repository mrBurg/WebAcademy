import React from 'react';
import './App.scss';
import Logo from '../svg/my-trello-logo.svg';

const App: React.FC = () => {
  return (
    <>
      <header className="App-header">
        <img src={Logo} alt="Logo" />
      </header>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia et
        optio suscipit quisquam aliquam consectetur reiciendis pariatur neque
        doloremque ut exercitationem, cumque ullam fugiat atque unde eius,
        dolorem cum voluptate.
      </div>
    </>
  );
};

export default App;
