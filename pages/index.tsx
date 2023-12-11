import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/index.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <>
          <Head>
              <title>CSE 공식 커뮤니티</title>
          </Head>

          <div id={styles.wrapper}>
              <div className={styles.flexContainer}>
                  <div id={styles.sectionDiv}>
                      <section className={styles.imageCenter}>
                          <Image
                              src="/assets/calendar.jpg"
                              alt="Calendar Image"
                              className="centered-image"
                              width={500}  // Replace with actual width
                              height={300} // Replace with actual height
                          />
                      </section>
                  </div>
              </div>
          </div>
      </>
  )
}
