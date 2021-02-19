import React, { useState, lazy, Suspense } from 'react';
import { getMoreStories } from '../store/storiesSlice';
import { useDispatch, useSelector } from "react-redux";

const ListComponent = lazy(() => import('../components/ListComponent'));

export default function Stories(){
    const dispatch = useDispatch();
    const dataList = useSelector(({ stories }) => stories.storiesList)
    const offsetLocal = useSelector(({ stories }) => stories.offset)
    //States
    const [moreItemsLoading] = useState(false);
    const [hasNextPage] = useState(true);
    
    const loadMore = () => {
        dispatch(getMoreStories(offsetLocal)); 
    }
    return (
        <div>
            <Suspense fallback={<p>Cargando...</p>}>
            <ListComponent
            items={dataList}
            moreItemsLoading={moreItemsLoading}
            loadMore={loadMore}
            hasNextPage={hasNextPage}
            listType="stories"
            />
            </Suspense>
        </div>
    )
}