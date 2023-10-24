// IMPORTS

import logo from './assets/logo.svg';
import './assets/app.css';

function App() {

  return (
    <div className="App">
      <Admin dataProvider={dataProvider}>
        +   <Resource name="users" list={ListGuesser} />
      </Admin>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
