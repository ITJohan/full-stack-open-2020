import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const topIndex = votes.reduce((maxIndex, elem, index, arr) => elem > arr[maxIndex] ? index : maxIndex, 0)

  const generateIndex = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const setVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Section anecdotes={anecdotes} header='Anecdote of the day' index={selected} votes={votes} />
      <Button handleClick={() => setVote()} text='Vote' />
      <Button handleClick={() => setSelected(generateIndex())} text='Next anecdote' />
      <Section anecdotes={anecdotes} header='Anecdote with most votes' index={topIndex} votes={votes} />
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Section = ({anecdotes, header, index, votes}) => {
  return (
    <>
      <h1>{header}</h1>
      <div>{anecdotes[index]}</div>
      <div>Has {votes[index]} votes.</div>
    </>
  )
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))