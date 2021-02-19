import React, { useEffect, useState } from 'react';
import { getDetailComics } from '../store/comicsSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container } from 'react-bootstrap';

import DetailComponent from '../components/DetailComponent';

export default function ComicsDetail(){
    const { id } = useParams();
    const [ImgUri, setImgUri] = useState(null);
    const dispatch = useDispatch();
    const detailObject = useSelector(({ comics }) => comics.comicsDetail)
    
    //Get data detail
    useEffect(() => {
        dispatch(getDetailComics(id))
    }, [])

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
            <DetailComponent 
            dataItem={detailObject}
            imageUri={ImgUri}
            dataType='comics'
            />
        </Container>
    )
}