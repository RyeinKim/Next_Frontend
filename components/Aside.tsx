import Link from 'next/link';

const Aside = () => {
    const performLogout = () => {
        // 로그아웃 로직 구현
    };

    const handleMyPageClick = () => {
        // 마이페이지 이동 로직 구현
    };

    // 사용자 정보를 가져오는 로직이 필요하다면 여기에 추가

    return (
        <div className="aside-container">
            <aside id="aside_top">
                <ul>
                    <li><img id="profile" src="/assets/img.png" alt="profile" width="100" style={{ marginRight: "10px" }} /></li>
                    <li><p id="name">이 름</p></li>
                    <li><p id="stnum">학번</p></li>
                    <li><button type="button" id="mypage" onClick={handleMyPageClick}>내정보</button></li>
                    <li><button type="button" onClick={performLogout}>로그아웃</button></li>
                </ul>
            </aside>
            <aside>
                <ul>
                    <li><Link href="/board/myBoard.html?tableName=all"><a>내가쓴 글</a></Link></li>
                    <li><Link href="/board/myReply.html"><a>댓글단 글</a></Link></li>
                    <li><Link href="/temporary.html"><a>내 스크랩</a></Link></li>
                </ul>
            </aside>
        </div>
    );
};

export default Aside;