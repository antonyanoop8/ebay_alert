import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Statuses, TimeIntervals } from 'common/constants';
import NavBar from 'components/NavBar';
import Page from 'components/Page';
import { useAlerts, useDeleteAlert } from 'queries/alerts';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Alerts(props) {
    const navigate = useNavigate();
    const { data: alerts = [], isLoading: alertsLoading } = useAlerts();
    const { mutateAsync: deleteAlert } = useDeleteAlert();

    const onDelete = async id => {
        try {
            await deleteAlert({ id });
        } catch (error) {
            console.error(error);
        }
    };

    const onEdit = id => {
        navigate(`/alerts/${id}`);
    };

    const columns = [
        { field: 'title', headerName: 'Title', width: 200 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: params => <span>{Statuses[params?.row.status]}</span>
        },
        {
            field: 'time_interval',
            headerName: 'Interval',
            width: 150,
            renderCell: params => <span>{TimeIntervals[params.row.time_interval]}</span>
        },
        { field: 'search_phrase', headerName: 'Search Phrase', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: params => {
                const { row } = params;
                return (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginLeft: 16 }}
                            onClick={() => onEdit(row?.id)}>
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginLeft: 16 }}
                            onClick={() => onDelete(row?.id)}>
                            Delete
                        </Button>
                    </div>
                );
            }
        }
    ];

    const onCreateAlert = () => {
        navigate('/create-alert');
    };

    return (
        <>
            <NavBar />
            <Page>
                <Box className={'data-view'}>
                    <Button onClick={onCreateAlert}>Create Alert</Button>
                    <DataGrid rows={alerts} columns={columns} loading={alertsLoading} />
                </Box>
            </Page>
        </>
    );
}
