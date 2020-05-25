import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // Save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={ () => setGood(good + 1) } text='Good' />
      <Button handleClick={ () => setNeutral(neutral + 1) } text='Neutral' />
      <Button handleClick={ () => setBad(bad + 1) } text='Bad' />
      <Statistics good={ good } neutral={ neutral } bad={ bad } />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={ handleClick }>{ text }</button>
)

const Statistic = ({ number, text }) => (
  <p>{ text } { number }</p>
)

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h1>Statistics</h1>
      <Statistic number={ good } text='Good' />
      <Statistic number={ neutral } text='Neutral' />
      <Statistic number={ bad } text='Bad' />
      <Statistic number={ good + neutral + bad } text='All' />
      <Statistic number={ (good + bad * -1) / 3 } text='Average' />
      <Statistic number={ `${good / (good + neutral + bad)} %` } text='Positive' />
    </> 
  )
}

ReactDOM.render(<App />, document.getElementById('root'))