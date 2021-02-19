import React, { useState, useEffect, lazy } from 'react';
import { getMoreStories, updateEmpty } from '../store/comicsSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ListComponent = lazy(() => import('../components/ListComponent'));

export default function ComicsStories(){
    const { id } = useParams();
    const dispatch = useDispatch();
    //Get data detail
    const dataList = useSelector(({ comics }) => comics.stories)
    const offsetLocal = useSelector(({ comics }) => comics.offset_stories)
    //States
    const [moreItemsLoading] = useState(false);
    const [hasNextPage] = useState(true);

    useEffect(() => {
        dispatch(updateEmpty())
    }, [dispatch])

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