import React from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import flow from 'lodash/flow'

import Article from '../Article'

import './Sidebar.css'
import { getAllArticles, getIdsInLayout } from '../../reducers'
import { addArticle, removeArticle } from '../../actions'

const Sidebar = ({ data, connectDropTarget, hovered, articles, addArticle, removeArticle }) => {
  return connectDropTarget(
    <aside className={'Sidebar'}>
      <h1 className={'Sidebar__title'}>Sidebar</h1>
      {articles.map(article => (
        <Article
          key={article.id}
          article={article}
          addArticle={addArticle}
          removeArticle={removeArticle}
        />
      ))}
    </aside>
  )
}

export default flow(
  connect(
    state => ({
      articles: getAllArticles(state).filter(article => getIdsInLayout(state).indexOf(article.id) === -1)
    }),
    {
      addArticle,
      removeArticle
    }
  ),
  DropTarget(
    'Article',
    {
      drop(props, monitor) {
        console.log(props)
      }
    },
    (connect, monitor) => (
      {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
      }
    )
  ))(Sidebar)