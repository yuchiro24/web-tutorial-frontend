'use client';

import { useState, useEffect } from "react";
import booksData from "./mock/dummy_books.json";
import Link from "next/link";

type Book = {
    id: number
    title: string
    author: string
    description: string
};

// [Desc] 本一覧画面
export default function Page() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        return setBooks(booksData);
    }, []);

    return(
        <>
            <h2>本一覧</h2>
            <button>本を追加する</button>
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
                                <button>更新・削除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}