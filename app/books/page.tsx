'use client';

import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import booksData from "./mock/dummy_books.json";
import Link from "next/link";

type Book = {
    id: number | null
    title: string
    author: string
    description: string
};

// 本一覧画面
export default function Page() {
    const [books, setBooks] = useState<Book[]>([]);
    const [editingBookId, setEditingBookId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [action, setAction] = useState<string>('');

    // フォームのバリデーション
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        return setBooks(booksData);
    }, []);

    // イベントハンドラ
    const onSubmit = (event: any): void => {
        const data: Book = {
            id: editingBookId,
            title: event.title,
            author: event.author,
            description: event.description
        };

        if (action === 'create') {
            handleCreate(data);
            console.log('create');
        } else if (action === 'update') {
            if (data.id === null) {
                return;
            }
            console.log('update');
            handleEdit(data);
        } else if (action === 'delete') {
            if (data.id === null) {
                return;
            }
            console.log('delete');
            handleDelete(data.id);
        }
    };

    // 新規登録処理
    const handleCreateNewBook = () => {
        setEditingBookId(null);
        console.log('create new book');
        setIsCreating(true);
        reset();
    }
    const handleCanselCreate = () => {
        setEditingBookId(null);
        setIsCreating(false);
        reset();
    }
    const handleCreate = (data: Book) => {
        // TODO: 本の新規登録処理
        setEditingBookId(null);
        setIsCreating(false);
        reset();
    }

    // 編集・削除処理
    const handleEditBookRow = (id: number | null) => {
        setIsCreating(false);
        const selectedBook: Book = books.find(book => book.id === id) as Book;
        setEditingBookId(selectedBook.id);
        reset(selectedBook);
    }
    const handleCanselEditBook = () => {
        setEditingBookId(null);
        reset(
            {
                id: null,
                title: '',
                author: '',
            }
        );
    }
    const handleEdit = (data: Book) => {
        // TODO: 本の編集処理
        setEditingBookId(null);
        reset(
            {
                id: null,
                title: '',
                author: '',
            }
        );
    }
    const handleDelete = (id: number) => {
        // TODO: 本の削除処理
        setEditingBookId(null);
        reset(
            {
                id: null,
                title: '',
                author: '',
            }
        );
    }
    return (
        <>
            <h2>本一覧</h2>
            <button type="button" onClick={() => handleCreateNewBook()}>本を追加する</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>タイトル</th>
                            <th>著者</th>
                            <th>説明</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(isCreating && editingBookId === null) ? (
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" id="title"
                                        {...register("title", {
                                            required: { value: true, message: 'タイトルは必須です' },
                                            maxLength: { value: 100, message: 'タイトルは100文字以内で入力してください' }
                                        })} />
                                    {errors.title?.message && (<div>{errors.title?.message as String}</div>)}
                                </td>
                                <td>
                                    <input type="text" id="author"
                                        {...register("author", {
                                            required: { value: true, message: '著者名は必須です' },
                                            maxLength: { value: 100, message: '著者名は100文字以内で入力したください' }
                                        })} />
                                    {errors.author?.message && (<div>{errors.author?.message as String}</div>)}
                                </td>
                                <td><textarea id="description"
                                    {...register("desciption")}
                                ></textarea></td>
                                <td></td>
                                <td>
                                    <button type="button" onClick={() => handleCanselCreate()}>キャンセル</button>
                                    <button type="submit" onClick={() => setAction('create')}>登録する</button>
                                </td>
                            </tr>
                        ) : (null)}
                        {books.map(book => (
                            editingBookId === book.id ? (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>
                                        <input type="text" id="title"
                                            {...register("title", {
                                                required: { value: true, message: 'タイトルは必須です' },
                                                maxLength: { value: 100, message: 'タイトルは100文字以内で入力してください' }
                                            })} />
                                        {errors.title?.message && (<div>{errors.title?.message as String}</div>)}
                                    </td>
                                    <td>
                                        <input type="text" id="author"
                                            {...register("author", {
                                                required: { value: true, message: '著者名は必須です' },
                                                maxLength: { value: 100, message: '著者名は100文字以内で入力したください' }
                                            })} />
                                        {errors.author?.message && (<div>{errors.author?.message as String}</div>)}
                                    </td>
                                    <td><textarea id="description"
                                        {...register("description")}
                                    ></textarea></td>
                                    <td></td>
                                    <td>
                                        <button type="button" onClick={() => handleCanselEditBook()}>キャンセル</button>
                                        <button type="submit" onClick={() => setAction('update')}>更新する</button>
                                        <button type="submit" onClick={() => setAction('delete')}>削除する</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td><Link href={`/books/${book.id}`}>{book.title}</Link></td>
                                    <td>{book.author}</td>
                                    <td>{book.description}</td>
                                    <td>
                                        <button onClick={() => handleEditBookRow(book.id)}>編集・削除</button>
                                    </td>
                                </tr>
                            )
                        ))
                        }
                    </tbody>
                </table>
            </form>
        </>
    )
}