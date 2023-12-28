import Head from 'next/head'
import styles from '@/styles/Signin.module.css'
import Link from "next/link";

import Auth from "../api/auth";

const handleLogin = async () => {
    const userEmail = document.getElementById('userEmail') as HTMLInputElement | null;
    const userPw = document.getElementById('userPw') as HTMLInputElement | null;

    if (userEmail && userPw) {
        try {
            const data = await Auth.login(userEmail.value, userPw.value);
            console.log('로그인 성공:', data);
            // 로그인 처리 로직
        } catch (error) {
            console.error('로그인 에러: ', error);
        }
    } else {
        // Handle the case where one or both elements don't exist
        console.error('Form elements not found!');
    }
}

const SigninPage = () => {
    return (
        <>
            <Head>
                <title>CSE 공식 커뮤니티 - 로그인</title>
            </Head>

            <div className={styles.wrapper}>
                <div className={styles.signin}>
                    <h2>Sign in</h2>
                    <div className={styles.input}>
                        <p className={styles.info}>이메일</p>
                        <input type="text" id="userEmail"/>
                        <p className={styles.info}>패스워드</p>
                        <input type="password" id="userPw"/><br/>
                    </div>
                    <input type="button" id="login_btn" onClick={handleLogin} value="로그인"/>
                    <p className={styles.forgot}>
                        <Link href="/find_email"><span className={styles.findlink}>Forgot Email?</span></Link>
                    </p>
                    <p className={styles.forgot}>
                        <Link href="/change_pass"><span className={styles.findlink}>Forgot Password?</span></Link>
                    </p>
                </div>
                <div className={styles.signup}>
                    <h2>Sign Up</h2>
                    <div>
                        <p className={styles.regi}>우리 학과에서의 새로운 경험</p>
                        <p className={styles.regi}>지금 바로 시작하기</p>
                    </div>
                    <button id="register_btn" onClick={() => window.location.href = '/users/register'}>가입하기</button>
                </div>

                <footer className={styles.Signinfooter}>
                    <div className={styles.footerContent}>
                        <ul className={styles.noDot}>
                            <li className={styles.footerLi}>
                                <Link href="#"><span className={styles.footerSpan}>이용약관</span></Link>
                            </li>
                            <li className={styles.footerLi}>
                                <Link href="#"><span className={styles.footerSpan}
                                                     style={{fontWeight: 'bold'}}>개인정보처리방침</span></Link>
                            </li>
                            <li className={styles.footerLi}>
                                <Link href="#"><span className={styles.footerSpan}>커뮤니티이용규칙</span></Link>
                            </li>
                            <li className={styles.footerLi}>
                                <Link href="#"><span className={styles.footerSpan}>공지사항</span></Link>
                            </li>
                        </ul>
                    </div>
                    <p className={styles.footerSen}>Copyright © 2023 Ryein Kim. All rights reserved.</p>
                    <address className={styles.footerSen}>Contact webmaster for more information. 010-6797-6896
                    </address>
                </footer>
            </div>
        </>
    );
}

SigninPage.noLayout = true;

export default SigninPage;