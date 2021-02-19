import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const DetailComponent = ({ dataItem, imageUri, dataType  }) => {
    return (
        <Row>
            <Col>
                <img 
                alt="Detail component"     
                src={imageUri.indexOf('https') === -1 ? imageUri.replace('http', 'https') : imageUri}/>
            </Col>
            <Col>
                {dataType === 'comics' ?
                <h2>{dataItem.title}</h2>
                : <h2>{dataItem.name}</h2> }
                <p>
                    {dataItem.description}
                </p>
                {dataType === 'comics' ?
                <div>
                    <p>
                        Characters: {dataItem.characters.available}
                    </p>
                    <Link to={`/comics/characters/${dataItem.id}`}>
                        <Button 
                        disabled={(dataItem.characters.available === 0 ? true: false)}                                        
                        className="m-2"
                        variant="primary">Go Characters</Button>
                    </Link>
                    <p>
                        Stories: {dataItem.stories.available}
                    </p>
                    <Link to={`/comics/stories/${dataItem.id}`}>
                        <Button  
                        disabled={(dataItem.stories.available === 0 ? true: false)}                                       
                        className="m-2"
                        variant="primary">Go Stories</Button>
                    </Link>
                </div>
                : null }
                {dataType === 'characters' ?
                <div>
                    <p>
                        Comics: {dataItem.comics.available}
                    </p>
                    <Link to={`/characters/comics/${dataItem.id}`}>
                        <Button                                         
                        className="m-2"
                        variant="primary">Go Comics</Button>
                    </Link>
                    <p>
                        Stories: {dataItem.stories.available}
                    </p>
                    <Link to={`/characters/stories/${dataItem.id}`}>
                        <Button                                         
                        className="m-2"
                        variant="primary">Go Stories</Button>
                    </Link>
                </div>
                : null }
            </Col>
        </Row>
    )
};

export default DetailComponent;