import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {

        getUser: (state) => {
            const user = JSON.parse(localStorage.getItem("user"));
            
            if (user) {return user} 
            else {return null}
        },

        login: (state, action) => {
            const user = action.payload;
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        },
        
        register: (state, action) => {
            const user = action.payload;
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        },

        logout: (state) => {
            localStorage.removeItem("user");
            return null;
        },
    },
});

export const { getUser, login, register, logout } = userSlice.actions;
export default userSlice.reducer;