import Head from 'next/head'
import styles from '@/styles/Signup.module.css';
import Link from "next/link";

import Users from "../api/users";
import {useState} from "react";
import Cookie from "js-cookie";

/*const handleFindEmail = async () => {
    const username = document.getElementById('writeUserName') as HTMLInputElement | null;
    const userPNum = document.getElementById('writeUserPhoneNum') as HTMLInputElement | null;

    if (username && userPNum) {
        try {
            const data = await Users.findEmail(username.value, userPNum.value);
            console.log('이메일찾기 성공:', data);
        } catch (error) {
            console.error('이메일찾기 에러: ', error);
        }
    }
}*/

const FindEmailPage = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookie.get('accessToken');

    const [emailFound, setEmailFound] = useState(false);
    const [foundEmail, setFoundEmail] = useState('');

    const handleFindEmail = async (e: any) => {
        e.preventDefault(); // 폼 제출 방지

        const username = document.getElementById('writeUserName') as HTMLInputElement | null;
        const userPNum = document.getElementById('writeUserPhoneNum') as HTMLInputElement | null;

        if (username && userPNum) {
            const usernameValue = encodeURIComponent(username.value);
            const userPNumValue = encodeURIComponent(userPNum.value);

            try {
                const res = await fetch(`${apiUrl}/users/findEmail?username=${usernameValue}&userPNum=${userPNumValue}`, {
                    method: 'Get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                console.log(data);
                setFoundEmail(data.message.email); // 찾은 이메일 상태 업데이트
                setEmailFound(true); // 이메일 찾기 상태 업데이트
                console.log('이메일찾기 성공:', data);
            } catch (error) {
                console.error('이메일찾기 에러: ', error);
            }
        }
    }

    return (
        <>
            <Head>
                <title>CSE 공식 커뮤니티 - 회원가입</title>
            </Head>

            <div className={styles.wrapper}>
                <div className={styles.signup}>
                    <h2 className={styles.signUpH2}>Find Your Email</h2>
                    {emailFound ? (
                        <div>
                            <h2>Your Email:</h2>
                            <p>{foundEmail}</p>
                            <Link href={'/users/signin'}>
                                <input type="button" value="로그인 하러가기"/>
                            </Link>
                        </div>
                    ) : (
                        <><p>
                            이름과 전화번호를<br/>
                            입력해주세요
                        </p>
                            <form onSubmit={handleFindEmail}>
                                <div className="inout">
                                    <p className="info">이름</p>
                                    <input type="text" id="writeUserName" required/>
                                    <p className="info">핸드폰 번호</p>
                                    <input type="text" id="writeUserPhoneNum" placeholder="010-0000-0000" required
                                           pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"/><br/>
                                </div>
                                <input type="submit" id="register_btn" value="이메일 찾기"/>
                            </form>
                        </>
                )}
            </div>
        </div>
    <footer className={styles.SignupFooter}>
        <div className={styles.footerContent}>
            <ul className={styles.noDot}>
                <li className={styles.footerLi}>
                    <Link href="/">
                        <span className={styles.footerSpan}>이용약관</span>
                    </Link>
                </li>
                <li className={styles.footerLi}>
                    <Link href="/">
                                <span className={styles.footerSpan}>Privacy Policy</span>
                            </Link>
                        </li>
                        <li className={styles.footerLi}>
                            <Link href="/">
                                <span className={styles.footerSpan}>Community Usage Rules</span>
                            </Link>
                        </li>
                        <li className={styles.footerLi}>
                            <Link href="/">
                                <span className={styles.footerSpan}>공지사항</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <p className={styles.footerP}>Copyright © 2023 Ryein Kim. All rights reserved.</p>
                <address className={styles.footerP}>Contact webmaster for more information. 010-6797-6896</address>
            </footer>
        </>
    );
}

FindEmailPage.noLayout = true;

export default FindEmailPage;