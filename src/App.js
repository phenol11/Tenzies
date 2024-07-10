import React from 'react'
import Die from './components/die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [tractRoll, setTrackRoll] = React.useState(false)
  const [rollNum, setRollNum] = React.useState(0)
  const [startTime, setStartTime] = React.useState(null)
  const [endTime, setEndTime] = React.useState(null)
  const [isGame, setIsGame] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    const newArray = []
    for (let i = 0; i < 10; i++) {
      newArray.push({ value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() })
    }
    return newArray
  }

  function rollDice() {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (!tenzies) {
      setDice((oldDie) =>
        oldDie.map((die) => {
          return die.isHeld ? die : { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() }
        })
      )
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
    setTrackRoll(true)

    //tracker
    setRollNum((prevRoll) => prevRoll + 1)

    if (allHeld && allSameValue) {
      setRollNum(0)
      setTrackRoll(false)
      setEndTime(Date.now())
      setIsGame(true)
    }
    if (!isGame) {
      setIsGame(true)
      setStartTime(Date.now())
    }
  }
  function holdDie(id) {
    tractRoll &&
      setDice((oldDie) =>
        oldDie.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        })
      )
  }
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it ats current value between rolls.</p>
      {isGame && tenzies && <div className="game-time">You finished the game in: {(endTime - startTime) / 1000} seconds</div>}
      <div className="die-container">
        {dice.map((diceElem) => (
          <Die key={diceElem.id} value={diceElem.value} isHeld={diceElem.isHeld} holdDie={() => holdDie(diceElem.id)} />
        ))}
      </div>
      {tenzies && <div className="roll">You rolled the dice {rollNum} times.</div>}
      <button onClick={rollDice} className="roll-dice">
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  )
}

export default App
