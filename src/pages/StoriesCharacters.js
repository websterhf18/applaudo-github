import React, { useState, useEffect, lazy, Suspense } from 'react';
import { getMoreCharacters, updateEmpty } from '../store/storiesSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ListComponent = lazy(() => import('../components/ListComponent'));

export default function StoriesCharacters(){
    const { id } = useParams();
    const dispatch = useDispatch();
    //Get data detail
    const dataList = useSelector(({ stories }) => stories.characters)
    const offsetLocal = useSelector(({ stories }) => stories.offset_characters)
    //States
    const [moreItemsLoading] = useState(false);
    const [hasNextPage] = useState(true);

    useEffect(() => {
        dispatch(updateEmpty())
    }, [dispatch])

    const loadMore = () => {
        dispatch(getMoreCharacters(id, offsetLocal)); 
    }
    
    return (
        <div>
            <Suspense fallback={<p>Cargando...</p>}>
            <ListComponent
            items={dataList}
            moreItemsLoading={moreItemsLoading}
            loadMore={loadMore}
            hasNextPage={hasNextPage}
            listType="characters"
            />
            </Suspense>
        </div> 
    )
}