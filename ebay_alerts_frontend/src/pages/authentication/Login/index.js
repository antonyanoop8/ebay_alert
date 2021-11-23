import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { LocalStorageKeys } from 'common/constants';
import Page from 'components/Page';
import { AuthContext } from 'contexts/auth';
import { useLogin } from 'queries/authentication';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const { mutateAsync: login, isLoading: loginLoading, reset: loginReset } = useLogin();

    const { setTokens } = useContext(AuthContext);

    const onSubmit = async data => {
        try {
            const response = await login({ username: data.username, password: data.password });

            if (response?.access) {
                localStorage.setItem(LocalStorageKeys.Tokens, JSON.stringify(response));
                setTokens(response);
                navigate('/alerts');
            }
        } catch (error) {
            console.log('Error', error.message);
        } finally {
            loginReset();
        }
    };

    return (
        <Page>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        {...register('username', { required: true })}
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                    />
                    <TextField
                        {...register('password', { required: true })}
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loginLoading}>
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Page>
    );
}
