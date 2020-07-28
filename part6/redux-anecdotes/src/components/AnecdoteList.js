import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {incrementVotes} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(incrementVotes(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </> 
  )
}

export default AnecdoteList