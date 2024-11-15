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


export const productsSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        filteredProducts: [],
        error: null
    },

    reducers: {
        filterByCategory: (state, action) => {
            const category = action.payload.toLowerCase();
            console.log(category);
            
            if (category === "all") {
                state.filteredProducts = state.allProducts;
            } else {
                state.filteredProducts = state.allProducts.filter(product => product.category.toLowerCase() === category);
            }
        },

        filterByBrand: (state, action) => {
            state.filteredProducts = state.allProducts.filter(product => product.brand.toLowerCase() === action.payload);
        },

        sortByPrice: (state, action) => {
            if (action.payload === "asc") {
                state.filteredProducts = state.filteredProducts.sort((a, b) => a.price - b.price);
            } else {
                state.filteredProducts = state.filteredProducts.sort((a, b) => b.price - a.price);
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.allProducts = action.payload;
                state.filteredProducts = action.payload;
            })
    },
});

export const { filterByCategory, filterByBrand, sortByPrice } = productsSlice.actions;
export default productsSlice.reducer;