import React from 'react';
import ReactDOM from 'react-dom';
import App from './lib/App';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

require('./stylesheet/style.scss');

ReactDOM.render(<App />, document.getElementById('app'));
