/* eslint-disable import/no-extraneous-dependencies */
import { Switch, Route } from 'react-router-dom'

import ArticleList from '../article-list'
import './main.scss'

function Main() {
  return (
    <div className="main">
      <Switch>
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
