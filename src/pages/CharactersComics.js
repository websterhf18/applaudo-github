import React, { useState, useEffect, lazy } from 'react';
import { getMoreComics, updateEmpty } from '../store/charactersSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ListComponent = lazy(() => import('../components/ListComponent'));

export default function CharactersComics(){
    const { id } = useParams();
    const dispatch = useDispatch();
    //Get data detail
    const dataList = useSelector(({ characters }) => characters.charactersComics)
    const offsetLocal = useSelector(({ characters }) => characters.offset_comics)
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