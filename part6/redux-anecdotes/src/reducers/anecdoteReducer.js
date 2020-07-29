import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'UPDATE_ANECDOTE':
      const updatedAnecdote = action.data
      return state.map(anecdote => (
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )) 
    default:
      return state 
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const incrementVotes = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'UPDATE_ANECDOTE',
      data: updatedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer