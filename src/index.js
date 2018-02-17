import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MyRead from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><MyRead /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
