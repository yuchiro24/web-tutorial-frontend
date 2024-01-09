'use client';

import { useState, useEffect } from "react";
import booksData from "../mock/dummy_books.json";
import bookDetailsData from "../mock/dummy_book_details.json";
import { Alert, AlertColor, Snackbar, TableContainer, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";

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


// 書籍詳細画面
export default function Page({ params }: { params: { id: number } }) {
    const [book, setBook] = useState<Book | null>(null);
    const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
    const id = Number(params.id);

    const [isSnackbarOpened, setIsSnackbarOpened] = useState<boolean>(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [message, setMessage] = useState<string>('');
    const result = (serverity: AlertColor, message: string) => {
        setIsSnackbarOpened(true);
        setSeverity(serverity);
        setMessage(message);
    }
    const handleQuote = () => {
        // TODO: 引用数を増やす処理
        result('success', '引用の登録を行いました');
    };

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
            <Snackbar open={isSnackbarOpened} autoHideDuration={3000} onClose={() => setIsSnackbarOpened(false)}>
                <Alert severity={severity} sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
            <Typography variant="h4">書籍詳細</Typography>
            
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>タイトル</TableCell>
                        <TableCell>著者</TableCell>
                        <TableCell>ジャンル</TableCell>
                        <TableCell>引用数</TableCell>
                        <TableCell>登録日</TableCell>
                        <TableCell>最終更新日</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{bookDetail?.title}</TableCell>
                        <TableCell>{bookDetail?.author}</TableCell>
                        <TableCell>{bookDetail?.genre}</TableCell>
                        <TableCell>{bookDetail?.quotedCount}</TableCell>
                        <TableCell>{bookDetail?.createdAt}</TableCell>
                        <TableCell>{bookDetail?.updatedAt}</TableCell>
                        <TableCell><Button variant="contained" type="submit" onClick={() => handleQuote()}>引用</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            
        </>
    )
}