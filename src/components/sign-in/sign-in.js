/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-curly-newline */
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'

import * as actions from '../../actions'

import styles from './sign-in.module.scss'

function SignIn({
  emailSignIn,
  passwordSignIn,
  answer,
  userData,
  DATA_CLEAR,
  EMAIL_SIGN_IN_CHANGE,
  PASSWORD_SIGN_IN_CHANGE,
  SIGN_IN,
  SIGN_UP_CLEAR,
}) {
  useEffect(() => {
    SIGN_UP_CLEAR()
  }, [])

  // eslint-disable-next-line operator-linebreak
  const EMAIL_REGEXP =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  const emailValid = EMAIL_REGEXP.test(emailSignIn) && emailSignIn.length > 0
  const passwordValid = passwordSignIn && passwordSignIn.length > 0
  const generalValidation = emailValid && passwordValid

  const dispatch = useDispatch()
  const history = useHistory()

  let errorData = false

  if (answer) {
    localStorage.setItem('userData', JSON.stringify(userData))
    history.push('/')
  } else if (answer === false) {
    errorData = userData['email or password'] !== undefined
  }

  if (errorData) {
    const inputEmail = document.querySelector(
      `.${styles.signIn__form} .${styles.signIn__label}:nth-child(1) .${styles.signIn__input}`
    )
    const inputPassword = document.querySelector(
      `.${styles.signIn__form} .${styles.signIn__label}:nth-child(2) .${styles.signIn__input}`
    )
    const error = document.querySelector(
      `.${styles.signIn__form} .${styles.signIn__label}:nth-child(2) .${styles.signIn__error}`
    )
    inputEmail.classList.add(`${styles.signIn__input_error}`)
    inputPassword.classList.add(`${styles.signIn__input_error}`)
    error.nextElementSibling.classList.add(`${styles.signIn__error_visible}`)
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.signIn__title}>Sign In</div>
      <form className={styles.signIn__form}>
        <label className={styles.signIn__label}>
          Email address
          <input
            placeholder="Email address"
            type="email"
            className={styles.signIn__input}
            onChange={(event) => {
              DATA_CLEAR()
              event.target.classList.remove(`${styles.signIn__input_error}`)
              event.target.nextElementSibling.classList.remove(`${styles.signIn__error_visible}`)
              event.target.nextElementSibling.nextElementSibling.classList.remove(`${styles.signIn__error_visible}`)
              if (errorData) {
                const inputPassword = document.querySelector(
                  `.${styles.signIn__form} .${styles.signIn__label}:nth-child(2) .${styles.signIn__input}`
                )
                inputPassword.classList.remove(`${styles.signIn__input_error}`)
                const error = document.querySelector(
                  `.${styles.signIn__form} .${styles.signIn__label}:nth-child(2) .${styles.signIn__error}`
                )
                error.nextElementSibling.classList.remove(`${styles.signIn__error_visible}`)
              }
              EMAIL_SIGN_IN_CHANGE(event.target.value)
            }}
          />
          <div className={styles.signIn__error}>Your email is invalid.</div>
          <div className={styles.signIn__error}>The email field is empty.</div>
        </label>
        <label className={styles.signIn__label}>
          Password
          <input
            placeholder="Password"
            type="password"
            className={styles.signIn__input}
            onChange={(event) => {
              DATA_CLEAR()
              event.target.classList.remove(`${styles.signIn__input_error}`)
              event.target.nextElementSibling.classList.remove(`${styles.signIn__error_visible}`)
              event.target.nextElementSibling.nextElementSibling.classList.remove(`${styles.signIn__error_visible}`)
              if (errorData) {
                const inputEmail = document.querySelector(
                  `.${styles.signIn__form} .${styles.signIn__label}:nth-child(1) .${styles.signIn__input}`
                )
                inputEmail.classList.remove(`${styles.signIn__input_error}`)
              }
              PASSWORD_SIGN_IN_CHANGE(event.target.value)
            }}
          />
          <div className={styles.signIn__error}>The password field is empty.</div>
          <div className={styles.signIn__error}>Email or password is incorrect.</div>
        </label>
      </form>
      <div className={styles.signIn__submit}>
        <button
          type="submit"
          className={styles.signIn__button}
          onClick={() => {
            if (generalValidation) {
              dispatch((dispatched) => SIGN_IN(dispatched, emailSignIn, passwordSignIn))
            }

            if (!emailValid) {
              const input = document.querySelector(
                `.${styles.signIn__form} .${styles.signIn__label}:nth-child(1) .${styles.signIn__input}`
              )
              const error = document.querySelector(
                `.${styles.signIn__form} .${styles.signIn__label}:nth-child(1) .${styles.signIn__error}`
              )
              input.classList.add(`${styles.signIn__input_error}`)
              if (!emailSignIn) {
                error.nextElementSibling.classList.add(`${styles.signIn__error_visible}`)
              }
              if (!EMAIL_REGEXP.test(emailSignIn) && emailSignIn) {
                error.classList.add(`${styles.signIn__error_visible}`)
              }
            }

            if (!passwordValid) {
              const input = document.querySelector(
                `.${styles.signIn__form} .${styles.signIn__label}:nth-child(2) .${styles.signIn__input}`
              )
              input.classList.add(`${styles.signIn__input_error}`)
              const error = document.querySelector(
                `.${styles.signIn__form} .${styles.signIn__label}:nth-child(2) .${styles.signIn__error}`
              )

              error.classList.add(`${styles.signIn__error_visible}`)
            }
          }}
        >
          Login
        </button>
        <div className={styles.signIn__signUp}>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ signIn, server }) => {
  const { answer, userData } = server
  const { emailSignIn, passwordSignIn } = signIn
  return {
    emailSignIn,
    passwordSignIn,
    answer,
    userData,
  }
}

const mapDispatchToProps = (dispatch) => {
  // eslint-disable-next-line operator-linebreak
  const { EMAIL_SIGN_IN_CHANGE, PASSWORD_SIGN_IN_CHANGE, DATA_CLEAR, SIGN_UP_CLEAR } = bindActionCreators(
    actions,
    dispatch
  )
  const { SIGN_IN } = actions
  return {
    DATA_CLEAR,
    EMAIL_SIGN_IN_CHANGE,
    PASSWORD_SIGN_IN_CHANGE,
    SIGN_IN,
    SIGN_UP_CLEAR,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
