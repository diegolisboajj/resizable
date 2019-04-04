import { ADD_ARTICLE_TO_EXISTING_ROW, ADD_ARTICLE_TO_LAYOUT, CHANGE_ARTICLE_COLUMN_IN_ROW, UPDATE_ARTICLE_SIZE_IN_LAYOUT } from '../../actions'

const layoutArticle = (state, action) => {
  switch (action.type) {
    case ADD_ARTICLE_TO_LAYOUT:
      return {
        id: action.id,
        row: action.row,
        col: action.col,
        size: action.size
      }
    case ADD_ARTICLE_TO_EXISTING_ROW:
      return {
        ...state,
        row: action.rowId
      }
    case CHANGE_ARTICLE_COLUMN_IN_ROW:
      return {
        ...state,
        col: action.col
      }
    case UPDATE_ARTICLE_SIZE_IN_LAYOUT:
      return {
        ...state,
        size: action.size
      }
    default:
      return state
  }
}

export default layoutArticle