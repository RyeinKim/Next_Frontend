import Head from "next/head";
import styles from '@/styles/index.module.css'
import React from 'react';

const MyPage = () => {
    return (
        <>
            <Head>
                <title>CSE 공식 커뮤니티 - 내 정보</title>
            </Head>

            <div id={styles.wrapper}>
                <div className={styles.flexContainer}>
                    <section>
                        <article>
                            <div className="myPage">
                                <p>이름: <span id="username">username</span><br/></p>
                                    <p>학번: <span id="stNum">stNum</span><br/></p>
                                    <p>이메일: <span id="email">email</span><br/></p>
                                    <p>휴대폰번호: <span id="phoneNumber">phoneNumber</span><br/></p>

                                    <button id="changePasswordBtn">비밀번호 변경</button>
                                <button id="deleteAccountBtn">회원 탈퇴</button>
                            </div>
                        </article>
                    </section>
                </div>
            </div>
        </>
    )
}

export default MyPage;