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

function ArticleList({ page, maxPage, articles, INC_PAGE, DEC_PAGE, GET_ARTICLES, SIGN_UP_CLEAR, SIGN_IN_CLEAR }) {
  const dispatch = useDispatch()
  useEffect(() => {
    SIGN_UP_CLEAR()
    SIGN_IN_CLEAR()
    dispatch((dispatched) => GET_ARTICLES(dispatched, page))
  }, [])

  let page1 = page <= 2 ? 1 : page - 2
  let page2 = page <= 2 ? 2 : page - 1
  let page3 = page <= 2 ? 3 : page
  let page4 = page <= 2 ? 4 : page + 1
  let page5 = page <= 2 ? 5 : page + 2

  page1 = maxPage - page < 2 ? maxPage - 4 : page1
  page2 = maxPage - page < 2 ? maxPage - 3 : page2
  page3 = maxPage - page < 2 ? maxPage - 2 : page3
  page4 = maxPage - page < 2 ? maxPage - 1 : page4
  page5 = maxPage - page < 2 ? maxPage : page5

  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}:Id`}>
        <Article />
      </Route>
      <Route path="/" exact>
        <div className={styles.articleList}>
          {articles}
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
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1))
                }
              }}
            />
            <button
              type="button"
              className={`${styles.pagination__page} ${page === 1 ? styles.pagination__page_active : ''}`}
              onClick={() => {
                if (page === maxPage - 1) {
                  DEC_PAGE(3)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 3))
                  return
                }

                if (page === maxPage) {
                  DEC_PAGE(4)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 4))
                  return
                }

                switch (page) {
                  case 1:
                    break
                  case 2:
                    DEC_PAGE(1)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1))
                    break
                  default:
                    DEC_PAGE(2)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2))
                }
              }}
            >
              {page1}
            </button>
            <button
              type="button"
              className={`${styles.pagination__page} ${page === 2 ? styles.pagination__page_active : ''}`}
              onClick={() => {
                if (page === maxPage - 1) {
                  DEC_PAGE(2)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2))
                  return
                }

                if (page === maxPage) {
                  DEC_PAGE(3)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 3))
                  return
                }

                switch (page) {
                  case 1:
                    INC_PAGE(1)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1))
                    break
                  case 2:
                    break
                  default:
                    DEC_PAGE(1)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1))
                }
              }}
            >
              {page2}
            </button>
            <button
              type="button"
              className={`${styles.pagination__page} ${page > 2 && maxPage - page >= 2 ? styles.pagination__page_active : ''}`}
              onClick={() => {
                if (page === maxPage - 1) {
                  DEC_PAGE(1)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1))
                  return
                }

                if (page === maxPage) {
                  DEC_PAGE(2)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2))
                  return
                }

                switch (page) {
                  case 1:
                    INC_PAGE(2)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 2))
                    break
                  case 2:
                    INC_PAGE(1)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1))
                    break
                  default:
                    break
                }
              }}
            >
              {page3}
            </button>
            <button
              type="button"
              className={`${styles.pagination__page} ${maxPage - page === 1 ? styles.pagination__page_active : ''}`}
              onClick={() => {
                if (page === maxPage - 1) {
                  return
                }

                if (page === maxPage) {
                  DEC_PAGE(1)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1))
                  return
                }
                switch (page) {
                  case 1:
                    INC_PAGE(3)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 3))
                    break
                  case 2:
                    INC_PAGE(2)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 2))
                    break
                  default:
                    INC_PAGE(1)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1))
                }
              }}
            >
              {page4}
            </button>
            <button
              type="button"
              className={`${styles.pagination__page} ${maxPage - page === 0 ? styles.pagination__page_active : ''}`}
              onClick={() => {
                if (page === maxPage) {
                  return
                }

                if (page === maxPage - 1) {
                  INC_PAGE(1)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1))
                  return
                }
                switch (page) {
                  case 1:
                    INC_PAGE(4)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 4))
                    break
                  case 2:
                    INC_PAGE(3)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 3))
                    break
                  default:
                    INC_PAGE(2)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 2))
                }
              }}
            >
              {page5}
            </button>
            <img
              className={styles.pagination__arror}
              src={maxPage - page !== 0 ? 'images/active-arror-right.svg' : 'images/unactive-arror-right.svg'}
              alt="pagination-arror"
              onClick={() => {
                INC_PAGE(1)
                dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1))
              }}
            />
          </div>
        </div>
      </Route>
      <Route path="/articles/" exact>
        <div className={styles.articleList}>
          {articles}
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
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1))
                }
              }}
            />
            <button
              type="button"
              className={`${styles.pagination__page} ${page === 1 ? styles.pagination__page_active : ''}`}
              onClick={() => {
                if (page === maxPage - 1) {
                  DEC_PAGE(3)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 3))
                  return
                }

                if (page === maxPage) {
                  DEC_PAGE(4)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 4))
                  return
                }

                switch (page) {
                  case 1:
                    break
                  case 2:
                    DEC_PAGE(1)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1))
                    break
                  default:
                    DEC_PAGE(2)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2))
                }
              }}
            >
              {page1}
            </button>
            <button
              type="button"
              className={`${styles.pagination__page} ${page === 2 ? styles.pagination__page_active : ''}`}
              onClick={() => {
                if (page === maxPage - 1) {
                  DEC_PAGE(2)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2))
                  return
                }

                if (page === maxPage) {
                  DEC_PAGE(3)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 3))
                  return
                }

                switch (page) {
                  case 1:
                    INC_PAGE(1)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1))
                    break
                  case 2:
                    break
                  default:
                    DEC_PAGE(1)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1))
                }
              }}
            >
              {page2}
            </button>
            <button
              type="button"
              className={`${styles.pagination__page} ${page > 2 && maxPage - page >= 2 ? styles.pagination__page_active : ''}`}
              onClick={() => {
                if (page === maxPage - 1) {
                  DEC_PAGE(1)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1))
                  return
                }

                if (page === maxPage) {
                  DEC_PAGE(2)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 2))
                  return
                }

                switch (page) {
                  case 1:
                    INC_PAGE(2)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 2))
                    break
                  case 2:
                    INC_PAGE(1)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1))
                    break
                  default:
                    break
                }
              }}
            >
              {page3}
            </button>
            <button
              type="button"
              className={`${styles.pagination__page} ${maxPage - page === 1 ? styles.pagination__page_active : ''}`}
              onClick={() => {
                if (page === maxPage - 1) {
                  return
                }

                if (page === maxPage) {
                  DEC_PAGE(1)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page - 1))
                  return
                }
                switch (page) {
                  case 1:
                    INC_PAGE(3)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 3))
                    break
                  case 2:
                    INC_PAGE(2)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 2))
                    break
                  default:
                    INC_PAGE(1)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1))
                }
              }}
            >
              {page4}
            </button>
            <button
              type="button"
              className={`${styles.pagination__page} ${maxPage - page === 0 ? styles.pagination__page_active : ''}`}
              onClick={() => {
                if (page === maxPage) {
                  return
                }

                if (page === maxPage - 1) {
                  INC_PAGE(1)
                  dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1))
                  return
                }
                switch (page) {
                  case 1:
                    INC_PAGE(4)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 4))
                    break
                  case 2:
                    INC_PAGE(3)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 3))
                    break
                  default:
                    INC_PAGE(2)
                    dispatch((dispatched) => GET_ARTICLES(dispatched, page + 2))
                }
              }}
            >
              {page5}
            </button>
            <img
              className={styles.pagination__arror}
              src={maxPage - page !== 0 ? 'images/active-arror-right.svg' : 'images/unactive-arror-right.svg'}
              alt="pagination-arror"
              onClick={() => {
                INC_PAGE(1)
                dispatch((dispatched) => GET_ARTICLES(dispatched, page + 1))
              }}
            />
          </div>
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
  const articles = server.articles.map((item) => {
    const tags = item.tagList.map((tag) => <div className={styles.article__tag}>{tag}</div>)
    const timeCreated = format(new Date(item.createdAt), 'LLLL d, yyy')
    return (
      <div className={styles.article}>
        <div className={styles.article__header}>
          <div className={styles.article__heading}>
            <div className={styles.article__title}>
              <Link to={`articles/${item.slug}`}>{item.title}</Link>
            </div>
            <div className={styles.likes}>
              <img className={styles.likes__img} src="images/heart.svg" alt="heart-icon" />
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

  return {
    page: pagination.page,
    maxPage: server.maxPage,
    articles,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { INC_PAGE, DEC_PAGE, SIGN_UP_CLEAR, SIGN_IN_CLEAR } = bindActionCreators(actions, dispatch)
  const { GET_ARTICLES } = actions
  return {
    INC_PAGE,
    DEC_PAGE,
    GET_ARTICLES,
    SIGN_UP_CLEAR,
    SIGN_IN_CLEAR,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
