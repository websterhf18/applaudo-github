import React, { useState, lazy } from 'react';
import { getMoreComics } from '../store/comicsSlice';
import { useDispatch, useSelector } from "react-redux";

const ListComponent = lazy(() => import('../components/ListComponent'));

export default function Comics(){
    const dispatch = useDispatch();
    const dataList = useSelector(({ comics }) => comics.comicsList)
    const offsetLocal = useSelector(({ comics }) => comics.offset)
    //States
    const [moreItemsLoading] = useState(false);
    const [hasNextPage] = useState(true);
    
    const loadMore = () => {
        dispatch(getMoreComics(offsetLocal)); 
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