import React, { useEffect, useState, lazy, Suspense } from 'react';
import { getDetailCharacter } from '../store/charactersSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container } from 'react-bootstrap';

const DetailComponent = lazy(() => import('../components/DetailComponent'));

export default function CharactersDetail(){
    const { id } = useParams();
    const [ImgUri, setImgUri] = useState(null);
    const dispatch = useDispatch();
    const detailObject = useSelector(({ characters }) => characters.charactersDetail)
    
    //Get data detail
    useEffect(() => {
        dispatch(getDetailCharacter(id))
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
            dataType='characters'
            />
            </Suspense>
        </Container>
    )
}