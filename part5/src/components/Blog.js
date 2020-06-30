import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeHandler }) => {
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  return (
    <div style={style}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}</button>
      {visible && (
        <div>
          <div>URL: {blog.url}</div>
          <div>
           Likes: {blog.likes}
            <button onClick={addLike}>Like</button>
          </div>
          <div>User: {blog.user.username}</div>
          {removeHandler !== null && <button onClick={removeHandler}>Remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired
}

export default Blog