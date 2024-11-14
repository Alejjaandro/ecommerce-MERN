import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./userSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
    reducer: {
        user: authReducer,
        products: productsReducer,
    },
});
