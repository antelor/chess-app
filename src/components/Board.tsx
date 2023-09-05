import {useState} from 'react';
import Piece from './Piece';
import Square from './Square';
import '../styles/Board.scss';
import {basicBoard} from '../assets/basicBoard';

import {DndContext} from '@dnd-kit/core';


function Board() {
    const [board, setBoard] = useState(basicBoard);

    const [parent, setParent] = useState(null);
    
    function handleDragEnd(event) {
        const {over} = event;
    
        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
    }

    return (
        <>
            <div className='Board'>
                <DndContext onDragEnd={handleDragEnd}>
                    {parent === null ? <Piece name="a" parent=''/> : null}

                    {board.map((row, index) => (
                        <div className='BoardRow' key={index}>
                            {row.map((square) => 
                                <Square 
                                    key={square} 
                                    id={square} 
                                    content={parent === square 
                                        ? <Piece name="a" parent={parent}/> 
                                        : square}
                                />
                            )}
                        </div>
                    ))}

                    {
                    /*
                    {board.map( (row, index) => <div className='BoardRow' key={index}>
                        {row.map( (square, rowIndex) =>
                            <Square 
                            key={rowIndex}
                            />
                        )}
                        </div>)}*/}
                </DndContext>
            </div>
            
        </>
    )
}

export default Board
