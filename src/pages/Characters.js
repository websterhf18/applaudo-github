import React, { useState, lazy, Suspense } from 'react';
import { getMoreCharacters } from '../store/charactersSlice';
import { useDispatch, useSelector } from "react-redux";

const ListComponent = lazy(() => import('../components/ListComponent'));

export default function Characters(){
    const dispatch = useDispatch();
    const dataList = useSelector(({ characters }) => characters.charactersList)
    const offsetLocal = useSelector(({ characters }) => characters.offset)
    //States
    const [moreItemsLoading] = useState(false);
    const [hasNextPage] = useState(true);

    const loadMore = () => {
        dispatch(getMoreCharacters(offsetLocal)); 
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