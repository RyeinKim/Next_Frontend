import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/index.module.css';

const Header = () => {

    return (
        <header>
            <div className={styles.inner}>
                <Link href="/index" passHref>
                    <span style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <Image src="/assets/img.png" alt="Logo" width={60} height={60} />
                        <h3 style={{ margin: '0' }}>Computer<br />Software<br />Engineering</h3>
                    </span>
                </Link>
                <ul className={styles.no_dot}>
                    <li>
                        <Link href="/" passHref>
                            <span>Sign in</span>
                        </Link>
                    </li>
                    <li id={styles.signup}>
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
