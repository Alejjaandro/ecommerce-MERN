import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const createOrder = createAsyncThunk(
    "cart/createOrder",
    async (data, { rejectWithValue }) => {
                
        const { userId, order, cart } = data;

        if (order.sameAsCustomer === false) {
            if (
                (!order.billingName || order.billingName === "") ||
                (!order.billingAddress || order.billingAddress === "") ||
                (!order.billingCountry || order.billingCountry === "") ||
                (!order.billingState || order.billingState === "") ||
                (!order.billingCity || order.billingCity === "") ||
                (!order.billingZipcode || order.billingZipcode === "")
                ) {
                return rejectWithValue(["Click on the checkbox to use the same information for billing or fill billing info."]);
            }
        }

        try {
            const response = await axios.post(`/orders/${userId}`, { userId, order, cart });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getOrders = createAsyncThunk(
    "cart/getOrders",
    async (userId, { rejectWithValue }) => {
       
        try {
            const response = await axios.get(`/orders/find/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getSingleOrder = createAsyncThunk(
    "cart/getSingleOrder",
    async (orderId, { rejectWithValue }) => {
        console.log(orderId);
        
        try {
            const response = await axios.get(`/orders/findOrder/${orderId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        userOrders:null,
        order: null,
        success: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                state.order = action.payload.newOrder;
                state.success = action.payload.message;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.error = action.payload[0];
            })
            .addCase(getOrders.fulfilled, (state, action) => {               
                state.userOrders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getSingleOrder.fulfilled, (state, action) => {
                state.order = action.payload;
            })
            .addCase(getSingleOrder.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer;