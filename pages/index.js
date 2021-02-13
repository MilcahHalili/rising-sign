import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Form from '../components/Form'
import RisingSign from '../components/RisingSign'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [birthData, setBirthData] = useState()
  const [risingSign, setRisingSign] = useState()

  const postApi = async data => {
    await console.log(birthData, ' pre fetch')
    fetch('http://localhost:3000/api/ascendant', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(birthData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data, ' data')
      console.log(risingSign, ' risingSign')
      setRisingSign(data)
      console.log(risingSign, ' after set')
    })
    .catch(err => console.log(err))
  }

  const handleBirthData = async event => {
    event.preventDefault()
    
    const context = {
      day: parseInt(event.target.day.value),
      month: parseInt(event.target.month.value),
      year: parseInt(event.target.year.value),
      hour: parseInt(event.target.hour.value),
      min: parseInt(event.target.min.value),
      lat: parseFloat(event.target.lat.value),
      lon: parseFloat(event.target.lon.value),
      tzone: parseFloat(event.target.tzone.value)
    }

    console.log(context, ' context')
    setBirthData(context)
    postApi(birthData)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rising Sign Display Tool by Chani</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 77
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
        {(!risingSign) ? ''
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

      <Form
        handleBirthData={handleBirthData}
      />
    </div>
  )
}