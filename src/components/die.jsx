import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons'

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  }
  function displayFont() {
    if (props.value === 1) {
      return <FontAwesomeIcon icon={faDiceOne} />
    } else if (props.value === 2) {
      return <FontAwesomeIcon icon={faDiceTwo} />
    } else if (props.value === 3) {
      return <FontAwesomeIcon icon={faDiceThree} />
    } else if (props.value === 4) {
      return <FontAwesomeIcon icon={faDiceFour} />
    } else if (props.value === 5) {
      return <FontAwesomeIcon icon={faDiceFive} />
    } else if (props.value === 6) {
      return <FontAwesomeIcon icon={faDiceSix} />
    }
  }
  return (
    <div className="die-face" style={styles} onClick={props.holdDie}>
      <h2 className="die-num" style={{ color: props.isHeld ? 'rgba(0,0,0,0.1)' : 'black' }}>
        {displayFont()}
      </h2>
    </div>
  )
}
