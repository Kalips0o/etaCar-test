import React, { createContext, useState } from 'react';

export interface StatsContextState {
    shouldShowStats: boolean;
    setShouldShowStats: React.Dispatch<React.SetStateAction<boolean>>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const StatsContext = createContext({} as StatsContextState);

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
    const [shouldShowStats, setShouldShowStats] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const value = {
        shouldShowStats,
        setShouldShowStats,
        errorMessage,
        setErrorMessage,
    };

    return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};
