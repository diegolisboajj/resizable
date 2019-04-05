import React from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import flow from 'lodash/flow'

import Article from '../Article'
import { getAllArticles, getIdsInLayout, getAllRows } from '../../reducers'
import { addArticle, removeArticle, removeArticleFromLayout, deleteRowFromLayout } from '../../actions'

import './Sidebar.css'
import BEM from '../../helpers/BEM'

const b = BEM('Sidebar')

const Sidebar = ({ data, connectDropTarget, hovered, articles, addArticle, removeArticle }) =>
  connectDropTarget(
    <aside className={b()}>
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

export default flow(
  DropTarget(
    'Article',
    {
      drop: (props, monitor) => {
        if (props.articlesInLayout.indexOf(monitor.getItem().id) === -1) return

        props.removeArticleFromLayout(monitor.getItem().id, monitor.getItem().row)
        if (props.layoutRows.filter(row => row.rowId === monitor.getItem().row)[0].articlesInRow.length === 1)
          props.deleteRowFromLayout(monitor.getItem().row)
      }
    },
    (connect, monitor) => (
      {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
      }
    )
  ),
  connect(
    state => ({
      articles: getAllArticles(state).filter(article => getIdsInLayout(state).indexOf(article.id) === -1),
      articlesInLayout: getIdsInLayout(state),
      layoutRows: getAllRows(state)
    }),
    {
      addArticle,
      removeArticle,
      removeArticleFromLayout,
      deleteRowFromLayout
    }
  )
)(Sidebar)