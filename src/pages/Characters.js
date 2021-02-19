import React, { useState } from 'react';
import { getMoreCharacters } from '../store/charactersSlice';
import { useDispatch, useSelector } from "react-redux";
import ListComponent from '../components/ListComponent';

export default function Characters(){
    const dispatch = useDispatch();
    const dataList = useSelector(({ characters }) => characters.charactersList)
    const offsetLocal = useSelector(({ characters }) => characters.offset)
    //States
    const [moreItemsLoading, setMoreItemsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    const loadMore = () => {
        dispatch(getMoreCharacters(offsetLocal)); 
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