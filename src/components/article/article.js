/* eslint-disable import/no-extraneous-dependencies */
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { format } from 'date-fns'
import Markdown from 'react-markdown'

import styles from './article.module.scss'

function Article({ article }) {
  if (!article) return <div />
  const tags = article.tagList.map((tag) => <div className={styles.article__tag}>{tag}</div>)
  const timeCreated = format(new Date(article.createdAt), 'LLLL d, yyy')
  return (
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
        <div className={styles.article__description}>{article.description}</div>
      </div>
      <div className={styles.article__main}>
        <Markdown>{article.body}</Markdown>
      </div>
    </div>
  )
}

const mapStateToProps = ({ server }) => {
  const slug = useParams().Id
  const article = server.articles.find((item) => item.slug === slug)
  return {
    article,
  }
}
export default connect(mapStateToProps)(Article)
