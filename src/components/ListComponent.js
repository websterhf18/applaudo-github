import React from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";
import { Card, Button, Row } from 'react-bootstrap';
import { HeartFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from '../store/favoritesSlice';

const ListComponent = ({ items, moreItemsLoading, loadMore, hasNextPage, listType }) => {
    const dispatch = useDispatch();
    const width = window.innerWidth;
    const height = window.innerHeight;
    //Functions to build grid
    const ITEM_HEIGHT = 550;
    const generateIndexesForRow = (rowIndex, maxItemsPerRow, itemsAmount) => {
        const result = [];
        const startIndex = rowIndex * maxItemsPerRow;
        for (let i = startIndex; i < Math.min(startIndex + maxItemsPerRow, itemsAmount); i++) {
            result.push(i);
        }
        return result;
    }
    const getMaxItemsAmountPerRow = (width) => {
        return 3;
    }
    const getRowsAmount = (width, itemsAmount, hasMore) => {
        const maxItemsPerRow = getMaxItemsAmountPerRow(width);
        return Math.ceil(itemsAmount/ maxItemsPerRow) + (hasMore ? 1 : 0);
    }
    const itemCount = getRowsAmount(width, items.length, hasNextPage);
    //
    const rowRenderer = ({index, style}) => {
        const maxItemsPerRow = getMaxItemsAmountPerRow(width);
        const itemsIDs = generateIndexesForRow(index, maxItemsPerRow, items.length).map(itemIndex => items[itemIndex]);
        return (
            <Row style={{...style, padding: '20px 0px'}} >
                <div style={{
                    display: 'flex',
                    margin: '0 auto'
                }}>
                    {itemsIDs.map(itemID => {
                        let imageuri;
                        if(itemID.thumbnail){
                            var {extension, path} = itemID.thumbnail;
                            imageuri = path+'/landscape_xlarge.'+extension;
                            if (imageuri.indexOf('https') === -1) {
                                imageuri = imageuri.replace('http', 'https');
                            }
                        }
                        return (
                            <Card 
                            key={itemID.id}
                            style={{ 
                                width: '18rem',
                                margin: '0px 15px',
                                height: ITEM_HEIGHT - 20
                            }}>
                                {listType !== 'stories' ? 
                                    <Card.Img 
                                    width={285}
                                    height={210}
                                    variant="top" src={imageuri} />
                                : null}
                                {listType !== 'stories' ? 
                                    <Card.ImgOverlay>
                                        <Card.Title
                                        className="text-right">
                                            <HeartFill 
                                            onClick={ () => {
                                                dispatch(addFavorite({
                                                    ...itemID, 
                                                    type: listType
                                                }));
                                            }}
                                            color="royalblue" />
                                        </Card.Title>
                                    </Card.ImgOverlay>
                                : null}
                                <Card.Body>
                                    <Card.Title>{listType === 'comics' ||  listType === 'stories' || itemID.type === 'comics' ? itemID.title : itemID.name}</Card.Title>
                                    <Card.Text style={{
                                        maxHeight: 100,
                                        overflow: 'hidden'
                                    }}>
                                    {itemID.description}
                                    </Card.Text>
                                </Card.Body>
                                {listType === 'characters' || itemID.type === 'characters' ?
                                <Card.Body style={{ 
                                    zIndex: 99999
                                }}>
                                        <Link to={`/characters/${itemID.id}`}>
                                            <Button                                         
                                            className="m-2"
                                            variant="primary">View detail</Button>
                                        </Link>
                                </Card.Body>
                                : null}
                                {listType === 'comics' || itemID.type === 'comics' ?
                                <Card.Body style={{ 
                                    zIndex: 99999
                                }}>
                                        <Link to={`/comics/${itemID.id}`}>
                                            <Button                                         
                                            className="m-2"
                                            variant="primary">View detail</Button>
                                        </Link>
                                </Card.Body>
                                : null}
                                {listType === 'stories' ?
                                <Card.Body style={{ 
                                    zIndex: 99999
                                }}>
                                        <Link to={`/stories/characters/${itemID.id}`}>
                                            <Button 
                                            disabled={(itemID.characters.available === 0 ? true: false)}                                           
                                            className="m-2"
                                            variant="primary">View characters</Button>
                                        </Link>
                                        <Link to={`/stories/comics/${itemID.id}`}>
                                            <Button        
                                            disabled={(itemID.comics.available === 0 ? true: false)}                                    
                                            className="m-2"
                                            variant="primary">View comics</Button>
                                        </Link>
                                </Card.Body>
                                : null}
                            </Card>
                        )}
                    )}
                </div>
            </Row>
        )
    };
    return (
        <InfiniteLoader
            isItemLoaded={({index}) => {
                const maxItemsPerRow = getMaxItemsAmountPerRow(width);
                const allItemsLoaded = generateIndexesForRow(index, maxItemsPerRow, items.length).length > 0;
                return !hasNextPage || allItemsLoaded;
            }}
            itemCount={itemCount}
            loadMoreItems={loadMore}
        >
            {({ onItemsRendered, ref }) => (
                <FixedSizeList
                ref={ref}
                height={height}
                width={width}
                itemCount={itemCount}
                itemSize={ITEM_HEIGHT}
                onItemsRendered={onItemsRendered}
                >
                    {rowRenderer}
                </FixedSizeList>
            )}
        </InfiniteLoader>
    )
};

export default ListComponent;