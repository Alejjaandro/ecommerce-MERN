import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

// Async thunk for products. This will fetch all products from the backend
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
export const getSingleProduct = createAsyncThunk(
    "products/getSingleProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/products/find/${id}`);
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
        singleProduct: {},
        filteredProducts: [],
        allCategories: [],
        allBrands: [],
        selectedCategory: "all",
        selectedBrand: "all",
    },

    reducers: {
        filterByCategory: (state, action) => {
            const category = action.payload.toLowerCase();
            state.selectedCategory = category;
            // const brand = state.selectedBrand;

            // If the category is "all", show all products and get all brands. Otherwise, filter products by category and get all brands from the filtered products
            if (category === "all") {
                state.filteredProducts = state.allProducts;
                state.allBrands = [...new Set(state.allProducts.map(product => product.brand))];
            } else {
                state.filteredProducts = state.allProducts.filter(product => product.category.toLowerCase() === category);
                state.allBrands = [...new Set(state.filteredProducts.map(product => product.brand))];
            }
        },

        filterByBrand: (state, action) => {
            const brand = action.payload.toLowerCase();
            state.selectedBrand = brand;
            const category = state.selectedCategory;

            // If the brand is "all" and the category is "all", show all products. 
            // If the brand is "all" and the category is not "all", filter products by category. 
            // If the brand is not "all", filter products by brand and category.
            if (brand === "all") {
                state.filteredProducts = category === "all"
                    ? state.allProducts
                    : state.allProducts.filter(product => product.category.toLowerCase() === category);
            } else {
                state.filteredProducts = state.allProducts.filter(product => {
                    const matchesBrand = product.brand.toLowerCase() === brand;
                    const matchesCategory = category === "all" || product.category.toLowerCase() === category;
                    return matchesBrand && matchesCategory;
                });
            }
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

                state.allCategories = [...new Set(action.payload.map(product => product.category))];
                state.allBrands = [...new Set(action.payload.map(product => product.brand))];
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.singleProduct = action.payload;
            }
        );
    },
});

export const { filterByCategory, filterByBrand, sortByPrice } = productsSlice.actions;
export default productsSlice.reducer;