import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { MARVEL_API, STORIES_URL, CHARACTERS_URL, MARVEL_API_KEY, COMICS_URL } from '../utils/constants';

export const getMoreStories = (offset = 0) => async (dispatch) => {
    try {
        const result = await axios.get(MARVEL_API+STORIES_URL+'?offset='+offset+'&apikey='+MARVEL_API_KEY);
        dispatch(setOffset(result.data.data.count));
        dispatch(addMoreStories(result.data.data.results));
    } catch (error) {
        return false;
    }
}
export const getMoreCharacters = (id = null, offset = 0) => async (dispatch) => {
    try {
        const result = await axios.get(MARVEL_API+STORIES_URL+'/'+id+CHARACTERS_URL+'?offset='+offset+'&apikey='+MARVEL_API_KEY);
        dispatch(setOffsetCharacters(result.data.data.count));
        dispatch(updateCharacters(result.data.data.results));
    } catch (error) {
        return false;
    }
}
export const getMoreComics = (id = null, offset = 0) => async (dispatch) => {
    try {
        const result = await axios.get(MARVEL_API+STORIES_URL+'/'+id+COMICS_URL+'?offset='+offset+'&apikey='+MARVEL_API_KEY);
        dispatch(setOffsetComics(result.data.data.count));
        dispatch(updateComics(result.data.data.results));
    } catch (error) {
        return false;
    }
}

const storiesSlice = createSlice({
    name: 'stories',
    initialState: {
        storiesList: [],
        characters: [],
        comics: [],
        offset: 0, 
        offset_characters: 0, 
        offset_comics: 0 
    },
    reducers: {
        updateStories(state, action) {
            state.storiesList = action.payload;
        },
        addMoreStories(state, action) {
            state.storiesList = [...state.storiesList, ...action.payload];
        },
        setOffset(state, action) {
            state.offset += action.payload;
        },
        setOffsetCharacters(state, action) {
            state.offset_characters += action.payload;
        },
        setOffsetComics(state, action) {
            state.offset_comics += action.payload;
        },
        updateEmpty(state) {
            state.offset_characters = 0;
            state.characters = [];
            state.offset_comics = 0;
            state.comics = [];
        },
        updateCharacters(state, action) {
            state.characters = [...state.characters, ...action.payload];
        },
        updateComics(state, action) {
            state.comics = [...state.comics, ...action.payload];
        },
        
    },
})
export const { 
    updateStories, 
    addMoreStories, 
    setOffset,
    setOffsetCharacters,
    setOffsetComics,
    updateEmpty,
    updateCharacters,
    updateComics 
} = storiesSlice.actions
export default storiesSlice.reducer