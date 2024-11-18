import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import userReducer from "./userSlice";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        products: productsReducer,
        cart: cartReducer,
    },
});
