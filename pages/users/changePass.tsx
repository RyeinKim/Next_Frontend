import Head from 'next/head'
import styles from '@/styles/Signup.module.css';
import Link from "next/link";
import {useState} from "react";
import Cookie from "js-cookie";

const ChangePassPage = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [changePass, setChangePass] = useState(false);

    const handleChangePass = async (e: any) => {
        e.preventDefault(); // 폼 제출 방지

        const username = document.getElementById('writeUserName') as HTMLInputElement | null;
        const email = document.getElementById('writeEmail') as HTMLInputElement | null;
        const stNum = document.getElementById('writeStNum') as HTMLInputElement | null;
        const userPNum = document.getElementById('writeUserPhoneNum') as HTMLInputElement | null;
        const newPass = document.getElementById('writeNewPass') as HTMLInputElement | null;

        if (username && userPNum && email && stNum && newPass) {
            const usernameValue = username.value;
            const userEmailValue = email.value;
            const userStNumValue = stNum.value;
            const userPNumValue = userPNum.value;
            const userNewPassValue = newPass.value;

            try {
                const res = await fetch(`${apiUrl}/users/changePass`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: usernameValue,
                        email: userEmailValue,
                        stNum: userStNumValue,
                        phoneNumber: userPNumValue,
                        newPass: userNewPassValue,
                    }),
                });
                const data = await res.json();
                console.log('비밀번호 변경 성공:', data);
                alert(data.message);
                window.location.href = '/users/signin';
            } catch (error) {
                console.error('비밀번호 변경 에러: ', error);
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
                    <h2 className={styles.signUpH2}>Change Your Password</h2>
                    <p>
                            이름과 전화번호를<br/>
                            입력해주세요
                    </p>
                    <form onSubmit={handleChangePass}>
                        <div className="inout">
                            <p className="info">이름</p>
                            <input type="text" id="writeUserName" required/>
                            <p className="info">이메일</p>
                            <input type="email" id="writeEmail" required/>
                            <p className="info">학번</p>
                            <input type="text" id="writeStNum" required/>
                            <p className="info">핸드폰 번호</p>
                            <input type="text" id="writeUserPhoneNum" placeholder="010-0000-0000" required
                                   pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"/><br/>
                            <p className="info">새로운 비밀번호</p>
                            <input type="password" id="writeNewPass" required/>
                        </div>
                        <input type="submit" id="register_btn" value="이메일 찾기"/>
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

ChangePassPage.noLayout = true;

export default ChangePassPage;