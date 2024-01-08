// /books 以下で使用する共通レイアウト。Node.jsの決まりにより、ファイル名は layout.tsx とする。
export default function BooksLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="layout">
            <header className="header">ヘッダー</header>
            <div className="container">
                <aside className="navbar">サイドバー</aside>
                <main className="content">
                    <section>{children}</section>
                </main>
            </div>
            <footer className="footer">フッター</footer>
        </div>
    );
}