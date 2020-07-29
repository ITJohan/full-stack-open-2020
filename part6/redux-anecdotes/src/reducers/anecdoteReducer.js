const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => (
        anecdote.id === id ? changedAnecdote : anecdote
      ))
    default:
      return state 
  }
}

export const createAnecdote = content => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: Math.floor(Math.random() * 10000),
      votes: 0
    } 
  }
}

export const incrementVotes = id => {
  return {
    type: 'VOTE_ANECDOTE',
    data: {id}
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default anecdoteReducer