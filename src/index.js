import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './theme/index.scss'
import './theme/_antOverride.scss'
import App from './App'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
