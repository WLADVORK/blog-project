import { combineReducers } from 'redux'

/* eslint-disable indent */
const initialStatePagination = {
  page: 1,
}

const paginationReducer = (state = initialStatePagination, action) => {
  switch (action.type) {
    case 'INC_PAGE':
      return {
        page: state.page + action.payload,
      }
    case 'DEC_PAGE':
      return {
        page: state.page - action.payload,
      }
    default:
      return state
  }
}

const initialStateServer = {
  articles: [],
  maxPage: 100000000,
  userData: null,
  answer: null,
}

const serverReducer = (state = initialStateServer, action) => {
  switch (action.type) {
    case 'GET_ARTICLES':
      if (action.payload1 === state.maxPage) {
        return {
          ...state,
          articles: [...action.payload],
        }
      }
      return {
        ...state,
        articles: [...action.payload],
        maxPage: Math.ceil(action.payload1 / 20),
      }
    case 'SIGN_UP':
    case 'SIGN_IN':
    case 'DATA_SET':
      return { ...state, userData: action.payload, answer: action.payload1 }
    case 'DATA_CLEAR':
      return { ...state, userData: null, answer: null }
    default:
      return state
  }
}

const initialStateSignUp = {
  usernameSignUp: null,
  emailSignUp: null,
  passwordSignUp: null,
  passwordAgainSignUp: null,
  agreementSignUp: false,
}

const signUpReducer = (state = initialStateSignUp, action) => {
  switch (action.type) {
    case 'USERNAME_SIGN_UP_CHANGE':
      return { ...state, usernameSignUp: action.payload }
    case 'EMAIL_SIGN_UP_CHANGE':
      return { ...state, emailSignUp: action.payload }
    case 'PASSWORD_SIGN_UP_CHANGE':
      return { ...state, passwordSignUp: action.payload }
    case 'PASSWORD_AGAIN_SIGN_UP_CHANGE':
      return { ...state, passwordAgainSignUp: action.payload }
    case 'AGREEMENT_SIGN_UP_CHANGE':
      return { ...state, agreementSignUp: action.payload }
    case 'SIGN_UP_CLEAR':
      return initialStateSignUp
    default:
      return state
  }
}

const initialStateSignIn = {
  emailSignIn: null,
  passwordSignIn: null,
}

const signInReducer = (state = initialStateSignIn, action) => {
  switch (action.type) {
    case 'EMAIL_SIGN_IN_CHANGE':
      return { ...state, emailSignIn: action.payload }
    case 'PASSWORD_SIGN_IN_CHANGE':
      return { ...state, passwordSignIn: action.payload }
    case 'SIGN_IN_CLEAR':
      return initialStateSignIn
    default:
      return state
  }
}

const initialStateProfileEdit = {
  usernameProfile: null,
  emailProfile: null,
  passwordProfile: null,
  imageProfile: null,
  editComplete: null,
  newUserData: null,
}

const profileEditReducer = (state = initialStateProfileEdit, action) => {
  switch (action.type) {
    case 'USERNAME_PROFILE_EDIT_CHANGE':
      return { ...state, usernameProfile: action.payload }
    case 'EMAIL_PROFILE_EDIT_CHANGE':
      return { ...state, emailProfile: action.payload }
    case 'PASSWORD_PROFILE_EDIT_CHANGE':
      return { ...state, passwordProfile: action.payload }
    case 'IMAGE_PROFILE_EDIT_CHANGE':
      return { ...state, imageProfile: action.payload }
    case 'PROFILE_EDIT':
      return { ...state, newUserData: action.payload, editComplete: action.payload1 }
    case 'PROFILE_EDIT_CLEAR':
      return { ...state, editComplete: null, newUserData: null }
    default:
      return state
  }
}

const initialStateArticleCreate = {
  titleArticleCreate: '',
  descriptionArticleCreate: '',
  textArticleCreate: '',
  tagsArticleCreate: [],
}

const articleCreateReducer = (state = initialStateArticleCreate, action) => {
  switch (action.type) {
    case 'TITLE_ARTICLE_CREATE_CHANGE':
      return { ...state, titleArticleCreate: action.payload }
    case 'DESCRIPTION_ARTICLE_CREATE_CHANGE':
      return { ...state, descriptionArticleCreate: action.payload }
    case 'TEXT_ARTICLE_CREATE_CHANGE':
      return { ...state, textArticleCreate: action.payload }
    case 'TAGS_ARTICLE_CREATE_CHANGE':
      return { ...state, tagsArticleCreate: [...state.tagsArticleCreate, action.payload] }
    case 'TAG_ARTICLE_CREATE_DELETE': {
      return {
        ...state,
        tagsArticleCreate: [
          ...state.tagsArticleCreate.slice(0, action.payload),
          ...state.tagsArticleCreate.slice(action.payload + 1),
        ],
      }
    }
    case 'ARTICLE_CREATE':
    case 'ARTICLE_CREATE_CLEAR':
    case 'ARTICLE_EDIT':
      return initialStateArticleCreate
    default:
      return state
  }
}

const rootReducer = combineReducers({
  pagination: paginationReducer,
  server: serverReducer,
  signUp: signUpReducer,
  signIn: signInReducer,
  profileEdit: profileEditReducer,
  articleCreate: articleCreateReducer,
})

export default rootReducer
