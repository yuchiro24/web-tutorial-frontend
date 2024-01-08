'use client';

import { useState, useEffect } from "react";
import booksData from "../mock/dummy_books.json";
import bookDetailsData from "../mock/dummy_book_details.json";

type Book = {
    id: number
    title: string
    author: string
    description: string
};

type BookDetail = {
    id: number
    title: string
    author: string
    createdAt: string
    updatedAt: string
    genre: string | null
    quotedCount: number
}


// 本詳細画面
export default function Page({ params }: { params: { id: number } }) {
    const [book, setBook] = useState<Book | null>(null);
    const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
    const id = Number(params.id);

    useEffect(() => {
        const selectedBook: Book | null = booksData.find((book) => book.id === id) ?? null;
        const selectedBookDetail = bookDetailsData.find((bookDetail) => bookDetail.id === id) ?? null;
        return () => {
            setBook(selectedBook);
            setBookDetail(selectedBookDetail);
        }
    }, []);

    return (
        <>
            <h2>本詳細</h2>
            <label>タイトル: </label>
            <span>{book?.title}</span>
            <table>
                <thead>
                    <tr>
                        <th>タイトル</th>
                        <th>著者</th>
                        <th>ジャンル</th>
                        <th>引用数</th>
                        <th>登録日</th>
                        <th>最終更新日</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{bookDetail?.title}</td>
                        <td>{bookDetail?.author}</td>
                        <td>{bookDetail?.genre}</td>
                        <td>{bookDetail?.quotedCount}</td>
                        <td>{bookDetail?.createdAt}</td>
                        <td>{bookDetail?.updatedAt}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}