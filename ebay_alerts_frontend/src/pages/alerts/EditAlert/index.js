import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import NavBar from 'components/NavBar';
import Page from 'components/Page';
import _ from 'lodash';
import { useAlerts, useUpdateAlert } from 'queries/alerts';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditAlert() {
    const navigate = useNavigate();
    let { id } = useParams();
    const { data: alerts, isLoading: alertsLoading } = useAlerts();
    const { register, handleSubmit } = useForm();
    const { mutateAsync: updateAlert, isLoading: updateAlertLoading } = useUpdateAlert();

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (!alert && alerts?.length && !alertsLoading) {
            const selectedAlert = _.find(alerts, a => `${a?.id}` === `${id}`);

            if (!!selectedAlert) {
                setAlert(selectedAlert);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alerts, id, alertsLoading]);

    const onSubmit = async data => {
        try {
            await updateAlert({ ...data, id: id });
            navigate('/alerts');
        } catch (error) {
            console.log('Error', error.message);
        }
    };

    if (alertsLoading || !alert?.id) {
        return (
            <>
                <NavBar />
                <Page>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                        <Typography variant="h4">Loading...</Typography>
                    </Box>
                </Page>
            </>
        );
    }

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
                        Update Alert
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
                                    defaultValue={alert?.title}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant={'standard'}>
                                    <InputLabel id="status-select-label">Status</InputLabel>
                                    <Select
                                        {...register('status', { required: true })}
                                        defaultValue={alert?.status}
                                        labelId="status-label"
                                        id="status-select"
                                        label="Status">
                                        <MenuItem value={'active'}>Active</MenuItem>
                                        <MenuItem value={'disabled'}>Disabled</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant={'standard'}>
                                    <InputLabel id="interval-select-label">Time Interval</InputLabel>
                                    <Select
                                        {...register('time_interval', { required: true })}
                                        defaultValue={alert?.time_interval}
                                        labelId="time_interval"
                                        id="time_interval"
                                        label="Time Interval">
                                        <MenuItem value={'two_mins'}>2 minutes</MenuItem>
                                        <MenuItem value={'ten_mins'}>10 minutes</MenuItem>
                                        <MenuItem value={'thirty_mins'}>30 minutes</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('search_phrase', { required: true })}
                                    defaultValue={alert?.search_phrase}
                                    id="search_phrase"
                                    label="Search Phrase"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('email', { required: true })}
                                    defaultValue={alert?.email}
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
                                    disabled={updateAlertLoading}>
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
                                    disabled={updateAlertLoading}>
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
