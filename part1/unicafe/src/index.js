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

const Statistic = ({ value, text }) => (
  <p>{ text } { value }</p>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <>
        <h1>Statistics</h1>
        <Statistic value={ good } text='Good' />
        <Statistic value={ neutral } text='Neutral' />
        <Statistic value={ bad } text='Bad' />
        <Statistic value={ good + neutral + bad } text='All' />
        <Statistic value={ (good + bad * -1) / 3 } text='Average' />
        <Statistic value={ `${good / (good + neutral + bad)} %` } text='Positive' />
      </> 
    )
  } else {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))