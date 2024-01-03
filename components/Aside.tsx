import Link from 'next/link';
import Cookie from 'js-cookie';
import {useEffect, useState} from "react";

const Aside = () => {
    // 로그인 상태를 저장할 상태 변수
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [stNum, setStNum] = useState('');
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
                })
                .catch(error => {
                    console.error('Fetch 에러: ', error);
                });
        }
    }, []);

    const handleLogout = () => {
        // JWT 토큰을 쿠키에서 제거
        Cookie.remove('accessToken');

        // 사용자 로그인 상태 업데이트
        setIsLogin(false);

        window.location.href = '/';
    }

    return (
        <div className="asideContainer">
            <aside className="asideTop">
                <ul>
                    <li>
                        <img className="profile" src="/assets/img.png" alt="profile" width="100"
                             style={{marginRight: "10px"}}/>
                        <p className="asideName">{username || '이름'}</p> {/* 사용자 이름 표시 */}
                        <p className="asideStnum">{stNum || '학번'}</p> {/* 학번 표시 */}
                    </li>

                    <li>
                        {/*<button type="button" id="mypage">내정보</button>*/}
                        <Link href="/users/myPage"><button>내정보</button></Link>
                        <button type="button" onClick={handleLogout}>로그아웃</button>
                    </li>
                </ul>
            </aside>
            <aside>
                <ul>
                    <li><Link href="/"><span>내가쓴 글</span></Link></li>
                    <li><Link href="/"><span>댓글단 글</span></Link></li>
                    <li><Link href="/"><span>내 스크랩</span></Link></li>
                </ul>
            </aside>
        </div>
    );
};

export default Aside;