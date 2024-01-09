'use client';

import { Box, Button, CssBaseline, Divider, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
    username: string
    password: string
}

// ログイン画面
export default function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const defaultTheme = createTheme();

    const handleLogin = (data: FormData) => {
        // TODO: ログイン処理
        console.log("login");
        router.push("/books")
    }

    const onSubmit = (event: any): void => {
        const data: FormData = {
            username: event.username,
            password: event.password
        };
        handleLogin(data);
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            {/* <Container component="main"> */}
                <CssBaseline />
                <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8, }}
                >
                    <Typography component="h1" variant="h5">ログイン</Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            type="text"
                            id="username"
                            label="ユーザー名"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "ユーザー名は必須です",
                                },
                                minLength: {
                                    value: 4,
                                    message: "ユーザー名は4文字以上で入力してください"
                                },
                            })
                            }
                        />
                        {errors.username?.message && <Typography variant="body1" color="red">{errors.username.message as String}</Typography>}
                    
                        <TextField
                            type="password"
                            id="password"
                            label="パスワード"
                            autoComplete="current-password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "パスワードは必須です",
                                },
                                minLength: {
                                    value: 8,
                                    message: "パスワードは8文字以上です"
                                },
                            })
                            }
                        />
                        {errors.password?.message && <Typography variant="body1" color="red">{errors.password.message as String}</Typography>}
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ログイン
                        </Button>
                    </Box>
                </Box>
            {/* </Container> */}
        </ThemeProvider>
    );
}