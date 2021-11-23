import { LocalStorageKeys } from 'common/constants';
import { queryClient } from 'common/query';

export const clearStorage = async () => {
    localStorage.removeItem(LocalStorageKeys.Tokens);
    queryClient.cancelQueries();
    queryClient.resetQueries();
};
