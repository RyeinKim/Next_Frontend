import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/index.module.css'

export default function Notice() {
    return (
        <>
            <Head>
                <title>CSE 공식 커뮤니티</title>
            </Head>

            <div id={styles.wrapper}>
                <div className={styles.flexContainer}>
                    <div id={styles.sectionDiv}>
                        <section>
                            <h2>공지사항</h2>
                            <button>게시글 작성</button>
                            <div id="board-list"></div>
                            <div id="pagination"></div>
                            <div id="searchDiv">
                                <input type="text" id="searchInput" placeholder="게시글 검색" />
                                    <button>검색</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
