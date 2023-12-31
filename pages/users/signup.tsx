import Head from 'next/head'
import styles from '@/styles/Signup.module.css';
import Link from "next/link";

import Users from '../api/users';

const handleRegister = (event: any) => {
    event.preventDefault(); // 기본 제출 이벤트 중지

    const userEmail = document.getElementById('userEmail') as HTMLInputElement | null;
    const userPw = document.getElementById('userPw') as HTMLInputElement | null;
    const userName = document.getElementById('userName') as HTMLInputElement | null;
    const stNum = document.getElementById('stNum') as HTMLInputElement | null;
    const userPhoneNum = document.getElementById('userPhoneNum') as HTMLInputElement | null;

    if (userEmail && userPw && userName && stNum && userPhoneNum) {
        try {
            const data = Users.register(userEmail.value, userPw.value, userName.value, stNum.value, userPhoneNum.value);
            console.log('회원가입 성공:', data);
            // 회원가입 처리 로직
        } catch (error) {
            console.error('회원가입 에러: ', error);
        }
    }
}

const SignUpPage = () => {
    return (
        <>
            <Head>
                <title>CSE 공식 커뮤니티 - 회원가입</title>
            </Head>

            <div className={styles.wrapper}>
                <div className={styles.signup}>
                    <h2 className={styles.signUpH2}>Sign Up</h2>
                    <form onSubmit={handleRegister}>
                        <div className={styles.inout}>
                            <p className={styles.info}>이메일</p>
                            <input type="email" id="userEmail" placeholder="email@address.com" size={20} required/>
                            <p className={styles.info}>패스워드</p>
                            <input
                                type="password"
                                id="userPw"
                                placeholder="8자 이상, 대 소문자 포함"
                                size={20}
                                required
                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                                title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                            />
                            <p className={styles.info}>이름</p>
                            <input type="text" id="userName" size={20} required/>
                            <p className={styles.info}>학번</p>
                            <input type="text" id="stNum" size={8} required/>
                            <p className={styles.info}>핸드폰 번호</p>
                            <input
                                type="text"
                                id="userPhoneNum"
                                placeholder="010-0000-0000"
                                size={20}
                                required
                                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                            />
                            <p id="check_agree">
                                <input type="checkbox" id="termsOfService" value="termsOfService" required/>
                                이용약관 동의
                            </p>
                        </div>
                        <input type="submit" id="register_btn" onClick={handleRegister} value="가입하기"/>
                    </form>
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

SignUpPage.noLayout = true;

export default SignUpPage;