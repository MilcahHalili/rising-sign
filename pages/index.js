import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Form from '../components/Form'
import RisingSign from '../components/RisingSign'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [midday, setMidday] = useState('')
  const [risingSign, setRisingSign] = useState()
  const [tzone, setTzone] = useState('')
  const router = useRouter()

  useEffect(async () => {
    if (risingSign === undefined) {
      return
    }
    setRisingSign(risingSign)
  })

  const postApi = async (data) => {
    console.log(data, ' data in postApi')
    const res = await fetch('http://localhost:3000/api/ascendant', {
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
    console.log(result, ' result in postApi')
    setRisingSign(result)
  }

  const handleBirthData = async event => {
    event.preventDefault()
    
    const context = {
      day: parseInt(event.target.day.value),
      month: parseInt(event.target.month.value),
      year: parseInt(event.target.year.value),
      hour: (midday === 'PM' ? (parseInt(event.target.hour.value) + 12) : parseInt(event.target.hour.value)),
      min: parseInt(event.target.min.value),
      lat: lat,
      lon: long,
      tzone: tzone
    }
    console.log(context, ' context in handleBirthData')
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
        <Image
          id="chani"
          src="/images/Chani-Nicholas-Logo.png"
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
              setMidday={setMidday}
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