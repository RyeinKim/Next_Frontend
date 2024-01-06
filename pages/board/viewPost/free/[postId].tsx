/**
 * 현재 webmaster일 경우 게시글 삭제 기능 하고 있었음
 * jwt-decode 문제가 계속 발생했는데 결국 해결할 수 있는 제일 쉬운 방법은
 * 백엔드에서 auth/check api 로 값 받아오면 됨.
 * 그렇게 해결하는 방안으로 다시 시작해볼 것.
 */
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/ViewPost.module.css';
import Cookie from "js-cookie";
import {useRouter} from "next/router";

type Reply = {
    replyId: number;
    username: string;
    reply: string;
    createdAt: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const PostId = () => {
    const router = useRouter();
    const { postId } = router.query;

    const [role, setRole] = useState('');

    const [isLogin, setIsLogin] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [writeDate, setWriteDate] = useState('');

    const [reply, setReply] = useState<Reply[]>([]); // Post 타입의 배열로 상태 정의
    const [replyContent, setReplyContent] = useState(''); // 댓글 내용 상태

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    const [isReplyEditing, setIsReplyEditing] = useState(false);
    const [newReply, setNewReply] = useState('');
    const [editingReplyId, setEditingReplyId] = useState<number | null>(null);

    /*useEffect(() => {
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
                    setRole(data.role);
                })
                .catch(error => {
                    console.error('Fetch 에러: ', error);
                });
        }
    }, []);*/

    useEffect(() => {
        // 상태 초기화
        setTitle('');
        setContent('');
        setAuthor('');
        setWriteDate('');

        // 로그인 상태를 확인
        const token = Cookie.get('accessToken');
        if (token) {
            setIsLogin(true);
            fetch(`${apiUrl}/posts/byPostId/free/${postId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    setTitle(data.message.title); // 응답에서 title 추출하여 상태 업데이트
                    setContent(data.message.content); // 응답에서 content 추출하여 상태 업데이트
                    setAuthor(data.message.author); // 응답에서 author 추출하여 상태 업데이트
                    setWriteDate(data.message.createAt); // 응답에서 writeDate 추출하여 상태 업데이트
                })
                .catch(error => {
                    console.error('Fetch 에러: ', error);
                });

            fetch(`${apiUrl}/auth/check`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    setRole(data.role);
                })
                .catch(error => {
                    console.error('Fetch 에러: ', error);
                });
        }
    }, [postId, apiUrl]);

    useEffect(() => {
        fetchReply(); // 페이지가 변경될 때마다 게시글을 다시 로드
    }, [postId, apiUrl]);

    const fetchReply = async () => {
        try {
            const res = await fetch(`${apiUrl}/reply/getPost/free/${postId}`);
            const data = await res.json();
            setReply(data.message); // 데이터 구조에 따라 조정
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReplyContent(e.target.value);
    }

    const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = Cookie.get('accessToken');
            // 백엔드로 데이터 전송
            const response = await fetch(`${apiUrl}/reply/write/free`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: postId,
                    reply: replyContent,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                alert('댓글이 작성되었습니다.');
                window.location.reload();
            } else {
                console.error('Failed: ', data.message);
            }
        } catch (error) {
            console.error('에러: ', error);
        }
    }

    const handleEdit = () => {
        setIsEditing(true);
        setNewTitle(title);
        setNewContent(content);
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = Cookie.get('accessToken');
            // 백엔드로 데이터 전송
            const response = await fetch(`${apiUrl}/posts/edit/free`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: postId,
                    title: newTitle,
                    content: newContent,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                alert('게시글이 수정되었습니다.');
                window.location.reload();
            } else {
                console.error('Failed: ', data.message);
            }
        } catch (error) {
            console.error('에러: ', error);
        }
    }

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleDelete = async () => {
        const check = confirm('정말로 삭제하시겠습니까?');
        if (check) {
            try {
                const token = Cookie.get('accessToken');
                // 백엔드로 데이터 전송
                const response = await fetch(`${apiUrl}/posts/delete/free/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    console.log(data.message);
                    alert('게시글이 삭제되었습니다.');
                    window.location.href = '/board/free';
                } else {
                    console.error('Failed: ', data.message);
                }
            } catch (error) {
                console.error('에러: ', error);
            }
        }
    }

    const handleForcedDelete = async () => {
        const check = confirm(`!!주의: 관리자 명령어 입니다!!\n정말로 강제삭제 하시겠습니까?`);
        if (check) {
            try {
                const token = Cookie.get('accessToken');
                // 백엔드로 데이터 전송
                const response = await fetch(`${apiUrl}/admin/posts/delete/free/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    console.log(data.message);
                    alert('게시글이 강제삭제 되었습니다.');
                    window.location.href = '/board/free';
                } else {
                    console.error('Failed: ', data.message);
                }
            } catch (error) {
                console.error('에러: ', error);
            }
        }
    }

    const handleReplyEdit = (replyId: number) => {
        setIsReplyEditing(true);
        setEditingReplyId(replyId);
        setNewReply(replyContent);
    };

    const handleReplyEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(editingReplyId === null) {
            console.error('Reply ID 없음.');
            return; // 또는 적절한 오류 처리
        }

        try {
            const token = Cookie.get('accessToken');
            // 백엔드로 데이터 전송
            const response = await fetch(`${apiUrl}/reply/edit/free/${editingReplyId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reply: newReply,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                alert('댓글이 수정되었습니다.');
                window.location.reload();
            } else {
                console.error('Failed: ', data.message);
            }
        } catch (error) {
            console.error('에러: ', error);
        }
    }

    const handleReplyCancel = () => {
        setIsReplyEditing(false);
    };

    const handleReplyDelete = async (replyId: number) => {
        const check = confirm('정말로 삭제하시겠습니까?');
        if (check) {
            try {
                const token = Cookie.get('accessToken');
                // 백엔드로 데이터 전송
                const response = await fetch(`${apiUrl}/reply/delete/free/${replyId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    console.log(data.message);
                    alert('댓글이 삭제되었습니다.');
                    window.location.href = `/board/viewPost/free/${postId}}`;
                } else {
                    console.error('Failed: ', data.message);
                }
            } catch (error) {
                console.error('에러: ', error);
            }
        }
    }

    const handleReplyForcedDelete = async (replyId: number) => {
        const check = confirm(`!!주의: 관리자 명령어 입니다!!\n정말로 삭제하시겠습니까?`);
        if (check) {
            try {
                const token = Cookie.get('accessToken');
                // 백엔드로 데이터 전송
                const response = await fetch(`${apiUrl}/admin/reply/delete/free/${replyId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    console.log(data.message);
                    alert('댓글이 삭제되었습니다.');
                    window.location.href = `/board/viewPost/free/${postId}}`;
                } else {
                    console.error('Failed: ', data.message);
                }
            } catch (error) {
                console.error('에러: ', error);
            }
        }
    }

    return (
        <div>
            <Head>
                <title>CSE 공식 커뮤니티 - 게시글 보기</title>
            </Head>
            <div id={styles.wrapper}>
                <div className={styles.flexContainer}>
                    <div id={styles.sectionDiv}>
                        <section>
                            <div className="settings">
                                {isEditing ? (
                                    <>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handleEdit}>게시글 수정</button>
                                        <button onClick={handleDelete}>게시글 삭제</button>
                                        {role === 'webmaster' && <button onClick={handleForcedDelete}>게시글 강제삭제</button>}
                                    </>
                                )}

                            </div>
                            <div>
                                {isEditing ? (
                                    <form onSubmit={handleEditSubmit}>
                                        <div>
                                            <label htmlFor="title">제목:</label>
                                            <input
                                                id="title"
                                                type="text"
                                                value={newTitle}
                                                onChange={(e) => setNewTitle(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="content">내용:</label>
                                            <textarea
                                                id="content"
                                                value={newContent}
                                                onChange={(e) => setNewContent(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit">완료</button>
                                        <button type="button" onClick={handleCancel}>취소</button>
                                    </form>
                                ) : (
                                    <>
                                        <div id="postTitleDiv">
                                            제목: <span id="postTitle">{title || `게시글 제목`}</span>
                                        </div>
                                        <div id="postContentDiv">
                                            내용: <span id="postContent">{content || `게시글 내용`}</span>
                                        </div>
                                    </>
                                )}
                                <p id="AuthorName">{author || `작성자`}</p>
                                <p id="WriteDate">{writeDate || `작성일자`}</p>
                            </div>
                            <div>
                                <h2>댓글</h2>
                                <div id="board-list"></div>
                                    {/*{reply.map(rep => (
                                        <div key={rep.replyId} className={styles.reply}>
                                            <span className={styles.replyHead}>작성자: {rep.username} | {rep.createdAt}</span>  제목
                                            <span className={styles.replyBody}>{rep.reply}</span>  작성자
                                            <a onClick={() => handleReplyEdit(rep.replyId)}>수정 | </a>
                                            <a onClick={() => handleReplyDelete(rep.replyId)}>삭제</a>
                                        </div>
                                    ))}*/}
                                    {reply.map(rep => (
                                        <div key={rep.replyId} className={styles.reply}>
                                            {editingReplyId === rep.replyId ? (
                                                // 수정 중인 댓글일 경우, 수정 폼 렌더링
                                                <form onSubmit={handleReplyEditSubmit}>
                                                    <textarea
                                                        value={newReply} // 수정을 위한 새 댓글 내용 상태
                                                        onChange={(e) => setNewReply(e.target.value)}
                                                    />
                                                    <button type="submit">완료</button>
                                                    <button type="button" onClick={handleReplyCancel}>취소</button>
                                                </form>
                                            ) : (
                                                // 일반 댓글 렌더링
                                                <>
                                                    <span className={styles.replyHead}>작성자: {rep.username} | {rep.createdAt}</span>
                                                    <span className={styles.replyBody}>{rep.reply}</span>
                                                    <a onClick={() => handleReplyEdit(rep.replyId)}>수정 | </a>
                                                    <a onClick={() => handleReplyDelete(rep.replyId)}>삭제</a>
                                                    {role === 'webmaster' &&
                                                        <a onClick={() => handleReplyForcedDelete(rep.replyId)}> | 강제삭제</a>
                                                    }
                                                </>
                                            )}
                                        </div>
                                    ))}
                                <div id="pagination"></div>
                            </div>
                            <form className="reply_form" onSubmit={handleReplySubmit}>
                                <textarea id="replyContent" placeholder="댓글을 입력하세요" onChange={handleReplyChange}/>
                                <button type="submit">작성</button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostId;
