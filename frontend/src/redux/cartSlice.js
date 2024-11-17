import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

export const getCart = createAsyncThunk(
    "cart/getCart",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const user = jwtDecode(token);

            if (user) {
                const response = await axios.get(`/carts/find/${user._id}`);
                
                if (response.data.cart.productsQuantity === 0) {
                    await axios.delete(`/carts/${user._id}`);
                    return rejectWithValue("Cart is empty");        
                }
                
                return response.data;
            }

        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    },
);

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (data, { rejectWithValue }) => {

        try {
            const { userId, product } = data;
         
            const response = await axios.post(`/carts/${userId}`, {
                _id: product._id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity: product.quantity || 1,
                color: product.color || "N/A",
                ram: product.ram || "N/A",
            });

            return response.data;

        } catch (error) {
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
    },
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (data, { rejectWithValue }) => {
        try {
            const { userId, productId, product } = data;              
            const response = await axios.delete(`/carts/${userId}/${productId}`, { data: product });           
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    },
);
export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (data, { rejectWithValue }) => {
        try {
            const userId = data;
            const response = await axios.delete(`/carts/${userId}`);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    },
);

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: null,
        cartTotal: 0,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.cart = action.payload.cart;
                state.cartTotal = action.payload.cart.productsQuantity;
            })
            .addCase(getCart.rejected, (state) => {
                state.cart = null;
                state.cartTotal = 0;
            })
            .addCase(addToCart.fulfilled, (state, action) => {               
                state.cart = action.payload;
                state.cartTotal = action.payload.productsQuantity;
            })
            .addCase(addToCart.rejected, (state, action) => {
                console.log(action.payload);
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {               
                state.cart = action.payload.cart;
                state.cartTotal = action.payload.cart.productsQuantity;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                console.log(action.payload);
            })
            .addCase(deleteCart.fulfilled, (state) => {
                state.cart = null;
                state.cartTotal = 0;
            })
            .addCase(deleteCart.rejected, (state, action) => {
                console.log(action.payload);
            });
    },
});

// export const { removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;