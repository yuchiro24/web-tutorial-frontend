'use client';

import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import booksData from "./mock/dummy_books.json";
import Link from "next/link";
import { Alert, AlertColor, Box, Button, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";

type Book = {
    id: number | null
    title: string
    author: string
    description: string
};

// 書籍一覧画面
export default function Page() {
    const [books, setBooks] = useState<Book[]>([]);
    const [editingBookId, setEditingBookId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [action, setAction] = useState<string>('');

    const [isSnackbarOpened, setisSnackbarOpened] = useState<boolean>(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [message, setMessage] = useState<string>('');
    const result = (serverity: AlertColor, message: string) => {
        setisSnackbarOpened(true);
        setSeverity(serverity);
        setMessage(message);
    }
    const handleClose = () => {
        setisSnackbarOpened(false);
    }

    const router = useRouter();

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
        result('success', '新しい本を登録しました。');
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
        result('success', '本の情報を更新しました。');
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
        result('success', '本を削除しました。');
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
            <Snackbar open={isSnackbarOpened} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
            <Typography variant="h4">書籍一覧</Typography>
            <Button variant="contained" startIcon={<Add />} onClick={() => handleCreateNewBook()}>本を追加する</Button>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ height: 400, width: "100%" }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>タイトル</TableCell>
                                <TableCell>著者</TableCell>
                                <TableCell>説明</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(isCreating && editingBookId === null) ? (
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <input type="text" id="title"
                                            {...register("title", {
                                                required: { value: true, message: 'タイトルは必須です' },
                                                maxLength: { value: 100, message: 'タイトルは100文字以内で入力してください' }
                                            })} />
                                        {errors.title?.message && (<div>{errors.title?.message as String}</div>)}
                                    </TableCell>
                                    <TableCell>
                                        <input type="text" id="author"
                                            {...register("author", {
                                                required: { value: true, message: '著者名は必須です' },
                                                maxLength: { value: 100, message: '著者名は100文字以内で入力したください' }
                                            })} />
                                        {errors.author?.message && (<div>{errors.author?.message as String}</div>)}
                                    </TableCell>
                                    <TableCell>
                                        <textarea id="description" {...register("desciption")}></textarea></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <button type="button" onClick={() => handleCanselCreate()}>キャンセル</button>
                                        <button type="submit" onClick={() => setAction('create')}>登録する</button>
                                    </TableCell>
                                </TableRow>
                            ) : (null)}
                            {books.map(book => (
                                editingBookId === book.id ? (
                                    <TableRow key={book.id}>
                                        <TableCell>{book.id}</TableCell>
                                        <TableCell>
                                            <input type="text" id="title"
                                                {...register("title", {
                                                    required: { value: true, message: 'タイトルは必須です' },
                                                    maxLength: { value: 100, message: 'タイトルは100文字以内で入力してください' }
                                                })} />
                                            {errors.title?.message && (<div>{errors.title?.message as String}</div>)}
                                        </TableCell>
                                        <TableCell>
                                            <input type="text" id="author"
                                                {...register("author", {
                                                    required: { value: true, message: '著者名は必須です' },
                                                    maxLength: { value: 100, message: '著者名は100文字以内で入力したください' }
                                                })} />
                                            {errors.author?.message && (<div>{errors.author?.message as String}</div>)}
                                        </TableCell>
                                        <TableCell><textarea id="description" {...register("description")}></textarea></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <button type="button" onClick={() => handleCanselEditBook()}>キャンセル</button>
                                            <button type="submit" onClick={() => setAction('update')}>更新する</button>
                                            <button type="submit" onClick={() => setAction('delete')}>削除する</button>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow key={book.id}>
                                        <TableCell>{book.id}</TableCell>
                                        <TableCell><Link href={`/books/${book.id}`}>{book.title}</Link></TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell>{book.description}</TableCell>
                                        <TableCell>
                                            <button onClick={() => handleEditBookRow(book.id)}>編集・削除</button>
                                        </TableCell>
                                    </TableRow>
                                )
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}