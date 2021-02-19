import React, { useState, useEffect } from 'react';
import { getMoreStories, updateEmpty } from '../store/charactersSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ListComponent from '../components/ListComponent';

export default function CharactersStories(){
    const { id } = useParams();
    const dispatch = useDispatch();
    //Get data detail
    const dataList = useSelector(({ characters }) => characters.charactersStories)
    const offsetLocal = useSelector(({ characters }) => characters.offset_stories)
    //States
    const [moreItemsLoading, setMoreItemsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    const detailChar = useSelector(({ characters }) => characters.charactersDetail)

    useEffect(() => {
        dispatch(updateEmpty())
    }, [detailChar])

    const loadMore = () => {
        dispatch(getMoreStories(id, offsetLocal)); 
    }
    
    return (
        <div>
            <ListComponent
            items={dataList}
            moreItemsLoading={moreItemsLoading}
            loadMore={loadMore}
            hasNextPage={hasNextPage}
            listType="stories"
            />
        </div> 
    )
}