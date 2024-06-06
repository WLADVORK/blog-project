export const INC_PAGE = (number) => ({ type: 'INC_PAGE', payload: number })

export const DEC_PAGE = (number) => ({ type: 'DEC_PAGE', payload: number })

export const GET_ARTICLES = (dispatch, page, token) => {
  if (token) {
    fetch(`https://blog.kata.academy/api/articles?limit=20&offset=${(page - 1) * 20}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => dispatch({ type: 'GET_ARTICLES', payload: result.articles, payload1: result.articlesCount }))
  } else {
    fetch(`https://blog.kata.academy/api/articles?limit=20&offset=${(page - 1) * 20}`)
      .then((response) => response.json())
      .then((result) => dispatch({ type: 'GET_ARTICLES', payload: result.articles, payload1: result.articlesCount }))
  }
}

export const SIGN_UP = (dispatch, username, email, password) => {
  fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { username, email, password } }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (!result.errors) {
        dispatch({ type: 'SIGN_UP', payload: result, payload1: true })
      } else {
        dispatch({ type: 'SIGN_UP', payload: result.errors, payload1: false })
      }
    })
    .catch((result) => dispatch({ type: 'SIGN_UP', payload: result, payload1: false }))
}

export const USERNAME_SIGN_UP_CHANGE = (value) => ({ type: 'USERNAME_SIGN_UP_CHANGE', payload: value })

export const EMAIL_SIGN_UP_CHANGE = (value) => ({ type: 'EMAIL_SIGN_UP_CHANGE', payload: value })

export const PASSWORD_SIGN_UP_CHANGE = (value) => ({ type: 'PASSWORD_SIGN_UP_CHANGE', payload: value })

export const PASSWORD_AGAIN_SIGN_UP_CHANGE = (value) => ({ type: 'PASSWORD_AGAIN_SIGN_UP_CHANGE', payload: value })

export const AGREEMENT_SIGN_UP_CHANGE = (value) => ({ type: 'AGREEMENT_SIGN_UP_CHANGE', payload: value })

export const SIGN_UP_CLEAR = () => ({ type: 'SIGN_UP_CLEAR' })

export const DATA_CLEAR = () => ({ type: 'DATA_CLEAR' })

export const DATA_SET = (userData, answer) => ({ type: 'DATA_SET', payload: userData, payload1: answer })

export const SIGN_IN = (dispatch, email, password) => {
  fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { email, password } }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (!result.errors) {
        dispatch({ type: 'SIGN_IN', payload: result, payload1: true })
      } else {
        dispatch({ type: 'SIGN_IN', payload: result.errors, payload1: false })
      }
    })
    .catch((result) => dispatch({ type: 'SIGN_IN', payload: result, payload1: false }))
}

export const EMAIL_SIGN_IN_CHANGE = (value) => ({ type: 'EMAIL_SIGN_IN_CHANGE', payload: value })

export const PASSWORD_SIGN_IN_CHANGE = (value) => ({ type: 'PASSWORD_SIGN_IN_CHANGE', payload: value })

export const SIGN_IN_CLEAR = () => ({ type: 'SIGN_IN_CLEAR' })

export const PROFILE_EDIT = (dispatch, token, username, email, password, image) => {
  const obj1 = username ? { username } : {}
  const obj2 = email ? { email } : {}
  const obj3 = password ? { password } : {}
  const obj4 = { image }

  fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      user: {
        ...obj1,
        ...obj2,
        ...obj3,
        ...obj4,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (!result.errors) {
        dispatch({ type: 'PROFILE_EDIT', payload: result, payload1: true })
      } else {
        dispatch({ type: 'PROFILE_EDIT', payload: result.errors, payload1: false })
      }
    })
    .catch((result) => dispatch({ type: 'PROFILE_EDIT', payload: result, payload1: false }))
}

export const USERNAME_PROFILE_EDIT_CHANGE = (value) => ({ type: 'USERNAME_PROFILE_EDIT_CHANGE', payload: value })

export const EMAIL_PROFILE_EDIT_CHANGE = (value) => ({ type: 'EMAIL_PROFILE_EDIT_CHANGE', payload: value })

export const PASSWORD_PROFILE_EDIT_CHANGE = (value) => ({ type: 'PASSWORD_PROFILE_EDIT_CHANGE', payload: value })

export const IMAGE_PROFILE_EDIT_CHANGE = (value) => ({ type: 'IMAGE_PROFILE_EDIT_CHANGE', payload: value })

export const PROFILE_EDIT_CLEAR = () => ({ type: 'PROFILE_EDIT_CLEAR' })

export const TITLE_ARTICLE_CREATE_CHANGE = (value) => ({ type: 'TITLE_ARTICLE_CREATE_CHANGE', payload: value })

export const DESCRIPTION_ARTICLE_CREATE_CHANGE = (value) => ({
  type: 'DESCRIPTION_ARTICLE_CREATE_CHANGE',
  payload: value,
})

export const TEXT_ARTICLE_CREATE_CHANGE = (value) => ({ type: 'TEXT_ARTICLE_CREATE_CHANGE', payload: value })

export const TAGS_ARTICLE_CREATE_CHANGE = (value) => ({ type: 'TAGS_ARTICLE_CREATE_CHANGE', payload: value })

export const TAG_ARTICLE_CREATE_DELETE = (value) => ({ type: 'TAG_ARTICLE_CREATE_DELETE', payload: value })

export const ARTICLE_CREATE = (dispatch, token, title, description, text, tags) => {
  const tagsObj = tags ? { tagList: tags } : {}

  fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body: text,
        ...tagsObj,
      },
    }),
  })
    .then((response) => response.json())
    .then(() => {
      GET_ARTICLES(dispatch, 1, token)
      dispatch({ type: 'ARTICLE_CREATE' })
    })
    .catch(() => dispatch({ type: 'ARTICLE_CREATE' }))
}

export const ARTICLE_CREATE_CLEAR = () => ({ type: 'ARTICLE_CREATE_CLEAR' })

export const ARTICLE_EDIT = (dispatch, token, title, description, text, tags, slug, page) => {
  const tagsObj = tags ? { tagList: tags } : {}

  fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body: text,
        ...tagsObj,
      },
    }),
  })
    .then((response) => response.json())
    .then(() => {
      GET_ARTICLES(dispatch, page, token)
      dispatch({ type: 'ARTICLE_EDIT' })
    })
    .catch(() => dispatch({ type: 'ARTICLE_EDIT' }))
}
