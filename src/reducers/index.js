import { combineReducers } from 'redux'

import articles, * as fromArticles from './articles'
import layoutArticles, * as fromLayoutArticles from './layoutArticles'

export default combineReducers({
  articles: articles,
  layoutArticles: layoutArticles
})

//All selectors
export const getAllArticles = state =>
  fromArticles.getAllArticles(state.articles)

export const getIdsInLayout = state =>
  fromLayoutArticles.getIdsInLayout(state.layoutArticles)

export const getLayoutParameters = state =>
  fromLayoutArticles.getLayoutParameters(state.layoutArticles)

export const getAllRows = state =>
  fromLayoutArticles.getAllRows(state.layoutArticles)

export const getRowsByIds = state =>
  fromLayoutArticles.getRowsByIds(state.layoutArticles)