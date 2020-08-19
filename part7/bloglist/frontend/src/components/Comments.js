import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addComment} from '../reducers/blogReducer'

const Comments = ({blog}) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(addComment(blog, {comment}))
    setComment('')
  }

  return (
    <div>
      <h3>Comments</h3>
      <input onChange={e => setComment(e.target.value)} value={comment}></input>
      <button onClick={handleSubmit}>add comment</button>
      <ul>
        {blog.comments.map(comment => {
          return (
            <li key={comment}>
              {comment}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Comments