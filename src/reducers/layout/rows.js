import { combineReducers } from 'redux'
import update from 'immutability-helper'

import {
  ADD_ARTICLE_TO_EXISTING_ROW,
  ADD_ARTICLE_TO_LAYOUT,
  ADD_NEW_ROW_TO_LAYOUT,
  DELETE_ROW_FROM_LAYOUT,
  REMOVE_ARTICLE_FROM_LAYOUT, REMOVE_ARTICLE_FROM_ROW, REORDER_ARTICLE_IN_ROW
} from '../../actions'

const rowsById = (state = {}, action) => {
  switch (action.type) {
    case ADD_ARTICLE_TO_LAYOUT:
      return {
        ...state,
        [action.row]: {
          rowId: action.row,
          articlesInRow: [...state[action.row].articlesInRow, action.id]
        }
      }
    case ADD_NEW_ROW_TO_LAYOUT:
      return {
        ...state,
        [action.id]: {
          rowId: action.id,
          articlesInRow: []
        }
      }
    case DELETE_ROW_FROM_LAYOUT:
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    case REMOVE_ARTICLE_FROM_LAYOUT:
      return {
        ...state,
        [action.rowId]: {
          ...state[action.rowId],
          articlesInRow: state[action.rowId].articlesInRow.filter(articleId => articleId !== action.id)
        }
      }
    case ADD_ARTICLE_TO_EXISTING_ROW:
      return {
        ...state,
        [action.rowId]: {
          ...state[action.rowId],
          articlesInRow: [...state[action.rowId].articlesInRow, action.id]
        }
      }
    case REORDER_ARTICLE_IN_ROW:
      return {
        ...state,
        [action.rowId]: {
          ...state[action.rowId],
          articlesInRow: update(
            state[action.rowId].articlesInRow, {
              $splice: [[action.index, 1], [action.overIndex, 0, action.draggedId]]
            }
          )
        }
      }
    case REMOVE_ARTICLE_FROM_ROW:
      return {
        ...state,
        [action.rowId]: {
          ...state[action.rowId],
          articlesInRow: state[action.rowId].articlesInRow.filter(id => id !== action.articleId)
        }
      }
    default:
      return state
  }
}

const rowsInLayout = (state = [], action) => {
  switch (action.type) {
    case ADD_NEW_ROW_TO_LAYOUT:
      return [...state, action.id]
    case DELETE_ROW_FROM_LAYOUT:
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}

const rows = combineReducers({
  rowsById,
  rowsInLayout
})

export default rows
