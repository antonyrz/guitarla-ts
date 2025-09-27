import { useState, useEffect, useMemo } from 'react'
import type { Guitar, CartItem } from '../types'

export const useCart = () => {

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [cart, setCart] = useState(initialCart)


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])



    // State Derivado
    const cartTotal = useMemo( () => cart.reduce( (total, item ) => total + (item.quantity * item.price), 0), [cart] )

    return {
        cart,
        cartTotal
    }
}