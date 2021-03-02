import { Component } from 'react'
import MiddayDropdown from './MiddayDropdown'
import MonDropdown from './MonDropdown'
import SearchInput from './SearchInput'

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
    if (prevProps.month !== this.props.month) {
      this.calculateMaxDays()
    } else if (prevState.year !== this.state.year) {
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
    if (this.props.month === '1' || this.props.month === '3' || this.props.month === '5' || this.props.month === '7' || this.props.month === '8' || this.props.month === '10' || this.props.month === '12') {
      this.setState({
        maxDays: 31
      })
    } else if (this.props.month === '4' || this.props.month === '6' || this.props.month === '9' || this.props.month === '11') {
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
      <main className="main">
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
          <div id="submitCntnr">
            <input
              type="submit"
              value="SUBMIT"
              id="submit"
            />
          </div>
        </form>
        <style jsx>{`
          .main {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-width: 33%;
            min-width: 25%;
          }
          form {
            width: 300px;
          }
          #submitCntnr {
            text-align: center;
            margin: 10px 0 77px 0;
          }
          #submit {
            background: rgb(255,14,80);
            background: linear-gradient(90deg, rgba(255,14,80,1) 0%, rgba(213,45,155,1) 50%);
            font-style: italic;
            font-weight: 900;
            font-size: 25px;
            color: rgb(255, 255, 255);
            border: none;
            width: 175px;
            padding: 10px 0;
            border-radius: 25px;
          }
        `}
        </style>
      </main>
    )
  }
}