import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Routes from './routes';

function App() {

  return (
    <Routes></Routes>
  );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
