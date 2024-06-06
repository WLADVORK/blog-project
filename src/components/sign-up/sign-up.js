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

import styles from './sign-up.module.scss'

function SignUp({
  USERNAME_SIGN_UP_CHANGE,
  DATA_CLEAR,
  EMAIL_SIGN_UP_CHANGE,
  PASSWORD_SIGN_UP_CHANGE,
  PASSWORD_AGAIN_SIGN_UP_CHANGE,
  AGREEMENT_SIGN_UP_CHANGE,
  SIGN_UP,
  SIGN_IN_CLEAR,
  usernameSignUp,
  emailSignUp,
  passwordSignUp,
  passwordAgainSignUp,
  agreementSignUp,
  answer,
  userData,
}) {
  const dispatch = useDispatch()
  const history = useHistory()

  let usernameError = false
  let emailError = false

  useEffect(() => {
    if (answer) {
      history.push('/')
      localStorage.setItem('userData', JSON.stringify(userData))
    } else if (answer === false) {
      usernameError = userData.username !== undefined
      emailError = userData.email !== undefined
    }
    SIGN_IN_CLEAR()
  }, [])

  const USERNAME_REGEXP = /^[a-z0-9]*$/
  // eslint-disable-next-line operator-linebreak
  const EMAIL_REGEXP =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  const usernameValid = !!(
    usernameSignUp &&
    USERNAME_REGEXP.test(usernameSignUp) &&
    usernameSignUp.length >= 3 &&
    usernameSignUp.length <= 20
  )
  const emailValid = EMAIL_REGEXP.test(emailSignUp)
  const passwordValid = !!(passwordSignUp && passwordSignUp.length >= 6 && passwordSignUp.length <= 40)
  const passwordAgainValid = passwordSignUp === passwordAgainSignUp
  const generalValidation = usernameValid && emailValid && passwordValid && passwordAgainValid && agreementSignUp

  if (usernameError) {
    const input = document.querySelector(
      `.${styles.signUp__form} .${styles.signUp__label}:nth-child(1) .${styles.signUp__input}`
    )
    const error = document.querySelector(
      `.${styles.signUp__form} .${styles.signUp__label}:nth-child(1) .${styles.signUp__error}`
    )
    input.classList.add(`${styles.signUp__input_error}`)
    error.nextElementSibling.nextElementSibling.nextElementSibling.classList.add(`${styles.signUp__error_visible}`)
  }

  if (emailError) {
    const input = document.querySelector(
      `.${styles.signUp__form} .${styles.signUp__label}:nth-child(2) .${styles.signUp__input}`
    )
    const error = document.querySelector(
      `.${styles.signUp__form} .${styles.signUp__label}:nth-child(2) .${styles.signUp__error}`
    )
    input.classList.add(`${styles.signUp__input_error}`)
    error.nextElementSibling.classList.add(`${styles.signUp__error_visible}`)
  }

  return (
    <div className={styles.signUp}>
      <div className={styles.signUp__title}>Create new account</div>
      <form className={styles.signUp__form}>
        <label className={styles.signUp__label}>
          Username
          <input
            placeholder="Username"
            className={styles.signUp__input}
            onChange={(event) => {
              DATA_CLEAR()
              event.target.classList.remove(`${styles.signUp__input_error}`)
              event.target.nextElementSibling.classList.remove(`${styles.signUp__error_visible}`)
              event.target.nextElementSibling.nextElementSibling.classList.remove(`${styles.signUp__error_visible}`)
              event.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
                `${styles.signUp__error_visible}`
              )
              event.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
                `${styles.signUp__error_visible}`
              )

              USERNAME_SIGN_UP_CHANGE(event.target.value)
            }}
          />
          <div className={styles.signUp__error}>Your username must contain 3 or more characters.</div>
          <div className={styles.signUp__error}>Your username must contain 20 or less characters.</div>
          <div className={styles.signUp__error}>Your username is invalid.</div>
          <div className={styles.signUp__error}>This username is already taken.</div>
        </label>
        <label className={styles.signUp__label}>
          Email address
          <input
            placeholder="Email address"
            type="email"
            autoComplete="on"
            className={styles.signUp__input}
            onChange={(event) => {
              DATA_CLEAR()
              event.target.classList.remove(`${styles.signUp__input_error}`)
              event.target.nextElementSibling.classList.remove(`${styles.signUp__error_visible}`)
              event.target.nextElementSibling.nextElementSibling.classList.remove(`${styles.signUp__error_visible}`)
              EMAIL_SIGN_UP_CHANGE(event.target.value)
            }}
          />
          <div className={styles.signUp__error}>Your email is invalid.</div>
          <div className={styles.signUp__error}>This email is already taken.</div>
        </label>
        <label className={styles.signUp__label}>
          Password
          <input
            placeholder="Password"
            type="password"
            autoComplete="on"
            className={styles.signUp__input}
            onChange={(event) => {
              if (!passwordValid) {
                event.target.classList.remove(`${styles.signUp__input_error}`)
                event.target.nextElementSibling.classList.remove(`${styles.signUp__error_visible}`)
                event.target.nextElementSibling.nextElementSibling.classList.remove(`${styles.signUp__error_visible}`)
              }
              PASSWORD_SIGN_UP_CHANGE(event.target.value)
            }}
          />
          <div className={styles.signUp__error}>Your password must contain 6 or more characters.</div>
          <div className={styles.signUp__error}>Your password must contain 40 or less characters.</div>
        </label>
        <label className={styles.signUp__label}>
          Repeat Password
          <input
            placeholder="Password"
            type="password"
            autoComplete="on"
            className={styles.signUp__input}
            onChange={(event) => {
              if (!passwordAgainValid) {
                event.target.classList.remove(`${styles.signUp__input_error}`)
                event.target.nextElementSibling.classList.remove(`${styles.signUp__error_visible}`)
              }
              PASSWORD_AGAIN_SIGN_UP_CHANGE(event.target.value)
            }}
          />
          <div className={styles.signUp__error}>Passwords must match.</div>
        </label>
        <div className={styles.signUp__line} />
        <label className={styles.signUp__agreement}>
          <input
            type="checkbox"
            className={styles.signUp__checkbox}
            onChange={(event) => {
              if (event.target.checked) {
                event.target.parentElement.classList.remove(`${styles.signUp__agreement_error}`)
                AGREEMENT_SIGN_UP_CHANGE(true)
              } else {
                AGREEMENT_SIGN_UP_CHANGE(false)
              }
            }}
          />
          <div className={styles.signUp__realCheckbox}>
            <img className={styles.signUp__mark} src="images/mark.svg" alt="mark-icon" />
          </div>
          I agree to the processing of my personal information
        </label>
      </form>
      <div className={styles.signUp__submit}>
        <button
          type="submit"
          className={styles.signUp__button}
          onClick={() => {
            if (generalValidation) {
              dispatch((dispatched) => SIGN_UP(dispatched, usernameSignUp, emailSignUp, passwordSignUp))
            }

            if (!usernameValid) {
              const input = document.querySelector(
                `.${styles.signUp__form} .${styles.signUp__label}:nth-child(1) .${styles.signUp__input}`
              )
              input.classList.add(`${styles.signUp__input_error}`)
              const error = document.querySelector(
                `.${styles.signUp__form} .${styles.signUp__label}:nth-child(1) .${styles.signUp__error}`
              )
              if (!usernameSignUp || usernameSignUp.length < 3) {
                error.classList.add(`${styles.signUp__error_visible}`)
              } else if (usernameSignUp.length > 20) {
                error.nextElementSibling.classList.add(`${styles.signUp__error_visible}`)
              } else {
                error.nextElementSibling.nextElementSibling.classList.add(`${styles.signUp__error_visible}`)
              }
            }

            if (!emailValid) {
              const input = document.querySelector(
                `.${styles.signUp__form} .${styles.signUp__label}:nth-child(2) .${styles.signUp__input}`
              )
              const error = document.querySelector(
                `.${styles.signUp__form} .${styles.signUp__label}:nth-child(2) .${styles.signUp__error}`
              )
              input.classList.add(`${styles.signUp__input_error}`)

              error.classList.add(`${styles.signUp__error_visible}`)
            }

            if (!passwordValid) {
              const input = document.querySelector(
                `.${styles.signUp__form} .${styles.signUp__label}:nth-child(3) .${styles.signUp__input}`
              )
              input.classList.add(`${styles.signUp__input_error}`)
              const error = document.querySelector(
                `.${styles.signUp__form} .${styles.signUp__label}:nth-child(3) .${styles.signUp__error}`
              )
              if (!passwordSignUp || passwordSignUp.length < 6) {
                error.classList.add(`${styles.signUp__error_visible}`)
              } else {
                error.nextElementSibling.classList.add(`${styles.signUp__error_visible}`)
              }
            }

            if (!passwordAgainValid) {
              const input = document.querySelector(
                `.${styles.signUp__form} .${styles.signUp__label}:nth-child(4) .${styles.signUp__input}`
              )
              input.classList.add(`${styles.signUp__input_error}`)
              const error = document.querySelector(
                `.${styles.signUp__form} .${styles.signUp__label}:nth-child(4) .${styles.signUp__error}`
              )
              error.classList.add(`${styles.signUp__error_visible}`)
            }

            if (!agreementSignUp) {
              const label = document.querySelector(`.${styles.signUp__form} .${styles.signUp__agreement}`)
              label.classList.add(`${styles.signUp__agreement_error}`)
            }
          }}
        >
          Create
        </button>
        <div className={styles.signUp__signIn}>
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ signUp, server }) => {
  const { answer, userData } = server
  const { usernameSignUp, emailSignUp, passwordSignUp, passwordAgainSignUp, agreementSignUp } = signUp
  return {
    usernameSignUp,
    emailSignUp,
    passwordSignUp,
    passwordAgainSignUp,
    agreementSignUp,
    answer,
    userData,
  }
}

const mapDispatchToProps = (dispatch) => {
  // eslint-disable-next-line operator-linebreak
  const {
    USERNAME_SIGN_UP_CHANGE,
    EMAIL_SIGN_UP_CHANGE,
    PASSWORD_SIGN_UP_CHANGE,
    PASSWORD_AGAIN_SIGN_UP_CHANGE,
    AGREEMENT_SIGN_UP_CHANGE,
    DATA_CLEAR,
    SIGN_IN_CLEAR,
  } = bindActionCreators(actions, dispatch)
  const { SIGN_UP } = actions
  return {
    USERNAME_SIGN_UP_CHANGE,
    DATA_CLEAR,
    EMAIL_SIGN_UP_CHANGE,
    PASSWORD_SIGN_UP_CHANGE,
    PASSWORD_AGAIN_SIGN_UP_CHANGE,
    AGREEMENT_SIGN_UP_CHANGE,
    SIGN_UP,
    SIGN_IN_CLEAR,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
