import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import NavBar from 'components/NavBar';
import Page from 'components/Page';
import { useCreateAlert } from 'queries/alerts';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


export default function CreateAlert() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { mutateAsync: createAlert, isLoading: createAlertLoading } = useCreateAlert();

    const onSubmit = async data => {
        try {
            await createAlert({ ...data });
            navigate('/alerts');
        } catch (error) {
            console.log('Error', error.message);
        }
    };

    return (
        <>
            <NavBar />
            <Page>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Typography variant="h6" gutterBottom>
                        Create Alert
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('title', { required: true })}
                                    id="title"
                                    label="Title"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant={'standard'}>
                                    <InputLabel id="status-select-label">Status</InputLabel>
                                    <Select
                                        labelId="status-label"
                                        id="status"
                                        label="Status"
                                        {...register('status', { required: true })}>
                                        <MenuItem value={'active'}>Active</MenuItem>
                                        <MenuItem value={'disabled'}>Disabled</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant={'standard'}>
                                    <InputLabel id="interval-select-label">Time Interval</InputLabel>
                                    <Select
                                        labelId="time_interval"
                                        id="time_interval"
                                        label="Time Interval"
                                        {...register('time_interval', { required: true })}>
                                        <MenuItem value={'two_mins'}>2 minutes</MenuItem>
                                        <MenuItem value={'ten_mins'}>10 minutes</MenuItem>
                                        <MenuItem value={'thirty_mins'}>30 minutes</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('search_phrase', { required: true })}
                                    id="search_phrase"
                                    label="Search Phrase"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('email', { required: true })}
                                    id="email"
                                    label="Email"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Button
                                    onClick={() => navigate('/alerts')}
                                    fullWidth
                                    variant="outlined"
                                    xs={6}
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={createAlertLoading}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    xs={6}
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={createAlertLoading}>
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Page>
        </>
    );
}
