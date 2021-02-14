import { Component } from 'react'
import SearchInput from './SearchInput'
import styles from '../styles/Form.module.css'

const currentYear = new Date().getFullYear()

export default class Form extends Component {
  state = {
    day: '',
    month: '',
    year: '',
    hour: '',
    min: '',
    lat: '',
    lon: '',
    tzone: ''
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
          <label htmlFor="day">Birth Day</label>
          <input
            id="day"
            name="day"
            type="number"
            autoComplete="day"
            min="1"
            max="31"
            value={this.day}
            className="input"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="month">Birth Month</label>
          <input
            id="month"
            name="month"
            type="number"
            autoComplete="month"
            min="1"
            max="12"
            value={this.month}
            className="input"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="year">Birth Year</label>
          <input
            id="year"
            name="year"
            type="number"
            autoComplete="year"
            placeholder="YYYY"
            max={currentYear}
            value={this.year}
            className="input"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="hour">Birth Hour</label>
          <input
            id="hour"
            name="hour"
            type="number"
            autoComplete="hour"
            placeholder="HH"
            value={this.hour}
            className="input"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="min">Birth Minute</label>
          <input
            id="min"
            name="min"
            type="number"
            autoComplete="min"
            placeholder="MM"
            value={this.min}
            className="input"
            onChange={this.handleChange}
            required  
          />
          <SearchInput
            setLat={this.props.setLat}
            setLong={this.props.setLong}
          />
          {/* <label htmlFor="lat">Lat</label>
          <input
            id="lat"
            name="lat"
            type="text"
            autoComplete="lat"
            value={this.lat}
            className="input"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="lon">Long</label>
          <input
            id="lon"
            name="lon"
            type="text"
            autoComplete="lon"
            value={this.lon}
            className="input"
            onChange={this.handleChange}
            required
          /> */}
          <label htmlFor="tzone">Tzone</label>
          <input
            id="tzone"
            name="tzone"
            type="number"
            autoComplete="tzone"
            value={this.tzone}
            className="input"
            onChange={this.handleChange}
            required
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