import { createContext } from 'react';

//Used for keeping track of query re-hydration
export const AuthContext = createContext({
    tokens: null,
    setTokens: () => {}
});
