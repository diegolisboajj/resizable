import React from 'react'
import { DragSource } from 'react-dnd'

import './Article.css'

const Article = ({ article, connectDragSource }) => {
  return connectDragSource(
    <div className={'Article'}>
      <h3 className={'Article__title'}>{article.text}</h3>
    </div>
  )
}

export default DragSource(
  'Article',
  {
    beginDrag(props) {
      return props.article
    },

    endDrag(props, monitor) {
      if (monitor.getDropResult() === null) return
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)(Article)