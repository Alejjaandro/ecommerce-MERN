import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

// Async thunk for products. This will fetch all products from the backend
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

export const adminSlice = createSlice({
    name: "products",
    initialState: {
        error: null,
        success: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(deleteProduct.fulfilled, (state, action) => {
                console.log(action.payload);
                state.success = action.payload.message;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                console.log(action.payload);
                state.error = action.payload.message;
            }
        );
    },
});

export default adminSlice.reducer;