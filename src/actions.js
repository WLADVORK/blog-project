export const INC_PAGE = (number) => ({ type: 'INC_PAGE', payload: number })

export const DEC_PAGE = (number) => ({ type: 'DEC_PAGE', payload: number })

export const GET_ARTICLES = (dispatch, page) => {
  fetch(`https://blog.kata.academy/api/articles?limit=20&offset=${(page - 1) * 20}`)
    .then((response) => response.json())
    .then((result) => dispatch({ type: 'GET_ARTICLES', payload: result.articles, payload1: result.articlesCount }))
}
