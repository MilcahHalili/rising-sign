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