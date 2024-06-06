/* eslint-disable comma-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'
import { format } from 'date-fns'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'

import * as actions from '../../actions'
import Article from '../article'

import styles from './article-list.module.scss'

function ArticleList({ page, maxPage, articles, userData, INC_PAGE, DEC_PAGE, GET_ARTICLES }) {
  const dispatch = useDispatch()
  let token = ''
  if (JSON.parse(localStorage.getItem('userData')) && userData) {
    token = userData.user.token
  }
  useEffect(() => {
    dispatch((dispatched) => GET_ARTICLES(dispatched, page, token))
  }, [userData])

  const articleList = articles.map((item) => {
    const tags = item.tagList.map((tag, index) => (
      <div key={`${item.slug}${index}`} className={styles.article__tag}>
        {tag}
      </div>
    ))
    const timeCreated = format(new Date(item.createdAt), 'LLLL d, yyy')
    return (
      <div className={styles.article} key={item.slug}>
        <div className={styles.article__header}>
          <div className={styles.article__heading}>
            <div className={styles.article__title}>
              <Link to={`articles/${item.slug}`}>{item.title}</Link>
            </div>
            <div className={styles.likes}>
              <img
                className={styles.likes__img}
                src={item.favorited ? 'images/heart-active.svg' : 'images/heart-unactive.svg'}
                alt="heart-icon"
                onClick={() => {
                  if (JSON.parse(localStorage.getItem('userData')) && userData) {
                    if (item.favorited) {
                      fetch(`https://blog.kata.academy/api/articles/${item.slug}/favorite`, {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Token ${userData.user.token}`,
                        },
                      })
                        .then((respone) => respone.text())
                        .then(() => dispatch((dispatched) => GET_ARTICLES(dispatched, page, token)))
                    } else {
                      fetch(`https://blog.kata.academy/api/articles/${item.slug}/favorite`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Token ${userData.user.token}`,
                        },
                      })
                        .then((respone) => respone.text())
                        .then(() => dispatch((dispatched) => GET_ARTICLES(dispatched, page, token)))
                    }
                  }
                }}
              />
              <span className={styles.likes__value}>{item.favoritesCount}</span>
            </div>
          </div>
          <div className={styles.article__tags}>{tags}</div>
          <div className={styles.author}>
            <div className={styles.author__info}>
              <div className={styles.author__name}>{item.author.username}</div>
              <div className={styles.author__date}>{timeCreated}</div>
            </div>
            <img className={styles.author__image} src={item.author.image} alt="profile-icon" />
          </div>
        </div>
        <div className={styles.article__description}>{item.description}</div>
      </div>
    )
  })

  let page1 = page <= 2 ? 1 : page - 2
  let page2 = page <= 2 ? 2 : page - 1
  let page3 = page <= 2 ? 3 : page
  let page4 = page <= 2 ? 4 : page + 1
  let page5 = page <= 2 ? 5 : page + 2
  if (maxPage <= 5) {
    page1 = 1
    page2 = 2
    page3 = 3
    page4 = 4
    page5 = 5
  } else {
    page1 = maxPage - page < 2 ? maxPage - 4 : page1
    page2 = maxPage - page < 2 ? maxPage - 3 : page2
    page3 = maxPage - page < 2 ? maxPage - 2 : page3
    page4 = maxPage - page < 2 ? maxPage - 1 : page4
    page5 = maxPage - page < 2 ? maxPage : page5
  }
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}:Id`}>
        <Article />
      </Route>
      <Route path={'/' || '/articles/'} exact>
        <div className={styles.articleList}>
          {articleList}
          {articles.length > 0 ? (
            <div className={styles.pagination}>
              <img
                className={styles.pagination__arror}
                src={page !== 1 ? 'images/active-arror-left.svg' : 'images/unactive-arror-left.svg'}
                alt="pagination-arror"
                onClick={() => {
                  switch (page) {
                    case 1:
                      break

                    default:
                      DEC_PAGE(1)
                      dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1, token))
                  }
                }}
              />
              <button
                type="button"
                className={`${styles.pagination__page} ${page === 1 ? styles.pagination__page_active : ''}`}
                onClick={() => {
                  if (maxPage > 5) {
                    if (page === maxPage - 1) {
                      DEC_PAGE(3)
                      dispatch((dispatched) => GET_ARTICLES(dispatched, page - 3, token))
                      return
                    }

                    if (page === maxPage) {
                      DEC_PAGE(4)
                      dispatch((dispatched) => GET_ARTICLES(dispatched, page - 4, token))
                      return
                    }
                  }
                  switch (page) {
                    case 1:
                      break
                    case 2:
                      DEC_PAGE(1)
                      dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1, token))
                      break
                    case 4:
                      if (maxPage > 5) {
                        DEC_PAGE(2)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2, token))
                        break
                      }
                      DEC_PAGE(3)
                      dispatch((dispatched) => GET_ARTICLES(dispatched, page - 3, token))
                      break
                    case 5:
                      if (maxPage > 5) {
                        DEC_PAGE(2)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2, token))
                        break
                      }
                      DEC_PAGE(4)
                      dispatch((dispatched) => GET_ARTICLES(dispatched, page - 4, token))
                      break
                    default:
                      DEC_PAGE(2)
                      dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2, token))
                  }
                }}
              >
                {page1}
              </button>
              {maxPage >= 2 ? (
                <button
                  type="button"
                  className={`${styles.pagination__page} ${page === 2 ? styles.pagination__page_active : ''}`}
                  onClick={() => {
                    if (maxPage > 5) {
                      if (page === maxPage - 1) {
                        DEC_PAGE(2)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2, token))
                        return
                      }

                      if (page === maxPage) {
                        DEC_PAGE(3)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 3, token))
                        return
                      }
                    }
                    switch (page) {
                      case 1:
                        INC_PAGE(1)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1, token))
                        break
                      case 2:
                        break
                      case 4:
                        if (maxPage > 5) {
                          DEC_PAGE(1)
                          dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1, token))
                          break
                        }
                        DEC_PAGE(2)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2, token))
                        break
                      case 5:
                        if (maxPage > 5) {
                          DEC_PAGE(1)
                          dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1, token))
                          break
                        }
                        DEC_PAGE(3)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 3, token))
                        break
                      default:
                        DEC_PAGE(1)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1, token))
                    }
                  }}
                >
                  {page2}
                </button>
              ) : null}
              {maxPage >= 3 ? (
                <button
                  type="button"
                  className={`${styles.pagination__page} ${(maxPage > 5 && page > 2 && maxPage - page >= 2) || (page === 3 && maxPage < 6) ? styles.pagination__page_active : ''}`}
                  onClick={() => {
                    if (maxPage > 5) {
                      if (page === maxPage - 1) {
                        DEC_PAGE(1)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1, token))
                        return
                      }

                      if (page === maxPage) {
                        DEC_PAGE(2)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2, token))
                        return
                      }
                    }
                    switch (page) {
                      case 1:
                        INC_PAGE(2)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page + 2, token))
                        break
                      case 2:
                        INC_PAGE(1)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1, token))
                        break
                      case 4:
                        DEC_PAGE(1)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1, token))
                        break
                      case 5:
                        DEC_PAGE(2)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2, token))
                        break
                      default:
                        break
                    }
                  }}
                >
                  {page3}
                </button>
              ) : null}
              {maxPage >= 4 ? (
                <button
                  type="button"
                  className={`${styles.pagination__page} ${(maxPage - page === 1 && maxPage > 5) || (page === 4 && maxPage < 6) ? styles.pagination__page_active : ''}`}
                  onClick={() => {
                    if (maxPage > 5) {
                      if (page === maxPage - 1) {
                        return
                      }

                      if (page === maxPage) {
                        DEC_PAGE(1)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1, token))
                        return
                      }
                    }
                    switch (page) {
                      case 1:
                        INC_PAGE(3)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page + 3, token))
                        break
                      case 2:
                        INC_PAGE(2)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page + 2, token))
                        break
                      case 4:
                        if (maxPage > 5) {
                          INC_PAGE(1)
                          dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1, token))
                          break
                        }
                        break
                      case 5:
                        if (maxPage > 5) {
                          INC_PAGE(1)
                          dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1, token))
                          break
                        }
                        DEC_PAGE(1)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1, token))
                        break

                      default:
                        INC_PAGE(1)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1, token))
                    }
                  }}
                >
                  {page4}
                </button>
              ) : null}
              {maxPage >= 5 ? (
                <button
                  type="button"
                  className={`${styles.pagination__page} ${(maxPage > 5 && maxPage - page === 0) || (page === 5 && maxPage < 6) ? styles.pagination__page_active : ''}`}
                  onClick={() => {
                    if (maxPage > 5) {
                      if (page === maxPage) {
                        return
                      }

                      if (page === maxPage - 1) {
                        INC_PAGE(1)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1, token))
                        return
                      }
                    }

                    switch (page) {
                      case 1:
                        INC_PAGE(4)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page + 4, token))
                        break
                      case 2:
                        INC_PAGE(3)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page + 3, token))
                        break
                      case 4:
                        INC_PAGE(1)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1, token))
                        break
                      case 5:
                        if (maxPage > 5) {
                          INC_PAGE(2)
                          dispatch((dispatched) => GET_ARTICLES(dispatched, page + 2, token))
                        }
                        break
                      default:
                        INC_PAGE(2)
                        dispatch((dispatched) => GET_ARTICLES(dispatched, page + 2, token))
                    }
                  }}
                >
                  {page5}
                </button>
              ) : null}
              <img
                className={styles.pagination__arror}
                src={maxPage - page !== 0 ? 'images/active-arror-right.svg' : 'images/unactive-arror-right.svg'}
                alt="pagination-arror"
                onClick={() => {
                  if (maxPage - page !== 0) {
                    INC_PAGE(1)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1, token))
                  }
                }}
              />
            </div>
          ) : null}
        </div>
      </Route>
    </Switch>
  )
}

const mapStateToProps = ({ pagination, server }) => {
  if (!server.articles) {
    return {
      page: pagination.page,
      maxPage: server.maxPage,
    }
  }
  return {
    page: pagination.page,
    maxPage: server.maxPage,
    articles: server.articles,
    userData: server.userData,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { INC_PAGE, DEC_PAGE } = bindActionCreators(actions, dispatch)
  const { GET_ARTICLES } = actions
  return {
    INC_PAGE,
    DEC_PAGE,
    GET_ARTICLES,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
