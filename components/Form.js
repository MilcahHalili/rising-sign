import userId from '../.env.local'
import apiKey from '../.env.local'

export default function Form(props) {
  const getRisingSign = async event => {
    event.preventDefault()
    
    // const res = await fetch('/api/risingSign', {
    //   body: JSON.stringify({
    //     message: event.target.name.value
    //   }),
    //   // headers: {
    //   //   'Content-Type': 'application/json'
    //   // },
    //   method: 'POST'
    // })

    // const result = await res.json()

    // return {
    //   props: result
    // }

    const body = {
      day: 10,
      month: 5,
      year: 1990,
      hour: 19,
      min: 55,
      lat: 19.2056,
      lon: 25.2056,
      tzone: 5.5
    }
    // Call an external API endpoint to POST form body
    const res = await fetch(
      'https://json.astrologyapi.com/v1/general_ascendant_report/tropical',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${userId}:${apiKey}`).toString('base64'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    )
    const data = await res.json()
    // return {
    //   props: data
    // }
    console.log(data)
  }

  return (
    <>
      <form onSubmit={getRisingSign}>
        <label htmlFor="message">Message</label>
        <input
          id="message"
          name="message"
          type="text"
          autoComplete="message"
          required
        />
        <button type="submit">SUBMIT</button>
      </form>
    </>
  )
}