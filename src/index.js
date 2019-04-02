import React from 'react'
import ReactDOM from 'react-dom'

import Provider from './components/Provider'
import configureStore from './configureStore'
import App from './components/App'

import './index.css'

ReactDOM.render(
  <Provider store={configureStore()}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

