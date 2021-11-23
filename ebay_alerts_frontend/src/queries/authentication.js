import api from 'common/axios';
import { Endpoints } from 'common/constants';
import { useMutation } from 'react-query';

export function useLogin() {
    return useMutation(({ username, password }) =>
        api
            .post(Endpoints.Login, {
                username: username,
                password: password
            })
            .then(response => response?.data)
    );
}
