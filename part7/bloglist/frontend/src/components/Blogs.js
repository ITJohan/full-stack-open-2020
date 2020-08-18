import React, {useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import BlogForm from '../components/BlogForm'
import Toggleable from '../components/Toggleable'

import {createBlog} from '../reducers/blogReducer'
import {setNotification} from '../reducers/notificationReducer'

const Blogs = () => {
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

  const dispatch = useDispatch()

  const addBlog = blogObject => {
    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification({
        content: 'Blog added!',
        color: 'green'
      }, 3))
    } catch (exception) {
      dispatch(setNotification({
        content: 'Error creating blog',
        color: 'red'
      }, 3))
    }

    blogFormRef.current.toggleVisibility()
  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Toggleable buttonLabel="Create new" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>
    )
  }

  return (
    <div>
      {blogForm()}
      {blogs.map(blog =>
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          <div style={style}>{blog.title} {blog.author}</div>
        </Link>
      )}
    </div>
  )
}

export default Blogs