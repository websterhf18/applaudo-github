import React, { useState } from 'react';
import { getMoreStories } from '../store/storiesSlice';
import { useDispatch, useSelector } from "react-redux";
import ListComponent from '../components/ListComponent';

export default function Stories(){
    const dispatch = useDispatch();
    const dataList = useSelector(({ stories }) => stories.storiesList)
    const offsetLocal = useSelector(({ stories }) => stories.offset)
    //States
    const [moreItemsLoading, setMoreItemsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    
    const loadMore = () => {
        dispatch(getMoreStories(offsetLocal)); 
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