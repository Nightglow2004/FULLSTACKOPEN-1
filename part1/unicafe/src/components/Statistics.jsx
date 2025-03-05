import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
        {good + neutral + bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
      <h1>statistics</h1>
      <table>
        <tr>
        <StatisticLine text="good" value ={good} /><br />
        </tr>
        <tr>
        <StatisticLine text="neutral" value ={neutral} /><br />
        </tr>
        <tr>
        <StatisticLine text="bad" value ={bad} /> 
        </tr>
        <tr>
            <td>all</td>
            <td>{good + neutral + bad}</td>
        </tr>
        <tr>
            <td>average</td>
            <td>{(good - bad) / (good + neutral + bad)}</td>
        </tr>
        <tr>
            <td>positive </td>
            <td>{(good / (good + neutral + bad)) * 100} %</td>
        </tr>
      </table>
      </div>)}
      
    </div>
  )
}

export default Statistics
