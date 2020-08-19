import blogService from '../services/blogs'
import blogs from '../services/blogs'

/* eslint-disable indent */
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs
    case 'CREATE_BLOG':
      return [...state, action.newBlog]
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.id)
    case 'LIKE_BLOG':
      return state.map(b => b.id === action.data.id ? action.data : b)
    case 'COMMENT_BLOG':
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    default:
      return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      newBlog
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = {...blog, likes: blog.likes + 1, user: blog.user.id}
    const data = await blogService.update(updatedBlog)
    const updatedData = {...data, user: blog.user}

    dispatch({
      type: 'LIKE_BLOG',
      data: updatedData
    })
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const returnedBlog = await blogService.comment(blog.id, comment)

    dispatch({
      type: 'COMMENT_BLOG',
      data: returnedBlog
    })
  }
}

export default blogReducer