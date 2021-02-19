import React, { useState, useEffect } from 'react';
import { getMoreComics, updateEmpty, setOffsetComics } from '../store/charactersSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ListComponent from '../components/ListComponent';

export default function CharactersComics(){
    const { id } = useParams();
    const dispatch = useDispatch();
    //Get data detail
    const dataList = useSelector(({ characters }) => characters.charactersComics)
    const offsetLocal = useSelector(({ characters }) => characters.offset_comics)
    //States
    const [moreItemsLoading, setMoreItemsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    const detailChar = useSelector(({ characters }) => characters.charactersDetail)

    useEffect(() => {
        dispatch(updateEmpty())
    }, [detailChar])

    const loadMore = () => {
        dispatch(getMoreComics(id, offsetLocal)); 
    }
    
    return (
        <div>
            <ListComponent
            items={dataList}
            moreItemsLoading={moreItemsLoading}
            loadMore={loadMore}
            hasNextPage={hasNextPage}
            listType="comics"
            />
        </div> 
    )
}