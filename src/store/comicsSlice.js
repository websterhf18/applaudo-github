import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { MARVEL_API, COMICS_URL, MARVEL_API_KEY, CHARACTERS_URL, STORIES_URL } from '../utils/constants';

export const getMoreComics = (offset = 0) => async (dispatch) => {
    try {
        const result = await axios.get(MARVEL_API+COMICS_URL+'?offset='+offset+'&apikey='+MARVEL_API_KEY);
        dispatch(setOffset(result.data.data.count));
        dispatch(addMoreComics(result.data.data.results));
    } catch (error) {
        return false;
    }
}
export const getDetailComics = (id = null) => async (dispatch) => {
    try {
        const result = await axios.get(MARVEL_API+COMICS_URL+'/'+id+'?apikey='+MARVEL_API_KEY);
        dispatch(updateDetailComics(result.data.data.results[0]));
    } catch (error) {
        return false;
    }
}

export const getMoreCharacters = (id = null, offset = 0) => async (dispatch) => {
    try {
        const result = await axios.get(MARVEL_API+COMICS_URL+'/'+id+CHARACTERS_URL+'?offset='+offset+'&apikey='+MARVEL_API_KEY);
        dispatch(setOffsetCharacters(result.data.data.count));
        dispatch(updateCharacters(result.data.data.results));
    } catch (error) {
        return false;
    }
}

export const getMoreStories = (id = null, offset = 0) => async (dispatch) => {
    try {
        const result = await axios.get(MARVEL_API+COMICS_URL+'/'+id+STORIES_URL+'?offset='+offset+'&apikey='+MARVEL_API_KEY);
        dispatch(setOffsetStories(result.data.data.count));
        dispatch(updateStories(result.data.data.results));
    } catch (error) {
        return false;
    }
}


const comicsSlice = createSlice({
    name: 'comics',
    initialState: {
        comicsList: [],
        characters: [],
        stories: [],
        offset: 0,
        offset_characters: 0,
        offset_stories: 0,
        comicsDetail: {
            id: null,
            title: null,
            description: null,
            characters: {
                available: 0
            },
            stories: {
                available: 0
            }
        },
    },
    reducers: {
        updateComics(state, action) {
            state.comicsList = action.payload;
        },
        addMoreComics(state, action) {
            state.comicsList = [...state.comicsList, ...action.payload];
        },
        setOffset(state, action) {
            state.offset += action.payload;
        },
        updateDetailComics(state, action) {
            state.comicsDetail = action.payload;
        },
        setOffsetCharacters(state, action) {
            state.offset_characters += action.payload;
        },
        setOffsetStories(state, action) {
            state.offset_stories += action.payload;
        },
        updateEmpty(state) {
            state.offset_characters = 0;
            state.characters = [];
            state.offset_stories = 0;
            state.stories = [];
        },
        updateCharacters(state, action) {
            state.characters = [...state.characters, ...action.payload];
        },
        updateStories(state, action) {
            state.stories = [...state.stories, ...action.payload];
        },
    },
})
export const { 
    updateComics, 
    addMoreComics, 
    setOffset, 
    updateDetailComics, 
    setOffsetCharacters,
    setOffsetStories,
    updateEmpty,
    updateCharacters,
    updateStories } = comicsSlice.actions
export default comicsSlice.reducer