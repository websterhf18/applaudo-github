import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favoritesList: []
    },
    reducers: {
        addFavorite(state, action) {
            if(!state.favoritesList.some(favorite => favorite.id === action.payload.id)){
                state.favoritesList.push(action.payload)
            }
        },
        removeFavorite(state, action) {
            state.favoritesList.filter(id => id !== action.payload);
        },
    },
})
export const { 
    addFavorite, 
    removeFavorite
} = favoritesSlice.actions
export default favoritesSlice.reducer