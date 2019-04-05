import React, { useEffect, useState } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import flow from 'lodash/flow'

import LayoutArticle from './LayoutArticle'
import { addArticleToLayout, changeArticleColumnInRow, removeArticleFromLayout } from '../actions'
import { getAllArticles, getIdsInLayout } from '../reducers'

import '../grid.scss'

const Row = ({ row, articles, parameters, connectDropTarget }) => {
  const [dimension, setDimension] = useState(null)
  let container

  useEffect(() => {
    setDimension(container.offsetWidth)
  }, [])

  return connectDropTarget(
    <section className='grid' style={{ border: '1px solid grey', marginBottom: '5px' }} ref={el => container = el}>
      {articles.map(
        (article, i) => articles[articles.length - 1] === article ?
          <LayoutArticle
            key={article.id}
            index={i}
            rowId={row}
            containerWidth={dimension}
            layoutArticle={article}
            parameters={parameters.filter(param => param.id === article.id)[0]}
            resize={false}
          /> :
          <LayoutArticle
            key={article.id}
            index={i}
            rowId={row}
            containerWidth={dimension}
            layoutArticle={article}
            parameters={parameters.filter(param => param.id === article.id)[0]}
            resize={true}
          />
      )}
    </section>
  )
}

export default flow(
  DropTarget(
    'Article',
    {
      drop(props, monitor) {
        if (props.layoutArticles.filter(article => article.id === monitor.getItem().id).length === 0) {
          if (props.parameters.length !== 0) {
            props.parameters.map(article => props.changeArticleColumnInRow({
              id: article.id,
              col: `${12 / (props.parameters.length + 1)}`
            }))
            props.addArticleToLayout({
              id: monitor.getItem().id,
              col: `${12 / (props.parameters.length + 1)}`,
              row: props.row
            })
          } else {
            props.addArticleToLayout({
              id: monitor.getItem().id,
              col: '12',
              row: props.row
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
      addArticleToLayout,
      removeArticleFromLayout,
      changeArticleColumnInRow
    }
  )
)(Row)