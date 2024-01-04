import Head from "next/head";
import styles from '@/styles/index.module.css'
import React, { useEffect, useState } from 'react';
import Cookie from "js-cookie";
import {GetServerSideProps} from "next";
import {withAuth} from "@/utils/withAuth";
import Link from "next/link";

type DeletedUsers = {
    id: number;
    username: string;
    stNum: number;
    email: string;
    phoneNumber: string;
    createdAt: string;
    deletedAt: string;
};

export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    return { props: {} };
});

const AdminPage = () => {
    // 로그인 상태를 저장할 상태 변수
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [stNum, setStNum] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const usersPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [users, setUsers] = useState<DeletedUsers[]>([]);

    const [newUsername, setNewUsername] = useState('');
    const [newStNum, setNewStNum] = useState('');
    const [newPNum, setNewPNum] = useState('');

    const [tableName, setTableName] = useState('default');
    const [targetUserId, setTargetUserId] = useState('');
    const [targetPostId, setTargetPostId] = useState('');
    const [targetReplyId, setTargetReplyId] = useState('');

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

        const fetchUserCount = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const res = await fetch(`${apiUrl}/admin/delUsers`); // 적절한 API 엔드포인트로 변경하세요
                const data = await res.json();
                setTotalCount(data.totalUsers); // totalPosts 값을 사용하여 상태 업데이트
                const totalUserNumbers = Math.ceil(data.totalUsers / usersPerPage);
                setPageNumbers(Array.from({ length: totalUserNumbers }, (_, i) => i + 1));
            } catch (error) {
                console.error("Failed to fetch user count", error);
                // 오류 처리 로직 추가
            }
        };
        fetchUserCount();
    }, [apiUrl]);

    useEffect(() => {
        fetchUsers(currentPage); // 페이지가 변경될 때마다 게시글을 다시 로드
    }, [currentPage]);

    const fetchUsers = async (pageNumber: number) => {
        const offset = (pageNumber - 1) * usersPerPage;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${apiUrl}/admin/delUsers?offset=${offset}&limit=${usersPerPage}`);
            const data = await res.json();
            setUsers(data.message); // 데이터 구조에 따라 조정
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = Cookie.get('accessToken');
            const response = await fetch(`${apiUrl}/admin/createUser`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: newUsername,
                    stNum: newStNum,
                    phoneNumber: newPNum,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                alert('회원 생성 완료');
                window.location.href='/adminPage';
            } else {
                console.error(`Failed: `, data.message);
                alert('회원 생성 실패');
            }
        } catch (error) {
            console.error('Fetch 에러: ', error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            const token = Cookie.get('accessToken');
            const response = await fetch(`${apiUrl}/admin/deleteUser/${targetUserId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                alert('회원 삭제 완료');
                window.location.href='/adminPage';
            } else {
                console.error(`Failed: `, data.message);
                alert('회원 삭제 실패');
            }
        } catch (error) {
            console.error('Fetch 에러: ', error);
        }
    }

    const handleRecoverUser = async () => {
        try {
            const token = Cookie.get('accessToken');
            const response = await fetch(`${apiUrl}/admin/users/recover/${targetUserId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                alert('삭제된 회원 복구 완료');
                window.location.href='/adminPage';
            } else {
                console.error(`Failed: `, data.message);
                alert('삭제된 회원 복구 실패');
            }
        } catch (error) {
            console.error('Fetch 에러: ', error);
        }
    }

    const handleRecoverPost = async () => {
        try {
            if (tableName === 'default' || !targetPostId) {
                alert('게시판과 게시물 ID를 선택해주세요.');
                return;
            }

            const token = Cookie.get('accessToken');
            const response = await fetch(`${apiUrl}/admin/posts/recover/${tableName}/${targetPostId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                alert('삭제된 게시글 복구 완료');
                window.location.href='/adminPage';
            } else {
                console.error(`Failed: `, data.message);
                alert('삭제된 게시글 복구 실패');
            }
        } catch (error) {
            console.error('Fetch 에러: ', error);
        }
    }

    const handleRecoverReply = async () => {
        try {
            if (tableName === 'default' || !targetReplyId) {
                alert('게시판과 댓글 ID를 선택해주세요.');
                return;
            }

            const token = Cookie.get('accessToken');
            const response = await fetch(`${apiUrl}/admin/reply/recover/${tableName}/${targetReplyId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                alert('삭제된 댓글 복구 완료');
                window.location.href='/adminPage';
            } else {
                console.error(`Failed: `, data.message);
                alert('삭제된 댓글 복구 실패');
            }
        } catch (error) {
            console.error('Fetch 에러: ', error);
        }
    }

    return (
        <>
            <Head>
                <title>CSE 공식 커뮤니티 - 관리자페이지</title>
            </Head>

            <div id={styles.wrapper}>
                <div className={styles.flexContainer}>
                    <section>
                        <article>
                            <h1>학생 정보 생성</h1>
                            <form onSubmit={handleCreateUser}>
                                <p>이름: <input
                                    type="text"
                                    id="inputUserName"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                /></p>
                                <p>학번: <input
                                    type="text"
                                    id="inputUserStnum"
                                    value={newStNum}
                                    onChange={(e) => setNewStNum(e.target.value)}
                                /></p>
                                <p>전화번호: <input
                                    type="text"
                                id="inputUserPnum"
                                value={newPNum}
                                onChange={(e) => setNewPNum(e.target.value)}
                                /></p>
                            <button type="submit">생성</button>
                            </form>
                        </article>
                        <article id="userlist">
                            <h1>삭제된 계정</h1>
                            <div id="users-container"></div>
                                {users.map(user => (
                                    <div key={user.id} className={styles.post}>
                                        <span className={styles.delUserList}>id: {user.id} | </span>
                                        <span className={styles.delUserList}>이름: {user.username} | </span>
                                        <span className={styles.delUserList}>이메일: {user.email} | </span>
                                        <span className={styles.delUserList}>삭제일자: {user.deletedAt}</span>
                                    </div>
                                ))}
                            <div id="pagination">
                                {pageNumbers.map(number => (
                                    <span className={styles.pagiSpan} key={number}>{number}</span> // 페이지 번호를 렌더링합니다.
                                ))}
                            </div>
                        </article>
                        <article>
                            <h1>유저ID로 계정 삭제 또는 복구</h1>
                            <p>유저ID: <input
                                type="text"
                                id="inputUserId"
                                onChange={(e) => setTargetUserId(e.target.value)}
                            /></p>
                            <button onClick={handleDeleteUser}>삭제</button>
                            <button onClick={handleRecoverUser}>복구</button>
                        </article>
                        <article>
                            <h1>게시글ID로 게시글 복구</h1>
                            <p>
                                게시판 선택:
                                <select
                                    id="PostBoard"
                                    value={tableName}
                                    onChange={(e) => setTableName(e.target.value)}
                                >
                                    <option value="default">게시판 선택</option>
                                    <option value="notice">공지사항</option>
                                    <option value="free">자유게시판</option>
                                    <option value="qna">질문답변</option>
                                </select>
                            </p>
                            <p>게시글ID: <input
                                type="text"
                                id="inputPostId"
                                value={targetPostId}
                                onChange={(e) => setTargetPostId(e.target.value)}
                            /></p>
                            <button onClick={handleRecoverPost}>복구</button>
                        </article>
                        <article>
                            <h1>댓글ID로 댓글 복구</h1>
                            <p>
                                게시판 선택:
                                <select
                                    id="ReplyBoard"
                                    value={tableName}
                                    onChange={(e) => setTableName(e.target.value)}
                                >
                                    <option value="default">게시판 선택</option>
                                    <option value="notice">공지사항</option>
                                    <option value="free">자유게시판</option>
                                    <option value="qna">질문답변</option>
                                </select>
                            </p>
                            <p>댓글ID: <input
                                type="text"
                                id="inputReplyId"
                                value={targetReplyId}
                                onChange={(e) => setTargetReplyId(e.target.value)}
                            /></p>
                            <button onClick={handleRecoverReply}>복구</button>
                        </article>
                    </section>
                </div>
            </div>
        </>
    )
}

export default AdminPage;