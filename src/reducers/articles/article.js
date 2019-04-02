import { ADD_ARTICLE } from '../../actions'

const article = (state, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return {
        id: action.id,
        text: action.text
      }
    default:
      return state
  }
}

export default article