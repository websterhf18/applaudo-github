import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { MARVEL_API, CHARACTERS_URL, COMICS_URL, STORIES_URL, MARVEL_API_KEY } from '../utils/constants';

export const getMoreCharacters = (offset = 0) => async (dispatch) => {
    try {
        const result = await axios.get(MARVEL_API+CHARACTERS_URL+'?offset='+offset+'&apikey='+MARVEL_API_KEY);
        dispatch(setOffset(result.data.data.count));
        dispatch(addMoreCharacters(result.data.data.results));
    } catch (error) {
        return false;
    }
}
export const getMoreComics = (id = null, offset = 0) => async (dispatch) => {
    try {
        const result = await axios.get(MARVEL_API+CHARACTERS_URL+'/'+id+COMICS_URL+'?offset='+offset+'&apikey='+MARVEL_API_KEY);
        dispatch(setOffsetComics(result.data.data.count));
        dispatch(updateComics(result.data.data.results));
    } catch (error) {
        return false;
    }
}
export const getMoreStories = (id = null, offset = 0) => async (dispatch) => {
    try {
        const result = await axios.get(MARVEL_API+CHARACTERS_URL+'/'+id+STORIES_URL+'?offset='+offset+'&apikey='+MARVEL_API_KEY);
        dispatch(setOffsetStories(result.data.data.count));
        dispatch(updateStories(result.data.data.results));
    } catch (error) {
        return false;
    }
}
export const getDetailCharacter = (id = null) => async (dispatch) => {
    try {
        const result = await axios.get(MARVEL_API+CHARACTERS_URL+'/'+id+'?apikey='+MARVEL_API_KEY);
        dispatch(updateDetailCharacters(result.data.data.results[0]));
    } catch (error) {
        return false;
    }
}

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        charactersList: [],
        charactersComics: [],
        charactersStories: [],
        charactersDetail: {
            id: null,
            name: null,
            description: null,
            comics: {
                available: 0
            },
            stories: {
                available: 0
            }
        },
        offset: 0,
        offset_comics: 0,
        offset_stories: 0
    },
    reducers: {
        updateCharacters(state, action) {
            state.charactersList = action.payload;
        },
        updateDetailCharacters(state, action) {
            state.charactersDetail = action.payload;
        },
        updateEmpty(state) {
            state.offset_comics = 0;
            state.charactersComics = [];
            state.offset_stories = 0;
            state.charactersStories = [];
        },
        updateComics(state, action) {
            state.charactersComics = [...state.charactersComics, ...action.payload];
        },
        updateStories(state, action) {
            state.charactersStories = [...state.charactersStories, ...action.payload];
        },
        addMoreCharacters(state, action) {
            state.charactersList = [...state.charactersList, ...action.payload];
        },
        setOffset(state, action) {
            state.offset += action.payload;
        },
        setOffsetComics(state, action) {
            state.offset_comics += action.payload;
        },
        setOffsetStories(state, action) {
            state.offset_stories += action.payload;
        },
    },
})
export const { updateCharacters, 
    setOffset, 
    setOffsetComics, 
    addMoreCharacters, 
    updateDetailCharacters, 
    updateComics, 
    updateEmpty,
    updateStories,
    setOffsetStories
} = charactersSlice.actions
export default charactersSlice.reducer