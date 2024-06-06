/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { connect, useDispatch } from 'react-redux'
import { useParams, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { format } from 'date-fns'
import Markdown from 'react-markdown'
import { Popconfirm } from 'antd'

import ArticleCreate from '../article-create'
import { GET_ARTICLES } from '../../actions'

import styles from './article.module.scss'

function Article({ articles, userData, page }) {
  const slug = useParams().Id
  const { url } = useRouteMatch()
  const history = useHistory()
  const dispatch = useDispatch()
  const article = articles.find((item) => item.slug === slug)

  if (!article) return <div />

  const tags = article.tagList.map((tag, index) => (
    <div className={styles.article__tag} key={`${tag}${index}`}>
      {tag}
    </div>
  ))
  const timeCreated = format(new Date(article.createdAt), 'LLLL d, yyy')
  return (
    <Switch>
      <Route path={`${url}/edit`}>
        <ArticleCreate article={article} />
      </Route>
      <Route path={`${url}`}>
        <div className={styles.article}>
          <div className={styles.article__header}>
            <div className={styles.article__heading}>
              <div className={styles.article__title}>{article.title}</div>
              <div className={styles.likes}>
                <img
                  className={styles.likes__img}
                  src={article.favorited ? 'images/heart-active.svg' : 'images/heart-unactive.svg'}
                  alt="heart-icon"
                  onClick={() => {
                    if (JSON.parse(localStorage.getItem('userData')) && userData) {
                      if (article.favorited) {
                        fetch(`https://blog.kata.academy/api/articles/${article.slug}/favorite`, {
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Token ${userData.user.token}`,
                          },
                        })
                          .then((respone) => respone.text())
                          .then(() => dispatch((dispatched) => GET_ARTICLES(dispatched, page, userData.user.token)))
                      } else {
                        fetch(`https://blog.kata.academy/api/articles/${article.slug}/favorite`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Token ${userData.user.token}`,
                          },
                        })
                          .then((respone) => respone.text())
                          .then(() => dispatch((dispatched) => GET_ARTICLES(dispatched, page, userData.user.token)))
                      }
                    }
                  }}
                />
                <span className={styles.likes__value}>{article.favoritesCount}</span>
              </div>
            </div>
            <div className={styles.article__tags}>{tags}</div>
            <div className={styles.author}>
              <div className={styles.author__info}>
                <div className={styles.author__name}>{article.author.username}</div>
                <div className={styles.author__date}>{timeCreated}</div>
              </div>
              <img className={styles.author__image} src={article.author.image} alt="profile-icon" />
            </div>
            {userData && userData.user.username === article.author.username ? (
              <div className={styles.buttons}>
                <Popconfirm
                  placement="rightTop"
                  description="Are you sure to delete this article?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => {
                    fetch(`https://blog.kata.academy/api/articles/${slug}`, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${userData.user.token}`,
                      },
                    })
                      .then((respone) => respone.text())
                      .then(() => dispatch((dispatched) => GET_ARTICLES(dispatched, page, userData.user.token)))
                    history.push('/')
                  }}
                >
                  <button type="button" className={styles.buttons__delete}>
                    Delete
                  </button>
                </Popconfirm>
                <button
                  type="button"
                  className={styles.buttons__edit}
                  onClick={() => {
                    history.push(`${url}/edit`)
                  }}
                >
                  Edit
                </button>
              </div>
            ) : null}
            <div className={styles.article__description}>{article.description}</div>
          </div>
          <div className={styles.article__main}>
            <Markdown>{article.body}</Markdown>
          </div>
        </div>
      </Route>
    </Switch>
  )
}

const mapStateToProps = ({ server, pagination }) => {
  const { userData, articles } = server
  const { page } = pagination
  return {
    articles,
    userData,
    page,
  }
}

export default connect(mapStateToProps)(Article)
