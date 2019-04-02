import { v4 } from 'node-uuid'

export const ADD_ARTICLE = 'ADD_ARTICLE'
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE'
export const ADD_TO_LAYOUT = 'ADD_TO_LAYOUT'
export const REMOVE_FROM_LAYOUT = 'REMOVE_FROM_LAYOUT'
export const ADD_NEW_ROW = 'ADD_NEW_ROW'
export const ADD_TO_EXISTING_ROW = 'ADD_TO_EXISTING_ROW'
export const DELETE_ROW = 'DELETE_ROW'
export const CHANGE_COL = 'CHANGE_COL'
export const UPDATE_SIZE = 'UPDATE_SIZE'
export const MOVE_ARTICLE = 'MOVE_ARTICLE'

export const addArticle = text => ({
  type: ADD_ARTICLE,
  id: v4(),
  text
})

export const removeArticle = id => ({
  type: REMOVE_ARTICLE,
  id
})

export const addToLayout = ({ id, col, row, size }) => ({
  type: ADD_TO_LAYOUT,
  id,
  col,
  row,
  size
})


export const removeFromLayout = id => ({
  type: REMOVE_FROM_LAYOUT,
  id
})

export const addNewRow = () => ({
  type: ADD_NEW_ROW,
  id: v4()
})

export const addToExistingRow = ({ id, rowId }) => ({
  type: ADD_TO_EXISTING_ROW,
  id,
  rowId
})

export const deleteRow = id => ({
  type: DELETE_ROW,
  id
})

export const changeCol = ({ id, col }) => ({
  type: CHANGE_COL,
  id,
  col
})

export const updateSize = ({ id, size }) => ({
  type: UPDATE_SIZE,
  id,
  size
})

export const moveArticle = (rowId, index, overIndex, draggedId, overId) => ({
  type: MOVE_ARTICLE,
  rowId: rowId,
  index: index,
  overIndex: overIndex,
  draggedId: draggedId,
  overId: overId
})