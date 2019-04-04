import { v4 } from 'node-uuid'
//TODO change actions names:
export const ADD_ARTICLE = 'ADD_ARTICLE'
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE'
export const ADD_ARTICLE_TO_LAYOUT = 'ADD_ARTICLE_TO_LAYOUT'
export const REMOVE_ARTICLE_FROM_LAYOUT = 'REMOVE_ARTICLE_FROM_LAYOUT'
export const ADD_NEW_ROW_TO_LAYOUT = 'ADD_NEW_ROW_TO_LAYOUT'
export const ADD_ARTICLE_TO_EXISTING_ROW = 'ADD_ARTICLE_TO_EXISTING_ROW'
export const DELETE_ROW_FROM_LAYOUT = 'DELETE_ROW_FROM_LAYOUT'
export const CHANGE_ARTICLE_COLUMN_IN_ROW = 'CHANGE_ARTICLE_COLUMN_IN_ROW'
export const UPDATE_ARTICLE_SIZE_IN_LAYOUT = 'UPDATE_ARTICLE_SIZE_IN_LAYOUT'
export const REORDER_ARTICLE_IN_ROW = 'REORDER_ARTICLE_IN_ROW'

export const addArticle = text => ({
  type: ADD_ARTICLE,
  id: v4(),
  text
})

export const removeArticle = id => ({
  type: REMOVE_ARTICLE,
  id
})

export const addArticleToLayout = ({ id, col, row, size }) => ({
  type: ADD_ARTICLE_TO_LAYOUT,
  id,
  col,
  row,
  size
})


export const removeArticleFromLayout = id => ({
  type: REMOVE_ARTICLE_FROM_LAYOUT,
  id
})

export const addNewRowToLayout = () => ({
  type: ADD_NEW_ROW_TO_LAYOUT,
  id: v4()
})

export const addArticleToExistingRow = ({ id, rowId }) => ({
  type: ADD_ARTICLE_TO_EXISTING_ROW,
  id,
  rowId
})

export const deleteRowFromLayout = id => ({
  type: DELETE_ROW_FROM_LAYOUT,
  id
})

export const changeArticleColumnInRow = ({ id, col }) => ({
  type: CHANGE_ARTICLE_COLUMN_IN_ROW,
  id,
  col
})

export const updateArticleSizeInLayout = ({ id, size }) => ({
  type: UPDATE_ARTICLE_SIZE_IN_LAYOUT,
  id,
  size
})

export const reorderArticleInRow = (rowId, index, overIndex, draggedId, overId) => ({
  type: REORDER_ARTICLE_IN_ROW,
  rowId: rowId,
  index: index,
  overIndex: overIndex,
  draggedId: draggedId,
  overId: overId
})