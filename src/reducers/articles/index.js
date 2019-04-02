import { combineReducers } from 'redux'

import { ADD_ARTICLE, REMOVE_ARTICLE } from '../../actions'
import article from './article'
import { sidebar } from '../../helpers/initialData'

const byId = (state = sidebar, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return {
        ...state,
        [action.id]: article(state[action.id], action)
      }
    case REMOVE_ARTICLE:
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    default:
      return state
  }
}

const allIds = (state = Object.keys(sidebar), action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return [...state, action.id]
    case REMOVE_ARTICLE:
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}

const articles = combineReducers({
  byId,
  allIds
})

export default articles

//Selectors
export const getAllArticles = state => state.allIds.map(id => state.byId[id])