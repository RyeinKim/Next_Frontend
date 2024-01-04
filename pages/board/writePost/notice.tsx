import Head from 'next/head';
import styles from '@/styles/index.module.css';
import Cookie from 'js-cookie';
import React, {useEffect, useState} from "react";
import { withAuth } from '@/utils/withAuth';
import { GetServerSideProps } from 'next';


export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    // 여기에는 페이지에 필요한 서버 사이드 로직을 추가합니다.
    // 예를 들어, 사용자 권한을 체크하거나 특정 데이터를 미리 불러올 수 있습니다.
    return { props: {} }; // 필요한 props를 전달합니다.
});

export default function WriteNotice() {
    // 로그인 상태를 저장할 상태 변수
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

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
                    setUserId(data.id);
                    setUsername(data.username); // 응답에서 username 추출하여 상태 업데이트
                })
                .catch(error => {
                    console.error('Fetch 에러: ', error);
                });
        }
    }, []);

    const handleWritePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = Cookie.get('accessToken');
            // 백엔드로 데이터 전송
            const response = await fetch(`${apiUrl}/posts/write/notice`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    authorId: userId,
                    author: username,
                    title: newTitle,
                    content: newContent,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                alert('게시글이 작성되었습니다.');
                window.location.href = '/board/notice';
            } else {
                console.error('Failed: ', data.message);
            }
        } catch (error) {
            console.error('에러: ', error);
        }
    }
    return (
        <>
            <Head>
                <title>CSE 공식 커뮤니티 - 게시글 작성</title>
            </Head>

            <div id={styles.wrapper}>
                <div className={styles.flexContainer}>
                    <div id={styles.sectionDiv}>
                        <section>
                            <h2>게시글 작성</h2>
                            <form onSubmit={handleWritePost}>
                                <div>
                                    제목
                                    <input
                                        id="title"
                                        type="text"
                                        placeholder="게시글 제목"
                                        value={newTitle}
                                        style={{width: "150px"}}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    내용
                                    <textarea
                                        id="content"
                                        placeholder="게시글 내용"
                                        value={newContent}
                                        style={{width: "150px", height: "200px"}}
                                        onChange={(e) => setNewContent(e.target.value)}
                                    />
                                </div>
                                <button type="submit">작성하기</button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
