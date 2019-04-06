import update from 'immutability-helper'

import {
  ADD_NEW_ROW_TO_LAYOUT,
  ADD_ARTICLE_TO_EXISTING_ROW,
  ADD_ARTICLE_TO_LAYOUT,
  CHANGE_ARTICLE_COLUMN_IN_ROW,
  DELETE_ROW_FROM_LAYOUT, REORDER_ARTICLE_IN_ROW,
  REMOVE_ARTICLE_FROM_LAYOUT, REMOVE_ARTICLE_FROM_ROW
} from '../../actions'
import { combineReducers } from 'redux'
import layoutArticle from './layoutArticle'

const byIdsInLayout = (state = {}, action) => {
  switch (action.type) {
    case ADD_ARTICLE_TO_LAYOUT:
      return {
        ...state,
        [action.id]: layoutArticle(state[action.id], action)
      }
    case REMOVE_ARTICLE_FROM_LAYOUT:
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    case ADD_ARTICLE_TO_EXISTING_ROW:
      return Object.assign({}, state, {
        [action.id]: layoutArticle(state[action.id], action)
      })
    case CHANGE_ARTICLE_COLUMN_IN_ROW:
      return Object.assign({}, state, {
        [action.id]: layoutArticle(state[action.id], action)
      })
    default:
      return state
  }
}

const allIdsInLayout = (state = [], action) => {
  switch (action.type) {
    case ADD_ARTICLE_TO_LAYOUT:
      return [...state, action.id]
    case REMOVE_ARTICLE_FROM_LAYOUT:
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}

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

const layoutArticles = combineReducers({
  byIdsInLayout,
  allIdsInLayout,
  rowsById,
  rowsInLayout
})

export default layoutArticles

//Selectors
export const getIdsInLayout = state => state.allIdsInLayout
export const getLayoutParameters = state => state.allIdsInLayout.map(id => state.byIdsInLayout[id])
export const getLayoutParameterById = (paramId, state) => state.byIdsInLayout[paramId]
export const getAllRows = state => state.rowsInLayout.map(id => state.rowsById[id])
export const getRowById = (rowId, state) => state.rowsById[rowId]