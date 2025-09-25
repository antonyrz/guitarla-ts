import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions = 
    { type: 'add-to-cart', payload: {item: Guitar}} |
    { type: 'remove-from-cart', payload: {id: Guitar['id']}} |
    { type: 'decrease-quantity', payload: {id: Guitar['id']}} |
    { type: 'increase-quantity', payload: {id: Guitar['id']}} |
    { type: 'clear-cart'};


const MIN_ITEMS = 1
const MAX_ITEMS = 5

export type CartState = {
    data: Guitar[],
    cart: CartItem[]
};

export const initialState : CartState = {
    data: db,
    cart: [],
};

export const cartReducer = (
        state: CartState = initialState,
        action: CartActions
    ) => {

        if(action.type === 'add-to-cart'){

            const newItem : Guitar = action.payload.item;
            const actualCart = [...state.cart];

            let updatedCart;
            
            const itemExists = actualCart.findIndex(guitar => guitar.id === newItem.id)

            if(itemExists >= 0 ) { // existe en el carrito

                if(actualCart[itemExists].quantity >= MAX_ITEMS) return
                updatedCart = [...actualCart, actualCart[itemExists].quantity++]

            } else {
                const itemUpdated : CartItem = {...newItem, quantity : 1}
                updatedCart = [...actualCart, itemUpdated]
            }


            return{
                ...state,
                cart: updatedCart,
            }
        }

        if(action.type === 'remove-from-cart'){

            return{
                ...state
            }
        }

        if(action.type === 'decrease-quantity'){

            return{
                ...state
            }
        }

         if(action.type === 'increase-quantity'){

            return{
                ...state
            }
        }

         if(action.type === 'clear-cart'){

            return{
                ...state,
                cart: []
            }
        }

        return state;
    };