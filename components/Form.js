import { Component } from 'react'
import MiddayDropdown from './MiddayDropdown'
import MonDropdown from './MonDropdown'
import SearchInput from './SearchInput'
import styles from '../styles/Form.module.css'

let currentYear = new Date().getFullYear()

export default class Form extends Component {
  state = {
    day: '',
    year: '',
    hour: '',
    min: '',
    maxDays: 31
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.month !== this.state.month) {
      this.calculateMaxDays()
    }
  }

  calculateFebMaxDays = () => {
    let lastTwoDigits = parseInt(this.state.year.toString().substr(-2));
    (this.state.year % 4 === 0 && this.state.year % 10 === 0 && this.state.year % 40 === lastTwoDigits) ?
      this.setState({
        maxDays: 29
      })
    :
      this.setState({
        maxDays: 28
      })
  }

  calculateMaxDays = () => {
    if (this.state.month === '1' || this.state.month === '3' || this.state.month === '5' || this.state.month === '7' || this.state.month === '8' || this.state.month === '10' || this.state.month === '12') {
      this.setState({
        maxDays: 31
      })
    } else if (this.state.month === '4' || this.state.month === '6' || this.state.month === '9' || this.state.month === '11') {
      this.setState({
        maxDays: 30
      })
    } else {
      this.calculateFebMaxDays()
    }
  }

  postTimeZoneApi = async (data) => {
    data = {
      lat: this.props.lat,
      lon: this.props.lon,
      date: `${this.state.year}-${this.props.month}-${this.state.day}`
    }
    const res = await fetch('/api/timezone', {
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
    this.props.setTzone(result.timezone)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render() {
    return (
      <main className={styles.main}>
        <form onSubmit={this.props.handleBirthData}>
          <label htmlFor="year">Birth Year</label>
          <input
            name="year"
            type="number"
            autoComplete="year"
            placeholder="YYYY"
            min={1850}
            max={currentYear}
            value={this.year}
            className="input"
            onChange={this.handleChange}
            required
            
          />
          <MonDropdown
            setMonth={this.props.setMonth}
          />
          <label htmlFor="day">Birth Day</label>
          <input
            name="day"
            type="number"
            autoComplete="day"
            placeholder="DD"
            min="1"
            max={this.state.maxDays}
            value={this.day}
            className="input"
            onChange={this.handleChange}
            required
          />
          <SearchInput
            day={this.props.day}
            month={this.props.month}
            year={this.props.year}
            postTimeZoneApi={this.postTimeZoneApi}
            setLat={this.props.setLat}
            setLong={this.props.setLong}
          />
          <label htmlFor="hour">Birth Hour</label>
          <input
            name="hour"
            type="number"
            autoComplete="hour"
            placeholder="HH"
            min="1"
            max="12"
            value={this.hour}
            className="input"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="min">Birth Minute</label>
          <input
            name="min"
            type="number"
            autoComplete="min"
            placeholder="MM"
            min="0"
            max="59"
            value={this.min}
            className="input"
            onChange={this.handleChange}
            required  
          />
          <MiddayDropdown
            setMidday={this.props.setMidday}
          />
          <div id={styles.submitCntnr}>
            <input
              type="submit"
              value="SUBMIT"
              id={styles.submit}
            />
          </div>
        </form>
      </main>
    )
  }
}