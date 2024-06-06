/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-curly-newline */
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'

import * as actions from '../../actions'

import styles from './profile-edit.module.scss'

function ProfileEdit({
  emailProfile,
  passwordProfile,
  usernameProfile,
  imageProfile,
  editComplete,
  newUserData,
  userData,
  USERNAME_PROFILE_EDIT_CHANGE,
  EMAIL_PROFILE_EDIT_CHANGE,
  DATA_SET,
  PASSWORD_PROFILE_EDIT_CHANGE,
  IMAGE_PROFILE_EDIT_CHANGE,
  PROFILE_EDIT,
  PROFILE_EDIT_CLEAR,
}) {
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('userData'))) {
      const { user } = JSON.parse(localStorage.getItem('userData'))
      USERNAME_PROFILE_EDIT_CHANGE(user.username)
      EMAIL_PROFILE_EDIT_CHANGE(user.email)
      PASSWORD_PROFILE_EDIT_CHANGE(user.password)
      if (user.image) {
        IMAGE_PROFILE_EDIT_CHANGE(user.image)
      }
    }
  }, [])
  const USERNAME_REGEXP = /^[a-z0-9]*$/
  const usernameValid =
    usernameProfile &&
    usernameProfile.length > 2 &&
    usernameProfile.length < 21 &&
    USERNAME_REGEXP.test(usernameProfile)
  // eslint-disable-next-line operator-linebreak
  const EMAIL_REGEXP =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  const emailValid = EMAIL_REGEXP.test(emailProfile)
  const passwordValid =
    (passwordProfile && passwordProfile.length < 41 && passwordProfile.length > 5) || !passwordProfile
  const IMAGE_REGEXP = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
  const imageValid = IMAGE_REGEXP.test(imageProfile) || !imageProfile
  const generalValidation = usernameValid && emailValid && passwordValid && imageValid

  const dispatch = useDispatch()
  const history = useHistory()

  let usernameError = false
  let emailError = false

  if (!JSON.parse(localStorage.getItem('userData'))) {
    history.push('/sign-in')
  }

  if (editComplete) {
    localStorage.setItem('userData', JSON.stringify(newUserData))
    DATA_SET(newUserData, true)
    history.push('/')
    PROFILE_EDIT_CLEAR()
  } else if (editComplete === false) {
    usernameError = newUserData.username !== undefined
    emailError = newUserData.email !== undefined
  }

  if (usernameError) {
    const input = document.querySelector(
      `.${styles.profile__form} .${styles.profile__label}:nth-child(1) .${styles.profile__input}`
    )
    const error = document.querySelector(
      `.${styles.profile__form} .${styles.profile__label}:nth-child(1) .${styles.profile__error}`
    )
    input.classList.add(`${styles.profile__input_error}`)
    error.nextElementSibling.nextElementSibling.nextElementSibling.classList.add(`${styles.profile__error_visible}`)
  }

  if (emailError) {
    const input = document.querySelector(
      `.${styles.profile__form} .${styles.profile__label}:nth-child(2) .${styles.profile__input}`
    )
    const error = document.querySelector(
      `.${styles.profile__form} .${styles.profile__label}:nth-child(2) .${styles.profile__error}`
    )
    input.classList.add(`${styles.profile__input_error}`)
    error.nextElementSibling.nextElementSibling.classList.add(`${styles.profile__error_visible}`)
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profile__title}>Edit Profile</div>
      <form className={styles.profile__form}>
        <label className={styles.profile__label}>
          Username
          <input
            placeholder="Username"
            className={styles.profile__input}
            value={usernameProfile || ''}
            onChange={(event) => {
              PROFILE_EDIT_CLEAR()
              event.target.classList.remove(`${styles.profile__input_error}`)
              event.target.nextElementSibling.classList.remove(`${styles.profile__error_visible}`)
              event.target.nextElementSibling.nextElementSibling.classList.remove(`${styles.profile__error_visible}`)
              event.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
                `${styles.profile__error_visible}`
              )
              event.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
                `${styles.profile__error_visible}`
              )
              USERNAME_PROFILE_EDIT_CHANGE(event.target.value)
            }}
          />
          <div className={styles.profile__error}>Your username must contain 3 or more characters.</div>
          <div className={styles.profile__error}>Your username must contain 20 or less characters.</div>
          <div className={styles.profile__error}>Your username is invalid.</div>
          <div className={styles.profile__error}>This username is already taken.</div>
        </label>
        <label className={styles.profile__label}>
          Email address
          <input
            placeholder="Email address"
            type="email"
            value={emailProfile || ''}
            className={styles.profile__input}
            onChange={(event) => {
              PROFILE_EDIT_CLEAR()
              event.target.classList.remove(`${styles.profile__input_error}`)
              event.target.nextElementSibling.classList.remove(`${styles.profile__error_visible}`)
              event.target.nextElementSibling.nextElementSibling.classList.remove(`${styles.profile__error_visible}`)
              event.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
                `${styles.profile__error_visible}`
              )
              EMAIL_PROFILE_EDIT_CHANGE(event.target.value)
            }}
          />
          <div className={styles.profile__error}>Your email is invalid.</div>
          <div className={styles.profile__error}>The email field is empty.</div>
          <div className={styles.profile__error}>This email is already taken.</div>
        </label>
        <label className={styles.profile__label}>
          New password
          <input
            placeholder="New password"
            type="password"
            className={styles.profile__input}
            onChange={(event) => {
              PROFILE_EDIT_CLEAR()
              event.target.classList.remove(`${styles.profile__input_error}`)
              event.target.nextElementSibling.classList.remove(`${styles.profile__error_visible}`)
              event.target.nextElementSibling.nextElementSibling.classList.remove(`${styles.profile__error_visible}`)
              PASSWORD_PROFILE_EDIT_CHANGE(event.target.value)
            }}
          />
          <div className={styles.profile__error}>Your password must contain 6 or more characters.</div>
          <div className={styles.profile__error}>Your password must contain 40 or less characters.</div>
        </label>
        <label className={styles.profile__label}>
          Avatar image (url)
          <input
            placeholder="Avatar image"
            className={styles.profile__input}
            value={imageProfile || ''}
            onChange={(event) => {
              PROFILE_EDIT_CLEAR()
              event.target.classList.remove(`${styles.profile__input_error}`)
              event.target.nextElementSibling.classList.remove(`${styles.profile__error_visible}`)
              IMAGE_PROFILE_EDIT_CHANGE(event.target.value)
            }}
          />
          <div className={styles.profile__error}>Your url is invalid.</div>
        </label>
      </form>
      <div className={styles.profile__submit}>
        <button
          type="submit"
          className={styles.profile__button}
          onClick={() => {
            if (generalValidation) {
              dispatch(
                (dispatched) =>
                  // eslint-disable-next-line implicit-arrow-linebreak
                  PROFILE_EDIT(
                    dispatched,
                    userData.user.token,
                    usernameProfile,
                    emailProfile,
                    passwordProfile,
                    imageProfile
                  )
                // eslint-disable-next-line function-paren-newline
              )
            }

            if (!usernameValid) {
              const input = document.querySelector(
                `.${styles.profile__form} .${styles.profile__label}:nth-child(1) .${styles.profile__input}`
              )
              const error = document.querySelector(
                `.${styles.profile__form} .${styles.profile__label}:nth-child(1) .${styles.profile__error}`
              )
              input.classList.add(`${styles.profile__input_error}`)
              if (!usernameProfile || usernameProfile.length < 3) {
                error.classList.add(`${styles.profile__error_visible}`)
              } else if (usernameProfile.length > 20) {
                error.nextElementSibling.classList.add(`${styles.profile__error_visible}`)
              } else {
                error.nextElementSibling.nextElementSibling.classList.add(`${styles.profile__error_visible}`)
              }
            }

            if (!emailValid) {
              const input = document.querySelector(
                `.${styles.profile__form} .${styles.profile__label}:nth-child(2) .${styles.profile__input}`
              )
              const error = document.querySelector(
                `.${styles.profile__form} .${styles.profile__label}:nth-child(2) .${styles.profile__error}`
              )
              input.classList.add(`${styles.profile__input_error}`)
              if (!emailProfile) {
                error.nextElementSibling.classList.add(`${styles.profile__error_visible}`)
              }
              if (!EMAIL_REGEXP.test(emailProfile) && emailProfile) {
                error.classList.add(`${styles.profile__error_visible}`)
              }
            }

            if (!passwordValid) {
              const input = document.querySelector(
                `.${styles.profile__form} .${styles.profile__label}:nth-child(3) .${styles.profile__input}`
              )
              input.classList.add(`${styles.profile__input_error}`)
              const error = document.querySelector(
                `.${styles.profile__form} .${styles.profile__label}:nth-child(3) .${styles.profile__error}`
              )

              if (!passwordProfile || passwordProfile.length < 6) {
                error.classList.add(`${styles.profile__error_visible}`)
              } else {
                error.nextElementSibling.classList.add(`${styles.profile__error_visible}`)
              }
            }

            if (!imageValid) {
              const input = document.querySelector(
                `.${styles.profile__form} .${styles.profile__label}:nth-child(4) .${styles.profile__input}`
              )
              input.classList.add(`${styles.profile__input_error}`)
              const error = document.querySelector(
                `.${styles.profile__form} .${styles.profile__label}:nth-child(4) .${styles.profile__error}`
              )
              error.classList.add(`${styles.profile__error_visible}`)
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ profileEdit, server }) => {
  const { answer, userData } = server
  const { emailProfile, passwordProfile, usernameProfile, imageProfile, editComplete, newUserData } = profileEdit
  return {
    emailProfile,
    passwordProfile,
    answer,
    userData,
    usernameProfile,
    imageProfile,
    editComplete,
    newUserData,
  }
}

const mapDispatchToProps = (dispatch) => {
  // eslint-disable-next-line operator-linebreak
  const {
    USERNAME_PROFILE_EDIT_CHANGE,
    EMAIL_PROFILE_EDIT_CHANGE,
    DATA_CLEAR,
    PASSWORD_PROFILE_EDIT_CHANGE,
    IMAGE_PROFILE_EDIT_CHANGE,
    PROFILE_EDIT_CLEAR,
    DATA_SET,
  } = bindActionCreators(actions, dispatch)
  const { PROFILE_EDIT } = actions
  return {
    DATA_CLEAR,
    USERNAME_PROFILE_EDIT_CHANGE,
    EMAIL_PROFILE_EDIT_CHANGE,
    PASSWORD_PROFILE_EDIT_CHANGE,
    IMAGE_PROFILE_EDIT_CHANGE,
    PROFILE_EDIT,
    PROFILE_EDIT_CLEAR,
    DATA_SET,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)
