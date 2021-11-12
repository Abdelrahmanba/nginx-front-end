import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './pages/homePage/home'
function App() {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  )
}

export default App
