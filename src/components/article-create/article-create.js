/* eslint-disable react/no-array-index-key */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-curly-newline */
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { useEffect } from 'react'

import * as actions from '../../actions'

import styles from './article-create.module.scss'

function ArticleCreate({
  TITLE_ARTICLE_CREATE_CHANGE,
  DESCRIPTION_ARTICLE_CREATE_CHANGE,
  TEXT_ARTICLE_CREATE_CHANGE,
  TAGS_ARTICLE_CREATE_CHANGE,
  TAG_ARTICLE_CREATE_DELETE,
  ARTICLE_CREATE,
  ARTICLE_EDIT,
  titleArticleCreate,
  descriptionArticleCreate,
  textArticleCreate,
  tagsArticleCreate,
  userData,
  article,
}) {
  useEffect(() => {
    if (article) {
      TITLE_ARTICLE_CREATE_CHANGE(article.title)
      DESCRIPTION_ARTICLE_CREATE_CHANGE(article.description)
      TEXT_ARTICLE_CREATE_CHANGE(article.body)
      article.tagList.forEach((item) => {
        TAGS_ARTICLE_CREATE_CHANGE(item)
      })
    }
  }, [])

  const generalValidation = titleArticleCreate && descriptionArticleCreate && textArticleCreate

  const dispatch = useDispatch()
  const history = useHistory()

  if (!JSON.parse(localStorage.getItem('userData'))) {
    history.push('/sign-in')
  }

  let mapTags = null

  if (tagsArticleCreate.length > 0) {
    mapTags = tagsArticleCreate.map((item, index) => {
      if (index === tagsArticleCreate.length - 1) {
        return (
          <React.Fragment key={`${item}${index}fragment`}>
            <div className={styles.articleCreate__tag} key={`${item}${index}`}>
              <input value={item} disabled placeholder="Tag" className={styles.articleCreate__tagInput} />
              <button
                type="button"
                className={styles.articleCreate__deleteButton}
                onClick={() => TAG_ARTICLE_CREATE_DELETE(index)}
              >
                Delete
              </button>
            </div>
            <div className={styles.articleCreate__tag} key="blank">
              <input placeholder="Tag" className={styles.articleCreate__tagInput} />
              <button
                type="button"
                onClick={(event) => {
                  const input = event.target.parentElement.firstElementChild
                  if (input.value) {
                    input.disabled = true
                    TAGS_ARTICLE_CREATE_CHANGE(input.value)
                  }
                }}
                className={styles.articleCreate__addTagButton}
              >
                Add tag
              </button>
            </div>
          </React.Fragment>
        )
      }
      return (
        <div className={styles.articleCreate__tag} key={`${item}${index}`}>
          <input value={item} disabled placeholder="Tag" className={styles.articleCreate__tagInput} />
          <button
            type="button"
            className={styles.articleCreate__deleteButton}
            onClick={() => TAG_ARTICLE_CREATE_DELETE(index)}
          >
            Delete
          </button>
        </div>
      )
    })
  } else {
    mapTags = (
      <div className={styles.articleCreate__tag}>
        <input placeholder="Tag" className={styles.articleCreate__tagInput} />
        <button
          type="button"
          onClick={(event) => {
            const input = event.target.parentElement.firstElementChild
            if (input.value) {
              input.disabled = true
              TAGS_ARTICLE_CREATE_CHANGE(input.value)
            }
          }}
          className={styles.articleCreate__addTagButton}
        >
          Add tag
        </button>
      </div>
    )
  }

  return (
    <div className={styles.articleCreate}>
      <div className={styles.articleCreate__title}>{article ? 'Edit article' : 'Create new article'}</div>
      <form className={styles.articleCreate__form}>
        <label className={styles.articleCreate__label}>
          Title
          <input
            value={titleArticleCreate}
            placeholder="Title"
            className={styles.articleCreate__input}
            onChange={(event) => {
              event.target.classList.remove(`${styles.articleCreate__input_error}`)
              event.target.nextElementSibling.classList.remove(`${styles.articleCreate__error_visible}`)
              TITLE_ARTICLE_CREATE_CHANGE(event.target.value)
            }}
          />
          <div className={styles.articleCreate__error}>The field is empty</div>
        </label>
        <label className={styles.articleCreate__label}>
          Short description
          <input
            value={descriptionArticleCreate}
            placeholder="Short description"
            className={styles.articleCreate__input}
            onChange={(event) => {
              event.target.classList.remove(`${styles.articleCreate__input_error}`)
              event.target.nextElementSibling.classList.remove(`${styles.articleCreate__error_visible}`)
              DESCRIPTION_ARTICLE_CREATE_CHANGE(event.target.value)
            }}
          />
          <div className={styles.articleCreate__error}>The field is empty</div>
        </label>
        <label className={styles.articleCreate__label}>
          Text
          <textarea
            value={textArticleCreate}
            placeholder="Text"
            rows={7}
            cols={92}
            className={styles.articleCreate__textarea}
            onChange={(event) => {
              event.target.classList.remove(`${styles.articleCreate__input_error}`)
              event.target.nextElementSibling.classList.remove(`${styles.articleCreate__error_visible}`)
              TEXT_ARTICLE_CREATE_CHANGE(event.target.value)
            }}
          />
          <div className={styles.articleCreate__error}>The field is empty</div>
        </label>
        <label className={styles.articleCreate__label}>
          Tags
          {mapTags}
        </label>
      </form>
      <div className={styles.articleCreate__submit}>
        <button
          type="submit"
          className={styles.articleCreate__submitButton}
          onClick={() => {
            if (generalValidation) {
              dispatch((dispatched) => {
                if (article) {
                  ARTICLE_EDIT(
                    dispatched,
                    userData.user.token,
                    titleArticleCreate,
                    descriptionArticleCreate,
                    textArticleCreate,
                    tagsArticleCreate,
                    article.slug
                  )
                } else {
                  // eslint-disable-next-line implicit-arrow-linebreak
                  ARTICLE_CREATE(
                    dispatched,
                    userData.user.token,
                    titleArticleCreate,
                    descriptionArticleCreate,
                    textArticleCreate,
                    tagsArticleCreate
                  )
                  // eslint-disable-next-line function-paren-newline
                }
              })
              history.push('/')
            }

            if (!titleArticleCreate) {
              const input = document.querySelector(
                `.${styles.articleCreate__form} .${styles.articleCreate__label}:nth-child(1) .${styles.articleCreate__input}`
              )
              const error = document.querySelector(
                `.${styles.articleCreate__form} .${styles.articleCreate__label}:nth-child(1) .${styles.articleCreate__error}`
              )
              input.classList.add(`${styles.articleCreate__input_error}`)
              error.classList.add(`${styles.articleCreate__error_visible}`)
            }

            if (!descriptionArticleCreate) {
              const input = document.querySelector(
                `.${styles.articleCreate__form} .${styles.articleCreate__label}:nth-child(2) .${styles.articleCreate__input}`
              )
              const error = document.querySelector(
                `.${styles.articleCreate__form} .${styles.articleCreate__label}:nth-child(2) .${styles.articleCreate__error}`
              )
              input.classList.add(`${styles.articleCreate__input_error}`)
              error.classList.add(`${styles.articleCreate__error_visible}`)
            }

            if (!textArticleCreate) {
              const input = document.querySelector(
                `.${styles.articleCreate__form} .${styles.articleCreate__label}:nth-child(3) .${styles.articleCreate__textarea}`
              )
              input.classList.add(`${styles.articleCreate__textarea_error}`)
              const error = document.querySelector(
                `.${styles.articleCreate__form} .${styles.articleCreate__label}:nth-child(3) .${styles.articleCreate__error}`
              )
              error.classList.add(`${styles.articleCreate__error_visible}`)
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ articleCreate, server }) => {
  const { userData } = server

  const { titleArticleCreate, descriptionArticleCreate, textArticleCreate, tagsArticleCreate } = articleCreate
  return {
    titleArticleCreate,
    descriptionArticleCreate,
    textArticleCreate,
    tagsArticleCreate,
    userData,
  }
}

const mapDispatchToProps = (dispatch) => {
  // eslint-disable-next-line operator-linebreak
  const {
    TITLE_ARTICLE_CREATE_CHANGE,
    DESCRIPTION_ARTICLE_CREATE_CHANGE,
    TEXT_ARTICLE_CREATE_CHANGE,
    TAGS_ARTICLE_CREATE_CHANGE,
    TAG_ARTICLE_CREATE_DELETE,
  } = bindActionCreators(actions, dispatch)
  const { ARTICLE_CREATE, ARTICLE_EDIT } = actions
  return {
    TITLE_ARTICLE_CREATE_CHANGE,
    DESCRIPTION_ARTICLE_CREATE_CHANGE,
    TEXT_ARTICLE_CREATE_CHANGE,
    TAGS_ARTICLE_CREATE_CHANGE,
    TAG_ARTICLE_CREATE_DELETE,
    ARTICLE_CREATE,
    ARTICLE_EDIT,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate)
