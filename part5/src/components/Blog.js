import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
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
            <button onClick={() => addLike(blog)}>Like</button>
          </div>
          <div>User: {blog.user.username}</div>
        </div>
      )}
    </div>
  )
}

export default Blog