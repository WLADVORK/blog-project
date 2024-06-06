/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'

import styles from './header.module.scss'

function Header({ answer, userData, DATA_CLEAR, SIGN_UP_CLEAR, SIGN_IN_CLEAR, ARTICLE_CREATE_CLEAR }) {
  return (
    <div className={styles.header}>
      <Link
        to="/"
        className={styles.header__heading}
        onClick={() => {
          SIGN_UP_CLEAR()
          SIGN_IN_CLEAR()
          ARTICLE_CREATE_CLEAR()
        }}
      >
        Realworld Blog
      </Link>
      {answer ? (
        <>
          <Link
            to="/new-article"
            onClick={() => {
              ARTICLE_CREATE_CLEAR()
            }}
            className={styles.header__createArticle}
          >
            Create article
          </Link>
          <Link
            to="/profile"
            onClick={() => {
              ARTICLE_CREATE_CLEAR()
            }}
          >
            <div className={styles.header__profile}>
              <span className={styles.header__name}>{userData.user.username}</span>
              <img
                className={styles.header__icon}
                alt="profile-icon"
                src={userData.user.image ? `${userData.user.image}` : 'images/profile.svg'}
              />
            </div>
          </Link>
          <Link
            to="/"
            className={styles.header__logOut}
            onClick={() => {
              ARTICLE_CREATE_CLEAR()
              localStorage.removeItem('userData')
              DATA_CLEAR()
            }}
          >
            Log Out
          </Link>
        </>
      ) : (
        <>
          <Link to="/sign-in" className={styles.header__signIn}>
            Sign In
          </Link>
          <Link to="/sign-up" className={styles.header__signUp}>
            Sign Up
          </Link>
        </>
      )}
    </div>
  )
}

const mapStatetoProps = ({ server }) => ({
  answer: server.answer,
  userData: server.userData,
})

const mapDispatchToProps = (dispatch) => {
  const { DATA_CLEAR, SIGN_UP_CLEAR, SIGN_IN_CLEAR, ARTICLE_CREATE_CLEAR } = bindActionCreators(actions, dispatch)

  return {
    DATA_CLEAR,
    SIGN_UP_CLEAR,
    SIGN_IN_CLEAR,
    ARTICLE_CREATE_CLEAR,
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Header)
