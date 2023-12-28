import Link from 'next/link';
import Image from 'next/image';
import Cookie from 'js-cookie';
import {useEffect, useState} from "react";

const Header = () => {
    // 로그인 상태를 저장할 상태 변수
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        // 로그인 상태를 확인
        const token = Cookie.get('accessToken');
        if (token) {
            setIsLogin(true);
        }
    }, []);

    return (
        <header>
            <div className="inner">
                <Link href="/" passHref>
                    <span style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <Image src="/assets/img.png" alt="Logo" width={60} height={60} />
                        <h3 style={{ margin: '0' }}>Computer<br />Software<br />Engineering</h3>
                    </span>
                </Link>
                {!isLogin && (
                    <ul className="no_dot">
                        <li>
                            <Link href="/users/signin" passHref>
                                <span>Sign in</span>
                            </Link>
                        </li>
                        <li className="signup">
                            <Link href="/users/signup" passHref>
                                <span>Sign Up</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default Header;
