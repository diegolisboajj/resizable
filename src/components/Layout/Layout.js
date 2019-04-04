import React from 'react'
import { DropTarget } from 'react-dnd'
import flow from 'lodash/flow'
import { connect } from 'react-redux'

import { getAllArticles, getLayoutParameters, getAllRows } from '../../reducers'
import { addArticleToLayout, addNewRowToLayout } from '../../actions'
import Row from '../Row'

import './Layout.css'
import '../../grid.scss'
import BEM from '../../helpers/BEM'

const b = BEM('Layout')

const Layout = ({ connectDropTarget, data, articles, layoutParameters, addNewRowToLayout, rows }) =>
  connectDropTarget(
    <main className={b()}>
      <h1 className={b('title')}>Layout</h1>
      <main>
        {rows.map(row => (
          <Row
            key={row.rowId}
            row={row.rowId}
            parameters={layoutParameters.filter(p => p.row === row.rowId)}
            articles={row.articlesInRow.map(id => articles.filter(article => article.id === id)[0])}
          />
        ))}
      </main>
    </main>
  )

export default flow(
  DropTarget(
    'Article',
    {
      drop: (props, monitor) => {
        if (props.layoutParameters.filter(param => param.id === monitor.getItem().id).length === 0)
          props.addArticleToLayout({
              id: monitor.getItem().id,
              col: '12',
              row: props.addNewRowToLayout().id,
              size: '500px'
            }
          )
      }
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      hovered: monitor.isOver(),
      item: monitor.getItem()
    })
  ),
  connect(
    state => ({
      articles: getAllArticles(state),
      layoutParameters: getLayoutParameters(state),
      rows: getAllRows(state)
    }),
    {
      addArticleToLayout,
      addNewRowToLayout
    }
  ))(Layout)