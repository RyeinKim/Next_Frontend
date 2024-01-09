import Head from 'next/head'
import styles from '@/styles/index.module.css'
import {useEffect, useState} from "react";
import Link from "next/link";
import { withAuth } from '@/utils/withAuth';
import { GetServerSideProps } from 'next';
import Cookie from "js-cookie";

type Post = {
    postId: number;
    title: string;
    content: string;
    author: string;
};

export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    // 여기에는 페이지에 필요한 서버 사이드 로직을 추가합니다.
    // 예를 들어, 사용자 권한을 체크하거나 특정 데이터를 미리 불러올 수 있습니다.
    return { props: {} }; // 필요한 props를 전달합니다.
});

export default function MyWrite() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookie.get('accessToken');

    const [userId, setUserId] = useState();

    const postsPerPage = 5; // 페이지당 게시글 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [totalCount, setTotalCount] = useState(0); // 게시글 총 수를 저장할 상태
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [posts, setPosts] = useState<Post[]>([]); // Post 타입의 배열로 상태 정의

    useEffect(() => {
        // 로그인 여부 확인
        if (token) {
            fetch(`${apiUrl}/auth/check`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    setUserId(data.userId);
                    console.log(data.userId);
                })
                .catch(error => {
                    console.error('Fetch 에러: ', error);
                });
        }
    }, []);

    useEffect(() => {
        if (!userId) return;

        // 게시글 총 수를 가져오는 함수
        const fetchPostCount = async () => {
            try {
                const res = await fetch(`${apiUrl}/posts/byUserId/all/${userId}?offset=0&limit=5`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }); // 적절한 API 엔드포인트로 변경하세요
                const data = await res.json();
                setTotalCount(data.totalPosts); // totalPost 값을 사용하여 상태 업데이트
                const totalPageNumbers = Math.ceil(data.totalPosts / postsPerPage);
                setPageNumbers(Array.from({ length: totalPageNumbers }, (_, i) => i + 1));
            } catch (error) {
                console.error("Fetch 에러: ", error);
                // 오류 처리 로직 추가
            }
        };

        fetchPostCount();
    }, [userId]);

    useEffect(() => {
        fetchPosts(currentPage); // 페이지가 변경될 때마다 게시글을 다시 로드
    }, [currentPage, userId]);

    const fetchPosts = async (pageNumber: number) => {
        const offset = (pageNumber - 1) * postsPerPage;
        try {
            const res = await fetch(`${apiUrl}/posts/byUserId/all/${userId}?offset=${offset}&limit=${postsPerPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setPosts(data.message);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        // 페이지 번호에 따른 동작 수행, 예: API 호출하여 해당 페이지의 게시물 로드
        setCurrentPage(pageNumber); // 클릭된 페이지로 현재 페이지 상태 업데이트
        console.log(`Page ${pageNumber} clicked`); // 실제 구현에 맞게 수정
    };

    return (
        <>
            <Head>
                <title>CSE 공식 커뮤니티 - 내가쓴 글</title>
            </Head>

            <div id={styles.wrapper}>
                <div className={styles.flexContainer}>
                    <div id={styles.sectionDiv}>
                        <section>
                            <h2>내가쓴 글</h2>
                            <div id="board-list">
                                {posts.map(post => (
                                    <div key={post.postId} className={styles.post}>
                                        <Link href={`/board/viewPost/notice/${post.postId}`}>
                                            <span className={styles.postHead}>{post.title}</span>
                                            <span className={styles.postBody}>{post.author}</span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div id="pagination">
                            {pageNumbers.map(number => (
                                    <span className={styles.pagiSpan} key={number} onClick={() => handlePageClick(number)}>{number}</span> // 페이지 번호를 렌더링합니다.
                                ))}
                            </div>
                            <div id="searchDiv">
                                <input type="text" id="searchInput" placeholder="게시글 검색" />
                                <button>검색</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
