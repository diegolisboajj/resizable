import React from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import flow from 'lodash/flow'

import LayoutArticle from './LayoutArticle'
import { addToLayout, changeCol, removeFromLayout } from '../actions'
import { getAllArticles, getIdsInLayout } from '../reducers'

import '../grid.scss'

const Row = ({ row, articles, parameters, connectDropTarget }) => connectDropTarget(
  <section className='grid' style={{ border: '1px solid grey', marginBottom: '5px' }}>
    {articles.map(
      (article, i) => articles[articles.length - 1] === article ?
        <LayoutArticle
          key={article.id}
          index={i}
          rowId={row}
          layoutArticle={article}
          parameters={parameters.filter(param => param.id === article.id)[0]}
          resize={false}
        /> :
        <LayoutArticle
          key={article.id}
          index={i}
          rowId={row}
          layoutArticle={article}
          parameters={parameters.filter(param => param.id === article.id)[0]}
          resize={true}
        />
    )}
  </section>
)

export default flow(
  DropTarget(
    'Article',
    {
      drop(props, monitor) {
        if (props.layoutArticles.filter(article => article.id === monitor.getItem().id).length === 0) {
          if (props.parameters.length !== 0) {
            props.parameters.map(article => props.changeCol({
              id: article.id,
              col: `${12 / (props.parameters.length + 1)}`
            }))
            props.addToLayout({
              id: monitor.getItem().id,
              col: `${12 / (props.parameters.length + 1)}`,
              row: props.row,
              size: '500px'
            })
          } else {
            props.addToLayout({
              id: monitor.getItem().id,
              col: '12',
              row: props.row,
              size: '500px'
            })
          }
        }

        return { id: monitor.getItem().id }
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
      layoutArticles: getAllArticles(state).filter(article => getIdsInLayout(state).indexOf(article.id) !== -1)
    }),
    {
      addToLayout,
      removeFromLayout,
      changeCol
    }
  )
)(Row)