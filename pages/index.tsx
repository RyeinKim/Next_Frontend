import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/index.module.css'
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (router.query.loginRequired) {
            alert('로그인이 필요합니다.');
            router.push('/');
        }
    }, [router]);

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
