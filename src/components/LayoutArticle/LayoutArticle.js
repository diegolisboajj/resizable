import React, { Component } from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import flow from 'lodash/flow'

import isOdd from '../../helpers/isOdd'
import { changeArticleColumnInRow, reorderArticleInRow } from '../../actions'

import '../../grid.scss'
import './LayoutArticle.scss'
import BEM from '../../helpers/BEM'
import { getRowById } from '../../reducers'

const b = BEM('LayoutArticle')

class LayoutArticle extends Component {
  state = {
    dragging: false,
    initX: null,
    initialMaxWidth: null,
    size: null,
    columns: []
  }

  setArticlesCells = (size, articleId) => {
    if (this.props.articlesInRow.length < 3) {
      articleId !== this.props.parameters.id ?
        this.props.changeArticleColumnInRow({
          id: articleId,
          col: `${12 - size}`
        }) :
        this.props.changeArticleColumnInRow({
          id: this.props.parameters.id,
          col: `${size}`
        })
    } else if (this.props.articlesInRow.length > 3 && isOdd(12 - size)) {
      if (articleId !== this.props.parameters.id) {
        if (this.state.columns.length < 2) {
          this.props.changeArticleColumnInRow({
            id: articleId,
            col: `${Math.round((12 - size) / this.props.articlesInRow.length - 1)}`
          })
          this.setState(state => ({
            ...state,
            columns: [...state.columns, Math.round((12 - size) / this.props.articlesInRow.length - 1)]
          }))
        } else {
          this.props.changeArticleColumnInRow({
            id: articleId,
            col: `${size - Math.round((12 - size) / this.props.articlesInRow.length - 1)}`
          })
        }
      } else {
        this.props.changeArticleColumnInRow({
          id: this.props.parameters.id,
          col: `${size}`
        })
        this.setState(state => ({
          ...state,
          columns: [...state.columns, size]
        }))
      }
    } else {
      articleId !== this.props.parameters.id ?
        this.props.changeArticleColumnInRow({
          id: articleId,
          col: `${Math.round((12 - size) / this.props.articlesInRow.length - 1)}`
        }) :
        this.props.changeArticleColumnInRow({
          id: this.props.parameters.id,
          col: `${size}`
        })
    }
  }

  handleMouseDown = e => {
    e.preventDefault()
    if (!this.state.dragging) {
      this.setState(state => ({
        ...state,
        dragging: true,
        initialMaxWidth: this.props.containerWidth / 12 * parseInt(this.props.parameters.col),
        size: this.props.containerWidth / 12 * parseInt(this.props.parameters.col)
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
    e.preventDefault()
    if (!this.state.initX) {
      this.setState(state => ({
        ...state,
        initX: e.pageX,
        initialMaxWidth: this.state.size
      }))
    } else {
      const delta = e.pageX - this.state.initX
      const maxWidth = this.state.initialMaxWidth + delta
      if (this.props.containerWidth / 12 * 1 < maxWidth < this.props.containerWidth / 12 * 11)
        this.props.articlesInRow.map(articleId => {
          this.setArticlesCells(Math.round(maxWidth / (this.props.containerWidth / 12)), articleId)
        })
      this.setState(state => ({
        ...state,
        size: maxWidth
      }))
    }
  }

  render() {
    const { size } = this.state
    const { parameters, layoutArticle, connectDropTarget, connectDragSource, resize } = this.props
    return connectDropTarget(
      connectDragSource(
        <div className={`grid__cell_${parameters.col} ${b()}`}
             style={this.state.dragging ? { minWidth: `${size}px`, maxWidth: `${size}px` } : {}}>
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
      canDrop: () => false,
      hover: (props, monitor) => {
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
    (state, props) => ({
      articlesInRow: getRowById(props.rowId, state).articlesInRow
    }),
    {
      reorderArticleInRow,
      changeArticleColumnInRow
    }
  )
)(LayoutArticle)