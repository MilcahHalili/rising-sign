import React, { Component } from 'react'

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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render() {
    return (
      <>
        <form onSubmit={this.props.handleBirthData}>
          <label htmlFor="day">Birth Day</label>
          <input
            id="day"
            name="day"
            type="number"
            autoComplete="day"
            value={this.day}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="month">Birth Month</label>
          <input
            id="month"
            name="month"
            type="number"
            autoComplete="month"
            value={this.month}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="year">Birth Year</label>
          <input
            id="year"
            name="year"
            type="number"
            autoComplete="year"
            value={this.year}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="hour">Birth Hour</label>
          <input
            id="hour"
            name="hour"
            type="number"
            autoComplete="hour"
            value={this.hour}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="min">Birth Minute</label>
          <input
            id="min"
            name="min"
            type="number"
            autoComplete="min"
            value={this.min}
            onChange={this.handleChange}
            required  
          />
          <label htmlFor="lat">Lat</label>
          <input
            id="lat"
            name="lat"
            type="number"
            autoComplete="lat"
            value={this.lat}
            onChange={this.handleChange}
            step="any"
            required
          />
          <label htmlFor="lon">Long</label>
          <input
            id="lon"
            name="lon"
            type="number"
            autoComplete="lon"
            value={this.lon}
            onChange={this.handleChange}
            step="any"
            required
          />
          <label htmlFor="tzone">Tzone</label>
          <input
            id="tzone"
            name="tzone"
            type="number"
            autoComplete="tzone"
            value={this.tzone}
            onChange={this.handleChange}
            step="any"
            required
          />
          <input type="submit" value="SUBMIT" />
        </form>
      </>
    )
  }
}