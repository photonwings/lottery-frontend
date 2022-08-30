import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import LotteryEntrance from '../components/LotteryEntrance'
// import ManualHeader from '../components/ManualHeader'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lottery</title>
        <meta name="description" content="Decentralized Lottery" />
      </Head>
      <Header />
      <LotteryEntrance />
    </div>
  )
}
