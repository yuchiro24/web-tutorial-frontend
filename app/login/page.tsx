'use client';

import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

// ログイン画面
export default function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = () => {
        // TODO: ログイン処理
        console.log("login");
    }
    return (
        <>
            <Typography variant="h3">ログイン</Typography>
            <Typography variant="h6">ログインする</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField type="email" id="outlined-basic" label="メールアドレス" variant="outlined" required
                    {...register("email", {
                        required: {
                            value: true,
                            message: "メールアドレスは必須です",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/i,
                            message: "メールアドレスの形式が違います"
                        }
                    })
                    }
                />
                {errors.email?.message && <Typography variant="body1" color="red">{errors.email.message as String}</Typography>}
                <Divider sx={{ margin: '10px' }} orientation="horizontal" variant="middle"/>
                <TextField type="password" id="outlined-basic" label="パスワード" variant="outlined" required
                    {...register("password", {
                        required: {
                            value: true,
                            message: "パスワードは必須です",
                        },
                        minLength: {
                            value: 8,
                            message: "パスワードは8文字以上です"
                        }
                    })
                    }
                />
                {errors.password?.message && <Typography variant="body1" color="red">{errors.password.message as String}</Typography>}
                <Divider sx={{ margin: '10px' }} orientation="horizontal" variant="middle"/>
                <Button variant="contained" onClick={() => handleLogin()} type="submit">ログイン</Button>
            </Box>
        </>
    )
}