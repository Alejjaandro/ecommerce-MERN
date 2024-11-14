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
                return rejectWithValue("Passwords do not match.");
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

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {

        getUser: () => {
            const user = JSON.parse(localStorage.getItem("token"));

            if (user) { return user }
            else { return null }
        },

        logout: () => {
            localStorage.removeItem("token");
            return null;
        },
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                console.log(action.payload);
                return null;
            })
            .addCase(register.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                console.log(action.payload);
                return null;
            });
    },
});

export const { getUser, logout } = userSlice.actions;
export default userSlice.reducer;