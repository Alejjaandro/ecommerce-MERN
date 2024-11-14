import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

// Async thunk for products
export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/products");
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const userSlice = createSlice({
    name: "products",
    initialState: null,
    reducers: {
        filterByCategory: (state, action) => {
            return state.filter(product => product.category === action.payload);
        },
        filterByBrand: (state, action) => {
            console.log(state);
            return state.filter(product => product.brand === action.payload);
        },
        sortByPrice: (state, action) => {
            if (action.payload === "asc") {
                return state.sort((a, b) => a.price - b.price);
            } else {
                return state.sort((a, b) => a.price - b.price);
            }
        }
    },
    
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.fulfilled, (state, action) => {
            return action.payload;
        })
    },
});

export const { filterByCategory, filterByBrand, sortByPrice } = userSlice.actions;
export default userSlice.reducer;