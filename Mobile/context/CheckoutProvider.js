/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { createContext, useState } from 'react'
import { AuthContext } from './AuthProvider'
import { get } from '../axios-config'

export const CheckoutContext = createContext()

function CheckoutProvider({ children }) {
    const { user, accessToken } = useContext(AuthContext)
    const [cart, setCart] = useState(null)
    const [shipPrice, setShipPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [shipMethod, setShipMethod] = useState({
        label: 'Thanh toán khi nhận hàng',
        value: 'cash',
    })

    const [addressCheckout, setAddressCheckout] = useState({
        name: '',
        address: '',
        phone: ''
    })

    const handleSumTotalPrice = useCallback(() => {
        if (cart) {
            cart.map((x) => {
                setTotalPrice((prev) => prev + x.PriceDiscount * x.Count)
            })
        }
    }, [cart])

    const fetchCartData = useCallback(async () => {
        try {
            if (user) {
                const response = await get(`/order?id=${user?._id}`, {
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
                    },
                })
                setCart(response?.data?.data?.order)
            }
        } catch (error) {
            console.log(error)
        }
    }, [accessToken, user])

    useEffect(() => {
        setShipPrice(0)
        setTotalPrice(0)
        handleSumTotalPrice()
    }, [handleSumTotalPrice])

    useEffect(() => {
        fetchCartData()
    }, [fetchCartData])

    const contextValue = useMemo(() => {
        return {
            cart,
            setCart,
            fetchCartData,
            shipPrice,
            totalPrice,
            setAddressCheckout,
            addressCheckout,
            setShipMethod,
            shipMethod,
        }
    }, [addressCheckout, cart, fetchCartData, shipMethod, shipPrice, totalPrice])

    return (
        <CheckoutContext.Provider value={contextValue}>
            {children}
        </CheckoutContext.Provider>
    )
}

export default CheckoutProvider
