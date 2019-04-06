import {
  ADD_ARTICLE_TO_EXISTING_ROW,
  ADD_ARTICLE_TO_LAYOUT,
  CHANGE_ARTICLE_COLUMN_IN_ROW
} from '../../actions'

const parameter = (state, action) => {
  switch (action.type) {
    case ADD_ARTICLE_TO_LAYOUT:
      return {
        id: action.id,
        row: action.row,
        col: action.col
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
    default:
      return state
  }
}

export default parameter