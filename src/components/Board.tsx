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

        //if the piece was dragged over a square
        if(over){
            //checks if its a valid movement
            if(checkMovement(active.name, currentColumn, currentRow, destinationColumn, destinationRow)){
                newPieceBoard[currentColumn][currentRow]= '';
                newPieceBoard[destinationColumn][destinationRow] = active.name;
            }
        }

        setPieceBoard(newPieceBoard)
    }

    function checkMovement(pieceName: string, currentColumn: number, currentRow: number, destinationColumn: number, destinationRow: number){
        const color = pieceName[0];
        const piece = pieceName[1];
        const pieceInDestinationSquare = pieceBoard[destinationColumn][destinationRow];

        //if there is a piece in the destination square
        if(pieceInDestinationSquare){
            //if the destination piece is the same color, don't allow movement
            if (pieceInDestinationSquare[0]==color) return false;
        }

        //pawn
        if(piece=='p'){
            //if the movement is to trade a piece
            if(pieceInDestinationSquare){
                if(destinationRow!=currentRow && Math.abs(destinationColumn-currentColumn)==1 && Math.abs(destinationRow-currentRow)==1){
                    if(color=='w'){
                        if (destinationColumn < currentColumn ) return true;
                        else return false;
                    }
        
                    if(color[0]=='b'){
                        if (destinationColumn > currentColumn) return true;
                        else return false;
                    }
                }

            }
            //if there is no piece, don't allow diagonal movement
            else{
                if(destinationRow==currentRow && Math.abs(destinationColumn-currentColumn)==1){
                    if(color=='w'){
                        if (destinationColumn < currentColumn ) return true;
                        else return false;
                    }
        
                    if(color[0]=='b'){
                        if (destinationColumn > currentColumn) return true;
                        else return false;
                    }
                }
            }
        }

        //rook
        if(piece=='r'){
            if( (destinationColumn!=currentColumn) && (destinationRow==currentRow) ) return true;
            if( (destinationColumn==currentColumn) && (destinationRow!=currentRow) ) return true;
            else return false;
        }

        //bishop
        if(piece=='b'){
            if( (destinationColumn!=currentColumn) && (destinationRow!=currentRow) ){
                if( Math.abs(destinationColumn-currentColumn) == Math.abs(destinationRow-currentRow)){
                    return true;
                }
            } 
            else return false;
        }

        //queen
        if(piece=='q'){
            if( (destinationColumn!=currentColumn) && (destinationRow==currentRow) ) return true;
            if( (destinationColumn==currentColumn) && (destinationRow!=currentRow) ) return true;
            if( (destinationColumn!=currentColumn) && (destinationRow!=currentRow) ){
                if( Math.abs(destinationColumn-currentColumn) == Math.abs(destinationRow-currentRow)){
                    return true;
                }
            } 
            else return false;
        }

        //king
        if(piece=='k'){
            if( Math.abs(destinationColumn-currentColumn)==1 && Math.abs(destinationRow-currentRow)==1) return true;
            else return false;
        }

        //knight
        if(piece=='n'){
            if(Math.abs(destinationRow-currentRow)==2){
                if(Math.abs(destinationColumn-currentColumn)==1) return true
                else return false;
            }
            if(Math.abs(destinationColumn-currentColumn)==2){
                if(Math.abs(destinationRow-currentRow)==1) return true
                else return false;
            }
        }
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
                                    className={
                                        //to get checkered background pattern
                                        (index%2==0) ? 
                                            (squareIndex%2==0) ? 'even' : 'odd' :
                                            (squareIndex%2==0) ? 'odd' : 'even'
                                    } 
                                    content={checkPieceInSquare(square) 
                                        ? <Piece name={checkPieceInSquare(square)} x={squareIndex} y={index}/> 
                                        : <></>}
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
