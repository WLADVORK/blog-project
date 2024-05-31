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
}

const serverReducer = (state = initialStateServer, action) => {
  switch (action.type) {
    case 'GET_ARTICLES':
      if (action.payload1 === state.maxPage) {
        return {
          articles: [...action.payload],
        }
      }
      return {
        articles: [...action.payload],
        maxPage: Math.ceil(action.payload1 / 20),
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({ pagination: paginationReducer, server: serverReducer })

export default rootReducer
