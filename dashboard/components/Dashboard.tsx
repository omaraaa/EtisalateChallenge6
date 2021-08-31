import Head from 'next/head'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'

export default function Dashboard(props) {
    return (
        <>
            <Header></Header>
            <div className="w-full max-w-8xl mx-auto">
                <div className="lg:flex">
                    <Sidebar></Sidebar>
                    <div className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
                        <div className={styles.container}>
                            <Head>
                                <title>CoDE Dashboard</title>
                                <link rel="icon" href="/favicon.ico" />
                            </Head>

                            <main className={styles.main}>
                                {props.children}
                            </main>

                            <footer className="flex items-center justify-center w-full h-24 border-t">
                                hello
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}