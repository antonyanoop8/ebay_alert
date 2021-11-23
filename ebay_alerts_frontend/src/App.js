import { queryClient } from 'common/query';
import { AuthContext } from 'contexts/auth';
import React, { useState } from 'react';
import { QueryClientProvider } from 'react-query';
import MainRoutes from 'routes';

function App() {
    const [tokens, setTokens] = useState(null);

    return (
        <AuthContext.Provider value={{ tokens, setTokens }}>
            <QueryClientProvider client={queryClient}>
                <MainRoutes />
            </QueryClientProvider>
        </AuthContext.Provider>
    );
}

export default App;
