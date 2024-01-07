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

type BookForm = {
    id: number | null
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

    const [bookForm, setBookForm] = useState<BookForm>({
        id: null,
        title: '',
        author: '',
        description: ''
    });
    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        const name = event.target.name;
        setBookForm({ ...bookForm, [name]: value });
    }

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

    // 編集・削除処理
    const [editingBookId, setEditingBookId] = useState<number | null>(null);
    const handleEditBookRow = (id: number) => {
        setShowNewBookForm(false);
        setEditingBookId(id);
        const selectedBook: Book = books.find(book => book.id === id) as Book;
        setBookForm({
            id: selectedBook.id,
            title: selectedBook.title,
            author: selectedBook.author,
            description: selectedBook.description
        });
    }
    const handleEditBook = (id: number) => {
        // TODO: 本の編集処理
        setEditingBookId(null);
    }
    const handleCanselEditBook = (id: number) => {
        setEditingBookId(null);
    }
    const handleDeleteBook = (id: number) => {
        // TODO: 本の削除処理
        setEditingBookId(null);
    }
    return (
        <>
            <h2>本一覧</h2>
            <button onClick={handleNewBookForm}>本を追加する</button>
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
                        <button onClick={handleCreateNewBook}>登録</button>
                        <button onClick={handleCanselNewBookForm}>キャンセル</button>
                    </div>
                </form>
            ) : null}

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
                        editingBookId === book.id ? (
                            <tr key={book.id}>
                                <td><input type="text" value={bookForm.title} name="title" defaultValue={book.title} onChange={handleInput} /></td>
                                <td><input type="text" value={bookForm.author} name="author" defaultValue={book.author} onChange={handleInput} /></td>
                                <td><textarea value={bookForm.description} name="description" defaultValue={book.description} onChange={handleInput}></textarea></td>
                                <td></td>
                                <td>
                                    <button onClick={() => handleCanselEditBook(book.id)}>キャンセル</button>
                                    <button onClick={() => handleEditBook(book.id)}>更新する</button>
                                    <button onClick={() => handleDeleteBook(book.id)}>削除する</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={book.id}>
                                <td><Link href={`/books/${book.id}`}>{book.title}</Link></td>
                                <td>{book.author}</td>
                                <td>{book.description}</td>
                                <td>
                                    <button onClick={() => handleEditBookRow(book.id)}>編集・削除</button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </>
    )
}