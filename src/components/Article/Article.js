import React from 'react'
import { DragSource } from 'react-dnd'

import './Article.css'
import BEM from '../../helpers/BEM'

const b = BEM('Article')

const Article = ({ article, connectDragSource }) =>
  connectDragSource(
    <div className={b()}>
      <h3 className={b('title')}>{article.text}</h3>
    </div>
  )

export default DragSource(
  'Article',
  {
    beginDrag: (props) => props.article,
    endDrag: (props, monitor) => {
      if (monitor.getDropResult() === null) return
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)(Article)