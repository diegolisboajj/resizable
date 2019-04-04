import React, { Component } from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import flow from 'lodash/flow'

import '../../grid.scss'
import './LayoutArticle.scss'
import BEM from '../../helpers/BEM'
import { reorderArticleInRow, updateArticleSizeInLayout } from '../../actions'

const b = BEM('LayoutArticle')

class LayoutArticle extends Component {
  state = {
    dragging: false,
    initX: null,
    initMaxWidth: parseInt(this.props.parameters.size.replace('px', '')),
    changed: false
  }

  handleMouseDown = e => {
    e.preventDefault()
    if (!this.state.dragging) {
      this.setState(state => ({
        ...state,
        dragging: true,
        changed: true
      }))
    }

    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseUp = () => {
    if (this.state.dragging)
      this.setState(state => ({
        ...state,
        initX: null,
        dragging: false
      }))

    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseMove = e => {
    const { parameters, updateArticleSizeInLayout } = this.props
    e.preventDefault()
    if (!this.state.initX) {
      this.setState(state => ({
        ...state,
        initX: e.pageX,
        initialMaxWidth: parseInt(parameters.size.replace('px', ''))
      }))
    } else {
      const delta = e.pageX - this.state.initX
      const maxWidth = `${this.state.initMaxWidth + delta}px`
      updateArticleSizeInLayout({ id: parameters.id, size: maxWidth })
    }
  }

  render() {
    const { changed } = this.state
    const { parameters, layoutArticle, connectDropTarget, connectDragSource, resize } = this.props

    return connectDropTarget(
      connectDragSource(
        <div className={`grid__cell_${parameters.col} ${b()}`}
             style={!changed ? {} : { minWidth: parameters.size, maxWidth: parameters.size }}>
          <h3 className={b('title')}>{layoutArticle.text}</h3>
          {resize ?
            <div className={b('resize')} onMouseDown={e => this.handleMouseDown(e)}>
            </div> : null
          }
        </div>)
    )
  }
}

export default flow(
  DragSource(
    'Article',
    {
      beginDrag: props => ({
        id: props.layoutArticle.id,
        text: props.layoutArticle.text,
        index: props.index,
        row: props.parameters.row
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    })
  ),
  DropTarget(
    'Article',
    {
      canDrop() {
        return false
      },
      hover(props, monitor) {
        const dragRow = monitor.getItem().row
        const draggedId = monitor.getItem().id
        const index = monitor.getItem().index
        const overRow = props.parameters.row
        const overId = props.layoutArticle.id
        const overIndex = props.index

        if (index === overIndex) return
        if (draggedId === overId) return
        if (dragRow !== overRow) return

        if (index !== undefined && overIndex !== undefined)
          props.reorderArticleInRow(props.rowId, index, overIndex, draggedId, overId)

        monitor.getItem().index = overIndex
      }
    },
    connect => ({
      connectDropTarget: connect.dropTarget()
    })
  ),
  connect(
    null,
    {
      updateArticleSizeInLayout,
      reorderArticleInRow
    }
  )
)(LayoutArticle)