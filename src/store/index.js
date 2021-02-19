import { configureStore } from '@reduxjs/toolkit';

import {loadState, saveState} from '../utils/localStorage';

import charactersSlice from './charactersSlice';
import comicsSlice from './comicsSlice';
import storiesSlice from './storiesSlice';
import favoritesSlice from './favoritesSlice';

const initialState = loadState();

const store = configureStore({
    initialState,
    reducer: {
        characters: charactersSlice,
        comics: comicsSlice,
        stories: storiesSlice,
        favorites: favoritesSlice 
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({immutableCheck: false})
})
store.subscribe(() => {
    saveState({
        favorites: store.getState().favorites.favoritesList,
    });
});

export default store;