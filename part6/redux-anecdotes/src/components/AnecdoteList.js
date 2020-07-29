import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {incrementVotes} from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const filteredAnecdotes = state.anecdotes.filter(a => a.content.includes(state.filter))
    const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)
    return sortedAnecdotes
  })
  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(incrementVotes(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </> 
  )
}

export default AnecdoteList