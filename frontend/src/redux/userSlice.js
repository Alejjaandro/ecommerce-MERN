import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

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

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        error: null,
        success: null,
    },

    reducers: {

        getUser: () => {
            // Get token from local storage and decode it to get the user
            const token = localStorage.getItem("token");
            if (token) {
                const user = jwtDecode(token);                
                return user

            } else {
                return null
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(updateUser.fulfilled, (state, action) => {               
                state.user = action.payload.updatedUser;
                state.error = null;
                state.success = action.payload.message;

                // Update token in local storage
                localStorage.setItem("token", action.payload.newToken);
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload.message[0];
                state.success = null;
            });
    }
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;