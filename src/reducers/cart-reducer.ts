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
    cart: CartItem[],
};

const localeStorageCart = localStorage.getItem('cart');

console.log(localeStorageCart);

export const initialState : CartState = {
    data: db,
    cart: localeStorageCart ? JSON.parse(localeStorageCart) : [],
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

            const itemId = action.payload.id;
            const cart = [...state.cart];

            const updatedCart = cart.filter(item => item.id !== itemId);

            return{
                ...state,
                cart: updatedCart,
            }
        }

        if(action.type === 'decrease-quantity'){

            const cart = state.cart;
            const itemId = action.payload.id;

            const updatedCart = cart.map(item => {

                if(item.id === itemId && item.quantity > MIN_ITEMS){

                    return {...item, quantity: item.quantity--};
                }else{
                    return item;
                }
            });



            return{
                ...state,
                cart: updatedCart,
            }
        }

         if(action.type === 'increase-quantity'){

            const cart = state.cart;
            const itemId = action.payload.id;

             const updatedCart = cart.map(item => {

                if(item.id === itemId && item.quantity < MAX_ITEMS){

                    return {...item, quantity: item.quantity++};
                }else{
                    return item;
                }
            });


            return{
                ...state,
                cart: updatedCart,
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