import { combineReducers } from 'redux'

import articles, * as fromArticles from './articles'
import layoutArticles, * as fromLayoutArticles from './layout'

export default combineReducers({
  articles: articles,
  layout: layoutArticles
})

//Articles selector
export const getAllArticles = state =>
  fromArticles.getAllArticles(state.articles)

export const getIdsInLayout = state =>
  fromLayoutArticles.getIdsInLayout(state.layout)

//Layout selectors
export const getLayoutParameters = state =>
  fromLayoutArticles.getLayoutParameters(state.layout)

export const getLayoutParameterById = (paramId, state) =>
  fromLayoutArticles.getLayoutParameterById(paramId, state.layout)

export const getAllRows = state =>
  fromLayoutArticles.getAllRows(state.layout)

export const getRowById = (rowId, state) =>
  fromLayoutArticles.getRowById(rowId, state.layout)