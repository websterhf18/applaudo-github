import React, { useState, useEffect } from 'react';
import { getMoreCharacters, updateEmpty } from '../store/storiesSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ListComponent from '../components/ListComponent';

export default function StoriesCharacters(){
    const { id } = useParams();
    const dispatch = useDispatch();
    //Get data detail
    const dataList = useSelector(({ stories }) => stories.characters)
    const offsetLocal = useSelector(({ stories }) => stories.offset_characters)
    //States
    const [moreItemsLoading, setMoreItemsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    //const detailChar = useSelector(({ comics }) => comics.comicsDetail)

    useEffect(() => {
        dispatch(updateEmpty())
    }, [])

    const loadMore = () => {
        dispatch(getMoreCharacters(id, offsetLocal)); 
    }
    
    return (
        <div>
            <ListComponent
            items={dataList}
            moreItemsLoading={moreItemsLoading}
            loadMore={loadMore}
            hasNextPage={hasNextPage}
            listType="characters"
            />
        </div> 
    )
}