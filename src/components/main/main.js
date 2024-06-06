/* eslint-disable import/no-extraneous-dependencies */
import { Switch, Route } from 'react-router-dom'

import ArticleList from '../article-list'
import './main.scss'
import SignUp from '../sign-up'
import SignIn from '../sign-in'
import ProfileEdit from '../profile-edit'
import ArticleCreate from '../article-create'

function Main() {
  return (
    <div className="main">
      <Switch>
        <Route path="/new-article">
          <ArticleCreate />
        </Route>
        <Route path="/profile">
          <ProfileEdit />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/articles/">
          <ArticleList />
        </Route>
        <Route path="/" exact>
          <ArticleList />
        </Route>
        <Route>ERROR!</Route>
      </Switch>
    </div>
  )
}

export default Main
