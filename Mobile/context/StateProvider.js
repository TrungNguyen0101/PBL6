import React, { createContext, useMemo, useState } from 'react';

export const StateContext = createContext();

function StateProvider({ children }) {
    const [StateEnableUpdate, setStateEnableUpdate] = useState(false)
    const contextValue = useMemo(() => ({
        StateEnableUpdate,
        setStateEnableUpdate,
    }), [StateEnableUpdate]);

    return (
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    );
}

export default StateProvider;
