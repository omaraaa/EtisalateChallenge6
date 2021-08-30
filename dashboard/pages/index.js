import Head from 'next/head'
import TestChart from '../components/TestChart'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        <Head>
          <title>CoDE Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className="text-6xl font-bold m-4">
            Example
          </h1>

          <TestChart width={400} height={400}></TestChart>


          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <a
              className={styles.card}
            >
              <h3 className="text-2xl font-bold">Card link example &rarr;</h3>
              <p className="mt-4 text-xl">
                description
              </p>
            </a>

          </div>
        </main>

        <footer className="flex items-center justify-center w-full h-24 border-t">
          hello
        </footer>
      </div>
    </>
  )
}
