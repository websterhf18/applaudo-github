import React, { useEffect, useState, lazy, Suspense } from 'react';
import { getDetailComics } from '../store/comicsSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container } from 'react-bootstrap';

const DetailComponent = lazy(() => import('../components/DetailComponent'));

export default function ComicsDetail(){
    const { id } = useParams();
    const [ImgUri, setImgUri] = useState(null);
    const dispatch = useDispatch();
    const detailObject = useSelector(({ comics }) => comics.comicsDetail)
    
    //Get data detail
    useEffect(() => {
        dispatch(getDetailComics(id))
    }, [dispatch, id])

    useEffect(() => {
        let imageuri;
        if(detailObject.thumbnail){
            var {extension, path} = detailObject.thumbnail;
            imageuri = path+'/portrait_uncanny.'+extension;
        }
        setImgUri(imageuri)
    }, [detailObject])
    return (
        <Container>
            <Suspense fallback={<p>Cargando...</p>}>
            <DetailComponent 
            dataItem={detailObject}
            imageUri={ImgUri}
            dataType='comics'
            />
            </Suspense>
        </Container>
    )
}