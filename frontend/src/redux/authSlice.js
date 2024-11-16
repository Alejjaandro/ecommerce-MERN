import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

// Async thunk for login
export const login = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/auth/login", userData);
            const user = JSON.stringify(response.data.user);
            localStorage.setItem("token", user);

            return JSON.parse(user);
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Async thunk for register
export const register = createAsyncThunk(
    "user/register",
    async (userData, { rejectWithValue }) => {
        try {
            if (userData.password !== userData.confirmPassword) {
                return rejectWithValue(["Passwords do not match."]);
            }
            const response = await axios.post("/auth/register", userData);
            const user = JSON.stringify(response.data.user);
            localStorage.setItem('token', user);

            return JSON.parse(user);
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: undefined,
        error: undefined,
        success: false,
    },
    reducers: {

        getUser: (state) => {
            const user = JSON.parse(localStorage.getItem("token"));

            if (user) { state.user = user }
            else { state.user = null }
        },

        logout: (state) => {
            localStorage.removeItem("token");
            state.user = null;
        },
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.success = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.success = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { getUser, logout } = authSlice.actions;
export default authSlice.reducer;