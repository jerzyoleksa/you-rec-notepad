import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppX from './AppX';
import AppZ from './AppZ';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker(); //uncomment and you might get CORS issues (503) LOCALLY
