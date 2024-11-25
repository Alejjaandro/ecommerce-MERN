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

export const createProduct = createAsyncThunk(
    "admin/createProduct",
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);

            // Check if the thumbnail is a number
            if (!isNaN(data.thumbnail)) {
                return rejectWithValue(["Thumbnail must be a string"]);
            }
            data.thumbnail = `productImages/${data.thumbnail}`;

            const response = await axios.post(`/products/`, data);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "admin/updateProduct",
    async (info, { rejectWithValue }) => {
        try {
            const { productId, data } = info;

            // If data is empty, return an error
            if (Object.keys(data).length === 0) {
                return rejectWithValue(["No fields to update"]);
            }

            // Check if the thumbnail is a number.
            if (data.thumbnail && !isNaN(data.thumbnail)) {
                return rejectWithValue(["Thumbnail must be a string"]);

            } else if (!data.thumbnail) {
                delete data.thumbnail

            } else {
                data.thumbnail = (data.thumbnail.split('/')[0] === 'productImages') ? data.thumbnail : `productImages/${data.thumbnail}`;
                console.log(data.thumbnail);
            }

            console.log(data);

            const response = await axios.put(`/products/${productId}`, data);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "admin/deleteProduct",
    async (productId, { rejectWithValue }) => {
        try {
            // console.log(productId);

            const response = await axios.delete(`/products/${productId}`);
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

        error: null,
        success: null
    },

    reducers: {
        filterByCategory: (state, action) => {
            const category = action.payload.toLowerCase();
            state.selectedCategory = category;

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
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.allProducts.push(action.payload.newProduct);
                state.filteredProducts.push(action.payload.newProduct);
                state.success = action.payload.message;
                state.error = null;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.error = action.payload[0];
                state.success = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                console.log(action.payload);

                const updatedProduct = action.payload.updatedProduct;
                state.allProducts = state.allProducts.map(product => product._id === updatedProduct._id ? updatedProduct : product);
                state.filteredProducts = state.filteredProducts.map(product => product._id === updatedProduct._id ? updatedProduct : product);
                state.success = action.payload.message;
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.payload[0];
                state.success = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                console.log(action.payload);

                state.error = action.payload.message[0];
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const productDeleted = action.payload.deletedProduct;
                state.allProducts = state.allProducts.filter(product => product._id !== productDeleted._id);
                state.filteredProducts = state.filteredProducts.filter(product => product._id !== productDeleted._id);
                state.success = action.payload.message;
            }
            );
    },
});

export const { filterByCategory, filterByBrand, sortByPrice } = productsSlice.actions;
export default productsSlice.reducer;