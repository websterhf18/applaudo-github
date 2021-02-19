import React, { useState, useEffect } from 'react';
import { getMoreComics, updateEmpty } from '../store/storiesSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ListComponent from '../components/ListComponent';

export default function StoriesComics(){
    const { id } = useParams();
    const dispatch = useDispatch();
    //Get data detail
    const dataList = useSelector(({ stories }) => stories.comics)
    const offsetLocal = useSelector(({ stories }) => stories.offset_comics)
    //States
    const [moreItemsLoading] = useState(false);
    const [hasNextPage] = useState(true);

    useEffect(() => {
        dispatch(updateEmpty())
    }, [dispatch])

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