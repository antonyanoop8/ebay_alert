import { QueryClient } from 'react-query';

//React Query Client
export const queryClient = new QueryClient();

//Default options for React Query
queryClient.setDefaultOptions({
    mutations: {
        retry: 0
    },
    queries: {
        refetchOnWindowFocus: false
    }
});
