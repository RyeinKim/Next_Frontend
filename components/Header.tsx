import Link from 'next/link';
import Image from 'next/image';

const Header = () => {

    return (
        <header>
            <div className="inner">
                <Link href="/" passHref>
                    <span style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <Image src="/assets/img.png" alt="Logo" width={60} height={60} />
                        <h3 style={{ margin: '0' }}>Computer<br />Software<br />Engineering</h3>
                    </span>
                </Link>
                <ul className="no_dot">
                    <li>
                        <Link href="/users/signin" passHref>
                            <span>Sign in</span>
                        </Link>
                    </li>
                    <li className="signup">
                        <Link href="/" passHref>
                            <span>Sign Up</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
