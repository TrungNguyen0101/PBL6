/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import { createContext, useState } from 'react'

export const ContractContext = createContext()

function ContractProvider({ children }) {
    const [contract, setContract] = useState(null)

    const contextValue = useMemo(() => {
        return {
            contract,
            setContract
        }
    }, [contract])

    return (
        <ContractContext.Provider value={contextValue}>
            {children}
        </ContractContext.Provider>
    )
}

export default ContractProvider
