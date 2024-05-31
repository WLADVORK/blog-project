/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min'

import Header from '../header'
import Main from '../main'

import './app.scss'

function App() {
  return (
    <Router>
      <Header />
      <Main />
    </Router>
  )
}

export default App
