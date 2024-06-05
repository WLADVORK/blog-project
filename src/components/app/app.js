/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Main from '../main'
import Header from '../header'
import { DATA_SET } from '../../actions'

import './app.scss'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('userData') !== null) {
      const userData = JSON.parse(localStorage.getItem('userData'))
      dispatch(DATA_SET(userData, true))
    }
  }, [])
  return (
    <Router>
      <Header />
      <Main />
    </Router>
  )
}

export default App
