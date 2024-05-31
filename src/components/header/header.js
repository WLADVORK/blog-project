/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './header.scss'

function Header() {
  return (
    <div className="header">
      <span className="header__heading">
        <Link to="/">Realworld Blog</Link>
      </span>
      <span className="header__signIn">Sign In</span>
      <span className="header__signUp">Sign Up</span>
    </div>
  )
}

export default Header
