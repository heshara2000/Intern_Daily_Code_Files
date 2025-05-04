import logo from './logo.svg';
import './App.css';
import {withLDProvider , useFlags} from 'launchdarkly-react-client-sdk';

function App() {
  const { imageSwitch} = useFlags();
  return (
    <div className="App">
      <header className="App-header">
        {imageSwitch ? (<img src={logo} className="App-logo" alt="logo" />) : (
        <img src={logo} className="App-logo" alt="logo" />)
        }
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

export default withLDProvider({
  clientSideID: '6816ff4865f043094619ec6a',
  options: {
    bootstrap: 'localStorage',
    // offline: false,
    // sendEvents: true,
    // updateOnPageLoad: true,
    // enableAutoPush: true,
  },
})(App);
