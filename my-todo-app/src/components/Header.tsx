import styles from '@/styles/Header.module.css';
import Link from 'next/link';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>My Todo App</h1>
                <Link href="/create" className={styles.btn__primary}>Создать задачу</Link>
            </div>
        </header>
    )
}

export default Header;