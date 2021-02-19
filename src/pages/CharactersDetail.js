import React, { useEffect, useState } from 'react';
import { getDetailCharacter } from '../store/charactersSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import DetailComponent from '../components/DetailComponent';

export default function CharactersDetail(){
    const { id } = useParams();
    const [ImgUri, setImgUri] = useState(null);
    const dispatch = useDispatch();
    const detailObject = useSelector(({ characters }) => characters.charactersDetail)
    
    //Get data detail
    useEffect(() => {
        dispatch(getDetailCharacter(id))
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
            dataType='characters'
            />
        </Container>
    )
}