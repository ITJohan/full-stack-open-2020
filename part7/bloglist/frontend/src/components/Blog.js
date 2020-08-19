import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'

import {likeBlog, deleteBlog} from '../reducers/blogReducer'
import {setNotification} from '../reducers/notificationReducer'

import Comments from './Comments'

const Blog = () => {
  const {id} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const loggedInUser = useSelector(state => state.login)

  const addLike = () => {
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      dispatch(setNotification({
        content: 'Failed to add like',
        color: 'red'
      }, 3))
    }
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification({
          content: 'Removed blog',
          color: 'green'
        }, 3))

        history.goBack()
      } catch (exception) {
        dispatch(setNotification({
          content: 'Failed to remove blog',
          color: 'red'
        }, 3))
      }
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <div>URL: {blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={addLike}>Like</button>
        </div>
        <div>Added by {blog.user.username}</div>
        {loggedInUser.id === blog.user.id &&
          <button onClick={removeBlog}>Remove</button>
        }
        <Comments blog={blog} />
      </div>
    </div>
  )
}

export default Blog