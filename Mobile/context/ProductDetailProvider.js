import React, { createContext, useState } from 'react';

export const ProductDetailContext = createContext();

function ProductDetailProvider({ children }) {
    const [productId, setProductId] = useState();
    const contextValue = {
        productId,
        setProductId,
    };
    return (
        <ProductDetailContext.Provider value={contextValue}>
            {children}
        </ProductDetailContext.Provider>
    );
}

export default ProductDetailProvider;
