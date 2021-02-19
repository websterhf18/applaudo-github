import React, { useState, lazy, Suspense } from 'react';
import { useSelector } from "react-redux";

const ListComponent = lazy(() => import('../components/ListComponent'));

export default function Favorites(){
    const dataList = useSelector(({ favorites }) => favorites.favoritesList)
    //States
    const [moreItemsLoading] = useState(false);
    const [hasNextPage] = useState(true);

    const loadMore = () => {
        //dispatch(getMoreCharacters(offsetLocal)); 
    }
    return (
        <div>
            <Suspense fallback={<p>Cargando...</p>}>
                <ListComponent
                items={dataList}
                moreItemsLoading={moreItemsLoading}
                loadMore={loadMore}
                hasNextPage={hasNextPage}
                listType="favorites"
                />
            </Suspense>
        </div>
        
    )
}