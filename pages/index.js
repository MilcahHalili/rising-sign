import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Form from '../components/Form'
import RisingSign from '../components/RisingSign'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [midday, setMidday] = useState('')
  const [month, setMonth] = useState('')
  const [risingSign, setRisingSign] = useState()
  const [tzone, setTzone] = useState('')
  const router = useRouter()

  useEffect(async () => {
    setTzone(tzone)
    setRisingSign(risingSign)
  })

  const postApi = async data => {
    const res = await fetch('/api/ascendant', {
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
      month: month,
      year: parseInt(event.target.year.value),
      hour: ((midday === 'PM' && parseInt(event.target.hour.value) !== 12) ? (parseInt(event.target.hour.value) + 12) : parseInt(event.target.hour.value)),
      min: parseInt(event.target.min.value),
      lat: lat,
      lon: long,
      tzone: tzone
    }
    postApi(context)
    router.push('/#__next', '/')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rising Sign Display Tool by Chani</title>
        <link rel="icon" href="/favicon.ico" />
        <script src={`
          https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_PLACES_API_KEY}&libraries=places
        `}></script>
      </Head>

      <header
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 77,
          marginBottom: 19.25
        }}
      >
        <Link href="/">
          <a onClick={() => setRisingSign('')}>
            <Image
              id="chani"
              src="/images/Chani-Nicholas-Logo.png"
              alt="Rising Sign Display Tool by Chani"
              width={800}
              height={91}
            />
          </a>
        </Link>
      </header>

      <main className={styles.main}>
        {(!risingSign) ?
          <>
            <h1>Rising Sign</h1>
            <Form
              handleBirthData={handleBirthData}
              setLat={setLat}
              setLong={setLong}
              setMidday={setMidday}
              setMonth={setMonth}
              setTzone={setTzone}
              lat={lat}
              lon={long}
              month={month}
            />
          </>
          :
          <>
            <Image
              src={`/images/${risingSign.houses[0].sign}.png`}
              alt={`${risingSign.houses[0].sign} Rising`}
              width={64}
              height={65}
            />

            <RisingSign
              ascendantSign={risingSign.houses[0].sign}
              ascendantSummary={risingSign.rising_sign}
              ascendantRuler={risingSign.ascendant_ruler}
            />
          </>
        }
      </main>

    </div>
  )
}