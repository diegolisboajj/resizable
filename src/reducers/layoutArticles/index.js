import update from 'immutability-helper'

import {
  ADD_NEW_ROW,
  ADD_TO_EXISTING_ROW,
  ADD_TO_LAYOUT,
  CHANGE_COL,
  DELETE_ROW, MOVE_ARTICLE,
  REMOVE_FROM_LAYOUT, UPDATE_SIZE
} from '../../actions'
import { combineReducers } from 'redux'
import layoutArticle from './layoutArticle'

const byIdsInLayout = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_LAYOUT:
      return {
        ...state,
        [action.id]: layoutArticle(state[action.id], action)
      }
    case REMOVE_FROM_LAYOUT:
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    case ADD_TO_EXISTING_ROW:
      return Object.assign({}, state, {
        [action.id]: layoutArticle(state[action.id], action)
      })
    case CHANGE_COL:
      return Object.assign({}, state, {
        [action.id]: layoutArticle(state[action.id], action)
      })
    case UPDATE_SIZE:
      return Object.assign({}, state, {
        [action.id]: layoutArticle(state[action.id], action)
      })
    default:
      return state
  }
}

const allIdsInLayout = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_LAYOUT:
      return [...state, action.id]
    case REMOVE_FROM_LAYOUT:
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}

const rowsById = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_LAYOUT:
      return {
        ...state,
        [action.row]: {
          rowId: action.row,
          articlesInRow: [...state[action.row].articlesInRow, action.id]
        }
      }
    case ADD_NEW_ROW:
      return {
        ...state,
        [action.id]: {
          rowId: action.id,
          articlesInRow: []
        }
      }
    case DELETE_ROW:
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    case ADD_TO_EXISTING_ROW:
      return {
        ...state,
        [action.rowId]: {
          ...state[action.rowId],
          articlesInRow: [...state[action.rowId].articlesInRow, action.id]
        }
      }
    case MOVE_ARTICLE:
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
    default:
      return state
  }
}

const rowsInLayout = (state = [], action) => {
  switch (action.type) {
    case ADD_NEW_ROW:
      return [...state, action.id]
    case DELETE_ROW:
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
export const getAllRows = state => state.rowsInLayout
export const getRowsByIds = state => state.rowsInLayout.map(id => state.rowsById[id])
