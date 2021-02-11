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

      <main className={styles.main}>
        <h1 className={styles.title}>
          Rising Sign Display Tool by Chani
        </h1>
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
