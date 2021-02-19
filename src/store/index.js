import { configureStore } from '@reduxjs/toolkit';

import charactersSlice from './charactersSlice';
import comicsSlice from './comicsSlice';
import storiesSlice from './storiesSlice';

export default configureStore({
  reducer: {
    characters: charactersSlice,
    comics: comicsSlice,
    stories: storiesSlice
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({immutableCheck: false})
})