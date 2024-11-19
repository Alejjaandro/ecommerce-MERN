import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

// Async thunk for login
export const login = createAsyncThunk(
    "auth/login",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/auth/login", userData);
            const user = JSON.stringify(response.data.user);

            const token = response.data.token;
            localStorage.setItem("token", token);

            return JSON.parse(user);
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Async thunk for register
export const register = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            if (userData.password !== userData.confirmPassword) {
                return rejectWithValue(["Passwords do not match."]);
            }
            const response = await axios.post("/auth/register", userData);
            const user = JSON.stringify(response.data.user);

            const token = response.data.token;
            localStorage.setItem('token', token);

            return JSON.parse(user);
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (data, { rejectWithValue }) => {
        try {
            const { userId, info } = data;
            
            if (info.password !== info.confirmPassword) {
                return rejectWithValue({ message: ["Passwords do not match."] });
            }

            // Only allow the following fields to be updated.
            const validKeys = ['image', 'name', 'lastname', 'email', 'username', 'password'];
            let filteredInfo = {};
            validKeys.forEach((key) => {
                if (key in info) {
                    filteredInfo[key] = info[key];
                }
            });

            data = filteredInfo;            
            const response = await axios.put(`/users/${userId}`, info);
            
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            console.log(userId);
            
            const response = await axios.delete(`/users/${userId}`);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for verifying token on page refresh or component mount
export const verifyToken = createAsyncThunk(
    "auth/verifyToken",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/auth/verifyToken", {
                headers: {
                    token: token,
                },
            });
           
            return response.data;
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
        success: undefined,
    },
    reducers: {

        getUser: (state) => {
            // Get token from local storage and decode it to get the user
            const token = localStorage.getItem("token");
            if (token) {
                const user = jwtDecode(token);
                state.user = user
            }
            else { state.user = null }
        },

        logout: (state) => {
            localStorage.removeItem("token");
            state.user = undefined;
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
            })
            .addCase(verifyToken.fulfilled, () => {
                return
            })
            .addCase(verifyToken.rejected, (state, action) => {
                if (action.payload[0] === "Token expired.") {
                    state.user = null;
                    localStorage.removeItem("token");
                    alert("Session expired. Please login again.");
                }
            })
            .addCase(updateUser.fulfilled, (state, action) => {    
                state.user = action.payload.updatedUser;       
                state.error = null;
                state.success = action.payload.message;

                localStorage.setItem("token", action.payload.newToken);
            })
            .addCase(updateUser.rejected, (state, action) => {
                console.log(action.payload);
                
                state.error = action.payload.message[0];
                state.success = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                console.log(action.payload);
                
                state.user = null;
                localStorage.removeItem("token");
                state.error = null;
                state.success = action.payload.message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                console.log(action.payload);
                
                state.error = action.payload.message;
                state.success = null;
            });
    },
});

export const { getUser, logout } = authSlice.actions;
export default authSlice.reducer;