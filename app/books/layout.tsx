import styles from './styles.module.css';

// /books 以下で使用する共通レイアウト。Node.jsの決まりにより、ファイル名は layout.tsx とする。
export default function BooksLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>ヘッダー</header>
            <div className={styles.container}>
                <aside className={styles.navbar}>サイドバー</aside>
                <main className={styles.content}>
                    <section>{children}</section>
                </main>
            </div>
            <footer className={styles.footer}>フッター</footer>
        </div>
    );
}