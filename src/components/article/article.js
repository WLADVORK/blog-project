/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import { connect } from 'react-redux'
import { useParams, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { format } from 'date-fns'
import Markdown from 'react-markdown'
import { Popconfirm } from 'antd'

import ArticleCreate from '../article-create'

import styles from './article.module.scss'

function Article({ articles, userData }) {
  const slug = useParams().Id
  const { url } = useRouteMatch()
  const history = useHistory()
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
                <img className={styles.likes__img} src="images/heart.svg" alt="heart-icon" />
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

const mapStateToProps = ({ server }) => {
  const { userData, articles } = server
  return {
    articles,
    userData,
  }
}
export default connect(mapStateToProps)(Article)
