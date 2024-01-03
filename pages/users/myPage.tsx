import Head from "next/head";
import styles from '@/styles/index.module.css'
import React, { useEffect, useState } from 'react';
import Cookie from "js-cookie";
import {GetServerSideProps} from "next";
import {withAuth} from "@/utils/withAuth";

export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    return { props: {} };
});

const MyPage = () => {
    // 로그인 상태를 저장할 상태 변수
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [stNum, setStNum] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        // 로그인 상태를 확인
        const token = Cookie.get('accessToken');
        if (token) {
            setIsLogin(true);
            // 토큰이 있으면 백엔드에 사용자 정보 요청
            fetch(`${apiUrl}/auth/check`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                setUsername(data.username); // 응답에서 username 추출하여 상태 업데이트
                setStNum(data.stNum); // 응답에서 stNum 추출하여 상태 업데이트
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
            })
            .catch(error => {
                console.error('Fetch 에러: ', error);
            });
        }
    }, [apiUrl]);

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
                                <p>이름: <span id="username">{username || '로그인 필요'}</span><br/></p>
                                <p>학번: <span id="stNum">{stNum || '로그인 필요'}</span><br/></p>
                                <p>이메일: <span id="email">{email || '로그인 필요'}</span><br/></p>
                                <p>휴대폰번호: <span id="phoneNumber">{phoneNumber || '로그인 필요'}</span><br/></p>

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