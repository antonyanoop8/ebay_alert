import { LocalStorageKeys } from 'common/constants';
import { AuthContext } from 'contexts/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }) {
    const { tokens, setTokens } = useContext(AuthContext);
    const location = useLocation();

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const savedTokens = localStorage.getItem(LocalStorageKeys.Tokens);
        if (savedTokens) setTokens(JSON.parse(savedTokens));
        setIsReady(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isReady) return null;
    if (!tokens?.access) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
}
