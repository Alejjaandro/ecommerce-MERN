import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

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

export const getAllUsers = createAsyncThunk(
    "admin/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/users/');
            return response.data;

        } catch (error) {
            return rejectWithValue([error.response.data.message]);
        }
    }
);

export const getUserToEdit = createAsyncThunk(
    "admin/getUserToEdit",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`users/find/${userId}`);
            return response.data;

        } catch (error) {
            return rejectWithValue([error.response.data.message]);
        }
    }
);

export const editUser = createAsyncThunk(
    "admin/editUser",
    async (data, { rejectWithValue }) => {
        try {
            const { userId, info } = data;

            // If data is empty, return an error
            if (Object.keys(info).length === 0) {
                return rejectWithValue(["No fields to update"]);
            }

            const response = await axios.put(`users/${userId}`, info);
            return response.data;

        } catch (error) {
            return rejectWithValue([error.response.data.message]);
        }
    }
);

export const getAllCarts = createAsyncThunk(
    "admin/getAllCarts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/carts/');
            return response.data;

        } catch (error) {
            return rejectWithValue([error.response.data.message]);
        }
    }
);

export const getAllOrders = createAsyncThunk(
    "admin/getAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/orders/');
            return response.data;

        } catch (error) {
            return rejectWithValue([error.response.data.message]);
        }
    }
);

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        userToEdit: null,
        allUsers: null,
        allCarts: null,
        allOrders: null,
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
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                console.log(action.payload);
                state.error = action.payload.message;
            })
            .addCase(getUserToEdit.fulfilled, (state, action) => {
                state.userToEdit = action.payload;
            })
            .addCase(getUserToEdit.rejected, (state, action) => {
                console.log(action.payload);
                state.error = action.payload.message;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.userToEdit = action.payload.updatedUser;
                state.success = action.payload.message;
                state.error = null;
            })
            .addCase(editUser.rejected, (state, action) => {
                console.log(action.payload);
                state.error = action.payload[0];
                state.success = null;
            })
            .addCase(getAllCarts.fulfilled, (state, action) => {
                if (action.payload.length === 0) {
                    state.allCarts = null;
                    return;
                }
                state.allCarts = action.payload;
            })
            .addCase(getAllCarts.rejected, (state, action) => {
                console.log(action.payload);
                state.error = action.payload.message;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.allOrders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                console.log(action.payload);
                state.error = action.payload.message;
            });
    },
});

export default adminSlice.reducer;