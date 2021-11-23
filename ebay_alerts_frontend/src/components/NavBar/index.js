import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearStorage } from 'utils/query';

export default function NavBar(props) {
    const navigate = useNavigate();

    const onLogout = () => {
        clearStorage();
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Ebay Alerts
                    </Typography>
                    <Button onClick={onLogout} color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
