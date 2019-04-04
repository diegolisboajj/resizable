import { combineReducers } from 'redux'

import articles, * as fromArticles from './articles'
import layoutArticles, * as fromLayoutArticles from './layoutArticles'

export default combineReducers({
  articles: articles,
  layoutArticles: layoutArticles
})

//Articles selector
export const getAllArticles = state =>
  fromArticles.getAllArticles(state.articles)

export const getIdsInLayout = state =>
  fromLayoutArticles.getIdsInLayout(state.layoutArticles)

//Layout selectors
export const getLayoutParameters = state =>
  fromLayoutArticles.getLayoutParameters(state.layoutArticles)

export const getLayoutParameterById = (paramId, state) =>
  fromLayoutArticles.getLayoutParameterById(paramId, state.layoutArticles)

export const getAllRows = state =>
  fromLayoutArticles.getAllRows(state.layoutArticles)

export const getRowById = (rowId, state) =>
  fromLayoutArticles.getRowById(rowId, state.layoutArticles)