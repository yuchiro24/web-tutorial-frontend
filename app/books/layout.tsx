'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ThemeProvider,
    Toolbar,
    Typography,
    createTheme,
} from "@mui/material"
import { Logout as LogoutIcon, Menu as MenuIcon } from "@mui/icons-material"

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false;
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true;
        tablet: true;
        desktop: true;
    }
}

const defaultTheme = createTheme({
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 640,
            desktop: 1024,
        },
    },
});

// /books 以下で使用する共通レイアウト。Node.jsの決まりにより、ファイル名は layout.tsx とする。
export default function BooksLayout({ children }: { children: React.ReactNode }) {
    const [isNavbarOpened, setIsNavbarOpened] = useState<boolean>(false);
    const toggleNavbar = () => setIsNavbarOpened(!isNavbarOpened);

    const router = useRouter();

    const handleLogout = () => {
        // TODO: ログアウト処理
        console.log('logout');
        router.push('/login');
    };

    // サイドバー
    const list = () => (
        <Box
            sx={{ width: 240 }}
            onClick={() => toggleNavbar()}
            onKeyDown={() => toggleNavbar()}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>メニュー</Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItem disablePadding component="a" href="/books">
                    <ListItemButton>
                        <ListItemText primary="書籍一覧" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding component="a" href="/books/import">
                    <ListItemButton>
                        <ListItemText primary="新規登録" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: "flex" }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton onClick={() => toggleNavbar()}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>関連書籍管理</Typography>
                        <Button variant="contained" color="secondary" startIcon={<LogoutIcon />} onClick={() => handleLogout()}>ログアウト</Button>
                    </Toolbar>
                </AppBar>
                <Drawer open={isNavbarOpened} onClose={() => setIsNavbarOpened(false)} anchor="left">
                    {list()}
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px", width: "100%", background: "white" }}>
                    {children}
                </Box>
                <Box component="footer" sx={{ width: "100%", background: "#1976d2", position: "fixed", textAlign: "center", bottom: 0 }}>
                    <Typography variant="caption" color="white">© 2023 Yuichiro Tsuji</Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}