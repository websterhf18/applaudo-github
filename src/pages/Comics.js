import React, { useState, lazy, Suspense } from 'react';
import { getMoreComics } from '../store/comicsSlice';
import { useDispatch, useSelector } from "react-redux";

const ListComponent = lazy(() => import('../components/ListComponent'));
const HeaderFilter = lazy(() => import('../components/HeaderFilter'));

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
            <Suspense fallback={<p>Cargando...</p>}>
                <HeaderFilter 
                listType="comics" />
                <ListComponent
                items={dataList}
                moreItemsLoading={moreItemsLoading}
                loadMore={loadMore}
                hasNextPage={hasNextPage}
                listType="comics"
                />
            </Suspense>
        </div>
    )
}