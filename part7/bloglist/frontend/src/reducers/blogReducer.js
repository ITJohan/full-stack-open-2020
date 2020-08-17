import blogService from '../services/blogs'

/* eslint-disable indent */
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATE':
      return [...state, action.data]
    default:
      return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const data = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export default blogReducer