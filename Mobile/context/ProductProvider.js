import React, { useEffect, createContext, useState, useMemo, useCallback } from 'react';
import { get } from '../axios-config';

export const ProductContext = createContext();

function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await get('/products');
            if (response) {
                setProducts(response?.data);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const contextValue = useMemo(() => ({ products, isLoading }), [products, isLoading]);

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;
