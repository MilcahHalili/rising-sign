import Head from 'next/head'
import useSWR from 'swr'
import RisingSign from '../components/RisingSign'
import styles from '../styles/Home.module.css'

const fetcher = url => fetch(url).then(res => res.json())

export default function Home() {
  const { data, error } = useSWR('/api/birthData', fetcher)

  if (error) return <div>Failed to load rising sign</div>
  if (!data) return <div>Loading . . .</div>

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
        {data.map((d, i) => (
          <RisingSign key={i} data={d} />
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
