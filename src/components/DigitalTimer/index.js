import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerOn: false,
    minutes: 25,
    seconds: 1500,
  }

  isTimeCompleted = true

  componentDidMount() {}

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  onStart = () => {
    const {isTimerOn} = this.state
    this.setState(prevState => ({
      isTimerOn: !prevState.isTimerOn,
    }))
    this.isTimeCompleted = false
    if (isTimerOn === false) {
      this.timerID = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timerID)
    }
  }

  tick = () => {
    const {seconds} = this.state
    if (seconds > 0) {
      this.setState({seconds: seconds - 1})
    } else {
      clearInterval(this.timerID)
      this.setState({
        isTimerOn: false,
      })
      this.isTimeCompleted = true
    }
  }

  onReset = () => {
    this.setState({
      isTimerOn: false,
      minutes: '25',
      seconds: '1500',
    })
    this.isTimeCompleted = true
    clearInterval(this.timerID)
  }

  onDecrement = () => {
    const isTimerOn = this.state
    if (isTimerOn === true) {
      return
    }
    let {minutes} = this.state
    if (minutes > 0) {
      minutes -= 1
      const seconds = minutes * 60
      this.setState({
        minutes,
        seconds,
      })
    }
  }

  onIncrement = () => {
    const isTimerOn = this.state
    if (isTimerOn === true) {
      return
    }
    let {minutes} = this.state
    minutes += 1
    const seconds = minutes * 60
    this.setState({
      minutes,
      seconds,
    })
  }

  stringifyTime = s => {
    const minutes = Math.floor(s / 60)
    const seconds = s % 60
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return {stringifiedMinutes, stringifiedSeconds}
  }

  render() {
    const {isTimerOn, minutes, seconds} = this.state
    const playOrPauseImg = isTimerOn
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const playOrPauseAlt = isTimerOn ? 'pause icon' : 'play icon'
    const playOrPauseText = isTimerOn ? 'Pause' : 'Start'
    const status = isTimerOn ? 'Running' : 'Paused'

    const {stringifiedMinutes, stringifiedSeconds} = this.stringifyTime(seconds)

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="dashboard">
          <div className="timer-container">
            <div className="timer">
              <h1 className="remaining-time">
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              <p className="timer-status">{status}</p>
            </div>
          </div>
          <div className="user-inputs">
            <div className="buttons-container">
              <button type="button" className="btn" onClick={this.onStart}>
                <img
                  src={playOrPauseImg}
                  alt={playOrPauseAlt}
                  className="icon"
                />
                <p className="identifiers p">{playOrPauseText}</p>
              </button>

              <button type="button" className="btn" onClick={this.onReset}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                <p className="identifiers">Reset</p>
              </button>
            </div>
            <p className="info">Set Timer limit</p>
            <div className="set-timer">
              <button
                type="button"
                className="btn"
                onClick={this.onDecrement}
                disabled={!this.isTimeCompleted}
              >
                -
              </button>
              <p className="limit">{minutes}</p>
              <button
                type="button"
                className="btn"
                onClick={this.onIncrement}
                disabled={!this.isTimeCompleted}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
