import api from 'common/axios';
import { Endpoints } from 'common/constants';
import { queryClient } from 'common/query';
import { useMutation, useQuery } from 'react-query';

export function useAlerts() {
    return useQuery(Endpoints.Alerts, () => api.get(Endpoints.Alerts).then(response => response.data));
}

export function useCreateAlert() {
    return useMutation(
        ({ title, status, time_interval, search_phrase, email }) =>
            api
                .post(Endpoints.Alerts, {
                    title: title,
                    status: status,
                    time_interval: time_interval,
                    search_phrase: search_phrase,
                    email: email
                })
                .then(response => response?.data),
        {
            onSuccess: data => {
                queryClient.invalidateQueries(Endpoints.Alerts);
            }
        }
    );
}

export function useUpdateAlert() {
    return useMutation(
        ({ title, status, time_interval, search_phrase, email, id }) =>
            api
                .put(`${Endpoints.Alerts}${id}/`, {
                    title: title,
                    status: status,
                    time_interval: time_interval,
                    search_phrase: search_phrase,
                    email: email
                })
                .then(response => response?.data),
        {
            onSuccess: data => {
                queryClient.invalidateQueries(Endpoints.Alerts);
            }
        }
    );
}

export function useDeleteAlert() {
    return useMutation(({ id }) => api.delete(`${Endpoints.Alerts}${id}/`).then(response => response?.data), {
        onSuccess: data => {
            queryClient.invalidateQueries(Endpoints.Alerts);
        }
    });
}
