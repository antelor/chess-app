/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';
import Piece from './Piece';
import Square from './Square';
import '../styles/Board.scss';
import {basicBoard, startingPieceBoard} from '../assets/basicBoard';

import {DndContext} from '@dnd-kit/core';


function Board() {
    //board with every piece location info
    const [pieceBoard, setPieceBoard] = useState(startingPieceBoard);
    
    function handleDragEnd(event: any) {
        const newPieceBoard = {...pieceBoard};

        //dragged piece
        const active = event.active.data.current
        const currentColumn = active.y;
        const currentRow = active.x;

        //destination square
        const {over} = event;
        const [destinationRow, destinationColumn] = getCoordinatesFromSquareName(over.id)

        if(over){
            //check if the destination square is occupied
            if(newPieceBoard[destinationColumn][destinationRow]==''){
                newPieceBoard[currentColumn][currentRow]= '';
                newPieceBoard[destinationColumn][destinationRow] = active.name;
            }
        }

        setPieceBoard(newPieceBoard)
    }

    function checkPieceInSquare(square: string){
        const [row, column] = getCoordinatesFromSquareName(square)

        if(pieceBoard[column][row] != '') return pieceBoard[column][row];
        else return null;
    }

    function getCoordinatesFromSquareName(square: string){
        const row = square.charCodeAt(0)-97;
        const column = Math.abs(parseInt(square[1])-8);

        return [row, column]
    }

    return (
        <>
            <div className='Board'>
                <DndContext onDragEnd={handleDragEnd}>
                    {basicBoard.map((row, index) => (
                        <div className='BoardRow' key={index}>
                            {row.map((square, squareIndex) => 
                                <Square 
                                    key={square} 
                                    id={square} 
                                    content={checkPieceInSquare(square) 
                                        ? <Piece name={checkPieceInSquare(square)} x={squareIndex} y={index}/> 
                                        : <span>{square}</span>}
                                />
                            )}
                        </div>
                    ))}
                </DndContext>
            </div>
            
        </>
    )
}

export default Board
