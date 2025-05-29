import { createContext, useReducer } from "react";

export const CartContext = createContext();

const CartReducer = (state, action) => {
    switch(action.type){
        case "ADD_ITEM":
            return[ ...state, action.payload];
        case "REMOVE_ITEM":
            return state.filter(itme => itme.id !== action.payload.id)
        default:
            return state;
    }
}

export const CartProvider = ({children}) => {
    const [cart, dispatch] = useReducer(CartReducer, []);

    return(
        <CartContext.Provider value={{cart, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}
