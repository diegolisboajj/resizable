import { combineReducers } from 'redux'

import {
  ADD_ARTICLE_TO_EXISTING_ROW,
  ADD_ARTICLE_TO_LAYOUT,
  CHANGE_ARTICLE_COLUMN_IN_ROW,
  REMOVE_ARTICLE_FROM_LAYOUT
} from '../../actions'
import rows from './rows'
import parameter from './parameter'

const byIdsInLayout = (state = {}, action) => {
  switch (action.type) {
    case ADD_ARTICLE_TO_LAYOUT:
      return {
        ...state,
        [action.id]: parameter(state[action.id], action)
      }
    case REMOVE_ARTICLE_FROM_LAYOUT:
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    case ADD_ARTICLE_TO_EXISTING_ROW:
      return Object.assign({}, state, {
        [action.id]: parameter(state[action.id], action)
      })
    case CHANGE_ARTICLE_COLUMN_IN_ROW:
      return Object.assign({}, state, {
        [action.id]: parameter(state[action.id], action)
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

const layout = combineReducers({
  byIdsInLayout,
  allIdsInLayout,
  rows
})

export default layout

//Selectors
export const getIdsInLayout = state => state.allIdsInLayout
export const getLayoutParameters = state => state.allIdsInLayout.map(id => state.byIdsInLayout[id])
export const getLayoutParameterById = (paramId, state) => state.byIdsInLayout[paramId]
export const getAllRows = state => state.rows.rowsInLayout.map(id => state.rows.rowsById[id])
export const getRowById = (rowId, state) => state.rows.rowsById[rowId]