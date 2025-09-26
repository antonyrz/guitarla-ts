import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions = 
    { type: 'add-to-cart', payload: {item: Guitar}} |
    { type: 'remove-from-cart', payload: {id: Guitar['id']}} |
    { type: 'decrease-quantity', payload: {id: Guitar['id']}} |
    { type: 'increase-quantity', payload: {id: Guitar['id']}} |
    { type: 'cart-is-empty'} |
    { type: 'clear-cart'};

export type CartState = {
    data: Guitar[],
    cart: CartItem[]
};

export const initialState : CartState = {
    data: db,
    cart: [],
};

const MIN_ITEMS = 1
const MAX_ITEMS = 5

export const cartReducer = (
        state: CartState = initialState,
        action: CartActions
    ) => {

        if(action.type === 'add-to-cart'){

            const ItemPayload = action.payload.item;
            let updatedCart : CartItem[] = [];

            const itemExists = state.cart.find(guitar => guitar.id === ItemPayload.id);

            if(itemExists){
                // El item existe en el carrito
                updatedCart = state.cart.map(item => {

                    if(item.id === ItemPayload.id && item.quantity < MAX_ITEMS) return {...item, quantity: item.quantity++}

                    return item;
                });

            }else{

                // El item NO existe en el carrito
                const newItem : CartItem = {...ItemPayload, quantity: 1};
                updatedCart = [...state.cart, newItem]
            }
                
            return{
                ...state,
                cart: updatedCart,
            };
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