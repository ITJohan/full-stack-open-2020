import React from 'react'
import {connect} from 'react-redux'
import {incrementVotes} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const vote = anecdote => {
    props.incrementVotes(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 3)
  }

  return (
    <>
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = state => {
  const filteredAnecdotes = state.anecdotes.filter(a => a.content.includes(state.filter))
  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  
  return {
    anecdotes: sortedAnecdotes
  }
}

const mapDispatchToProps = {
  incrementVotes,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)