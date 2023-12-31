import Link from 'next/link';

const NavBar = () => {
    return (
        <nav>
            <div className="dropmenu">
                <ul className="no_dot">
                    <li>
                        <Link href="/"><span>Home</span></Link>
                    </li>
                    <li>
                        <a href="#">Board</a>
                        <ul>
                            <li><Link href="/board/notice"><span>공지사항</span></Link></li>
                            <li><Link href="/board/free"><span>자유게시판</span></Link></li>
                            <li><Link href="/"><span>질문답변</span></Link></li>
                        </ul>
                    </li>
                    {/* Contact Us 메뉴 */}
                    <li style={{ borderRight: 'none' }}>
                        <a href="#">Contact Us</a>
                        <ul>
                            <li><Link href="/"><span>고객센터</span></Link></li>
                            <li><Link href="/"><span>1:1 Q&A</span></Link></li>
                            <li><Link href="/"><span>메일보내기</span></Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;