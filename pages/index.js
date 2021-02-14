import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Form from '../components/Form'
import RisingSign from '../components/RisingSign'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [risingSign, setRisingSign] = useState()
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [tzone, setTzone] = useState('')

  useEffect(async () => {
    if (risingSign === undefined) {
      return
    }
    setRisingSign(risingSign)
  })

  const postApi = async (data) => {
    const res = await fetch('http://localhost:3000/api/ascendant', {
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
    setRisingSign(result)
  }

  const handleBirthData = async event => {
    event.preventDefault()
    
    const context = {
      day: parseInt(event.target.day.value),
      month: parseInt(event.target.month.value),
      year: parseInt(event.target.year.value),
      hour: parseInt(event.target.hour.value),
      min: parseInt(event.target.min.value),
      lat: lat,
      lon: long,
      tzone: (tzone)
    }
    postApi(context)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rising Sign Display Tool by Chani</title>
        <link rel="icon" href="/favicon.ico" />
        <script async defer src={`https://maps.googleapis.com/maps/api/js?key=${process.env.PLACES_API_KEY}&libraries=places`}></script>
      </Head>

      <header
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 77,
          marginBottom: 19.25
        }}
      >
        <Image
          src="https://chart.chaninicholas.com/static/media/Chani-Nicholas-Regular-Logo-1-Line-1600x182.236fd9a2.png"
          alt="Rising Sign Display Tool by Chani"
          width={800}
          height={91}
        />
      </header>

      <main className={styles.main}>
        {(!risingSign) ?
          <>
            <h1>Rising Sign</h1>
            <Form
              handleBirthData={handleBirthData}
              setLat={setLat}
              setLong={setLong}
              setTzone={setTzone}
            />
          </>
          :
          <>
            <Image
              src={`https://chaninicholas.com/wp-content/uploads/2019/12/${(risingSign.ascendant).toLowerCase()}@2x.png`}
              alt={`${risingSign.ascendant} Rising`}
              width={64}
              height={65}
            />

            <RisingSign
              ascendant={risingSign.ascendant}
              report={risingSign.report}
            />
          </>
        }
      </main>

    </div>
  )
}