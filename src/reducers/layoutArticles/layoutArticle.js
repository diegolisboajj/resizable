import { ADD_TO_EXISTING_ROW, ADD_TO_LAYOUT, CHANGE_COL, UPDATE_SIZE } from '../../actions'

const layoutArticle = (state, action) => {
  switch (action.type) {
    case ADD_TO_LAYOUT:
      return {
        id: action.id,
        row: action.row,
        col: action.col,
        size: action.size
      }
    case ADD_TO_EXISTING_ROW:
      return {
        ...state,
        row: action.rowId
      }
    case CHANGE_COL:
      return {
        ...state,
        col: action.col
      }
    case UPDATE_SIZE:
      return {
        ...state,
        size: action.size
      }
    default:
      return state
  }
}

export default layoutArticle