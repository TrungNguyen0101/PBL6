import React, { useMemo } from 'react';
import { createContext, useState } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const contextValue = useMemo(() => {
    return { user, setUser };
  }, [user, setUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
