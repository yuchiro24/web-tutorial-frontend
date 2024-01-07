'use client';

import React, { useState, useEffect } from "react";
import booksData from "./mock/dummy_books.json";
import Link from "next/link";

type Book = {
    id: number
    title: string
    author: string
    description: string
};

// 本一覧画面
export default function Page() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        return setBooks(booksData);
    }, []);

    // 新規登録処理
    const [showNewBookForm, setShowNewBookForm] = useState(false);
    const handleNewBookForm = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setShowNewBookForm(true);
    }
    const handleCanselNewBookForm = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setShowNewBookForm(false);
    }
    const handleCreateNewBook = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        // TODO: 本の新規登録処理
        setShowNewBookForm(false);
    }

    return(
        <>
            <h2>本一覧</h2>
            <button onClick={ handleNewBookForm }>本を追加する</button>
            {showNewBookForm ? (
                <form>
                    <div>
                        <label>タイトル</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>著者</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>説明</label>
                        <textarea></textarea>
                    </div>
                    <div>
                        <button onClick={ handleCreateNewBook }>登録</button>
                        <button onClick={ handleCanselNewBookForm }>キャンセル</button>
                    </div>
                </form>
            ): null}

            <table>
                <thead>
                    <tr>
                        <th>タイトル</th>
                        <th>著者</th>
                        <th>説明</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td><Link href={`/books/${book.id}`}>{book.title}</Link></td>
                            <td>{book.author}</td>
                            <td>{book.description}</td>
                            <td>
                                <button>編集・削除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}