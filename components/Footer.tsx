import Link from "next/link";

const Footer = () => {
    return (
        <footer>
            <div className="footerContent">
                <ul className="no_dot">
                    <li>
                        <Link href="/" passHref>
                            <span>이용약관</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" passHref>
                            <span style={{ fontWeight: 'bold' }}>개인정보처리방침</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" passHref>
                            <span>커뮤니티이용규칙</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" passHref>
                            <span>공지사항</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <p>Copyright © 2023 Ryein Kim. All rights reserved.</p>
            <address>Contact the webmaster for more information. 010-6797-6896</address>
        </footer>
    );
};

export default Footer;