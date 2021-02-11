import { useEffect } from 'react'
import Form from '../components/Form'
import Head from 'next/head'
import Image from 'next/image'
import RisingSign from '../components/RisingSign'
import userId from './.env.local'
import apiKey from './.env.local'
import styles from '../styles/Home.module.css'

export default function Home(props) {

  useEffect(() => {
    if (!props.ascendant) return <div>Loading . . .</div>
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Rising Sign Display Tool by Chani</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <img
          src="https://chart.chaninicholas.com/static/media/Chani-Nicholas-Regular-Logo-1-Line-1600x182.236fd9a2.png"
          alt="Rising Sign Display Tool by Chani"
          style={{width: 800}}
        />
      </header>

      <main className={styles.main}>
        <RisingSign
          ascendant={props.ascendant}
        />
        <Image
          src="/capricorn.jpg"
          alt="Capricorn Rising"
          width="657.600"
          height="345.237"
        />
        <Form />
      </main>
    </div>
  )
}

export async function getStaticProps() {
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
  return {
    props: data
  }
}