import Link from 'next/link';

const Aside = () => {
    return (
        <div className="asideContainer">
            <aside className="asideTop">
                <ul>
                    <li>
                        <img className="profile" src="/assets/img.png" alt="profile" width="100"
                             style={{marginRight: "10px"}}/>
                        <p className="asideName">이 름</p>
                        <p className="asideStnum">학번</p>
                    </li>

                    <li>
                        <button type="button" id="mypage">내정보</button>
                        <button type="button">로그아웃</button>
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