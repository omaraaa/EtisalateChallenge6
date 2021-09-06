import Head from 'next/head'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'

export default function Dashboard(props) {
    return (
        <>
            <Head>
                <title>CoDE Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <div className="w-full max-w-8xl mx-auto">
                <div className="lg:flex">
                    <Sidebar></Sidebar>
                    <div className="min-w-0 w-full flex-auto">

                        <main className="mx-4 flex flex-col lg:items-center justify-center">
                            {props.children}
                        </main>

                        <footer className="flex items-center justify-center w-full h-24 border-t mt-8">
                            hello
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}