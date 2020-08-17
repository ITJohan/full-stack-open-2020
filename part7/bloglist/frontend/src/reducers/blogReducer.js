import blogService from '../services/blogs'

/* eslint-disable indent */
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.blogs
    case 'CREATE':
      return [...state, action.newBlog]
    case 'DELETE':
      return state.filter(blog => blog.id !== action.id)
    case 'LIKE':
      const liked = action.data
      return state.map(b => b.id === liked.id ? liked : b)
    default:
      return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      newBlog
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
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
      type: 'LIKE',
      data: updatedData
    })
  }
}

export default blogReducer