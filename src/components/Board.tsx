/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';
import Piece from './Piece';
import Square from './Square';
import '../styles/Board.scss';
import {basicBoard, startingPieceBoard} from '../assets/basicBoard';
import {switchCheck, checkmate} from './movementCheckFunctions';

import {DndContext} from '@dnd-kit/core';

function Board() {
    //board with every piece location info
    const [pieceBoard, setPieceBoard] = useState(startingPieceBoard);
    const [colorTurn, setColorTurn] = useState('w');
    const [turnNumber, setTurnNumber] = useState(0);
    const [winState, setWinState] = useState('');

    function handleDragStart(event: any){
        let newPieceBoard = {...pieceBoard};

        //dragged piece
        const active = event.active.data.current;
        const currentColumn = active.y;
        const currentRow = active.x;
        const activeColor = active.name[0];
        const activePiece = active.name[1];

        //check if the movement was made by the correct color according to turn
        if(activeColor!=colorTurn) return;

        newPieceBoard = switchCheck(newPieceBoard, currentColumn, currentRow, activeColor, activePiece, 'a');

        setPieceBoard(newPieceBoard);
    }
    
    function handleDragEnd(event: any) {
        let newPieceBoard = {...pieceBoard};
        
        //dragged piece
        const active = event.active.data.current
        const currentColumn = active.y;
        const currentRow = active.x;
        const activeColor = active.name[0];
        
        //check if the movement was made by the correct color according to turn
        if(colorTurn!=activeColor) return false;
        
        //destination square
        const {over} = event;
        
        //check if the piece was dragged over a square
        if(over){
            const [destinationRow, destinationColumn] = getCoordinatesFromSquareName(over.id)
            
            ////castling
            newPieceBoard = checkCastling(pieceBoard, activeColor, destinationColumn, destinationRow, )

            //check if its a valid movement
            if(checkMovement(active.name, destinationColumn, destinationRow)){
                newPieceBoard[currentColumn][currentRow]= '';
                newPieceBoard[destinationColumn][destinationRow] = active.name;
                newPieceBoard = removeActiveColorFromBoard(newPieceBoard);
                setPieceBoard(newPieceBoard);

                //check if checkmate
                if(checkmate(newPieceBoard, activeColor)) {
                    setWinState('a');
                    console.log(winState);
                    console.log('checkmate');
                }
                
                changeTurn();
                
                return true;
            }
            else{
                newPieceBoard = removeActiveColorFromBoard(newPieceBoard);
                setPieceBoard(newPieceBoard);        
                return false;
            }
        }
        else{
            newPieceBoard = removeActiveColorFromBoard(newPieceBoard);
            setPieceBoard(newPieceBoard);    
            return false;
        }
    }


    function checkMovement(pieceName: string, destinationColumn: number, destinationRow: number){
        const color = pieceName[0];
        const destinationSquare = pieceBoard[destinationColumn][destinationRow];

        //if there is a piece in the destination square
        if(destinationSquare){
            //if the destination piece is the same color, don't allow movement
            if (destinationSquare[0]==color) return false;
        }

        //all square is active, movement is allowed
        if(destinationSquare.includes('a')) return true;
        else return false;
    }

    function checkCastling(pieceBoard: string[][], activeColor: string, destinationColumn: number, destinationRow: number){
        const newPieceBoard = {...pieceBoard};
        //white left side castling
        if(activeColor==='w' && destinationColumn===7 && destinationRow===0 && pieceBoard[7][3]==='wq' && pieceBoard[7][0]==='wr' && pieceBoard[7][1]==='a' && pieceBoard[7][2]==='a'){
            newPieceBoard[7][3]='';
            newPieceBoard[7][0]='';
            newPieceBoard[7][1]='wq';
            newPieceBoard[7][2]='wr';
        }
        //white right side castling
        if(activeColor==='w' && destinationColumn===7 && destinationRow===7 && pieceBoard[7][3]==='wq' && pieceBoard[7][7]==='wr' && pieceBoard[7][5]==='a' && pieceBoard[7][6]==='a' && pieceBoard[7][4]==='a'){
            newPieceBoard[7][3]='';
            newPieceBoard[7][7]='';
            newPieceBoard[7][6]='wq';
            newPieceBoard[7][5]='wr';
        }

        //black left side castling
        if(activeColor==='b' && destinationColumn===0 && destinationRow===0 && pieceBoard[0][3]==='bq' && pieceBoard[0][0]==='br' && pieceBoard[0][1]==='a' && pieceBoard[0][2]==='a'){
            newPieceBoard[0][3]='';
            newPieceBoard[0][0]='';
            newPieceBoard[0][1]='bq';
            newPieceBoard[0][2]='br';
        }
        //black right side castling
        if(activeColor==='b' && destinationColumn===0 && destinationRow===7 && pieceBoard[0][3]==='bq' && pieceBoard[0][7]==='br' && pieceBoard[0][5]==='a' && pieceBoard[0][6]==='a' && pieceBoard[0][4]==='a'){
            newPieceBoard[0][3]='';
            newPieceBoard[0][7]='';
            newPieceBoard[0][6]='bq';
            newPieceBoard[0][5]='br';
        }

        return newPieceBoard;
    }
    
    function changeTurn(){
        if(colorTurn=='w') setColorTurn('b');
        if(colorTurn=='b') setColorTurn('w');
        const newTurnNumber=turnNumber+1;
        setTurnNumber(newTurnNumber);
    }

    //removes all 'a's from the board
    function removeActiveColorFromBoard(newPieceBoard: string[][]){
        const pieceBoardArrayFromObject = Object.entries(newPieceBoard);
        const pieceArray = pieceBoardArrayFromObject.map((item) => item[1]);
        
        const newPieceArray = [];
        for (const rowArray of pieceArray){
            const newRow = [];

            for(let row of rowArray){
                row = row.replace(/a/g,"");
                newRow.push(row)
            }
            newPieceArray.push(newRow);
        }
        newPieceBoard = {...newPieceArray};

        return newPieceBoard;
    }

    function checkPieceInSquare(square: string){
        const [row, column] = getCoordinatesFromSquareName(square)

        if(pieceBoard[column][row] != '' && pieceBoard[column][row] != 'a') return pieceBoard[column][row];
        else return null;
    }

    function getCoordinatesFromSquareName(square: string){
        const row = square.charCodeAt(0)-97;
        const column = Math.abs(parseInt(square[1])-8);

        return [row, column]
    }

    function getSquareClassName(square: string, index: number, squareIndex: number){
        let squareClass = "";
        
        //to get checkered background pattern
        ((index%2==0) ? 
        (squareIndex%2==0) ? squareClass+='even' : squareClass+='odd' :
        (squareIndex%2==0) ? squareClass+='odd' : squareClass+='even');
        
        const pieceInSquare = checkPieceInSquare(square);
        const [squareX, squareY] = getCoordinatesFromSquareName(square);

        //if active
        if(pieceInSquare!=null && pieceInSquare.length == 3){
            (pieceInSquare[2] == 'a') ? squareClass+=' squareActive' : "";
        }
        else{
            (pieceBoard[squareY][squareX] == "a") ? squareClass+=' squareActive' : "";
        }

        return squareClass
    }

    return (
        <>
            <div className='Board'>
                <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                    {basicBoard.map((row, index) => (
                        <div className='BoardRow' key={index}>

                            {row.map((square, squareIndex) =>
                                {const squareClass = getSquareClassName(square, index, squareIndex)
                                
                                return <Square 
                                    key={square} 
                                    id={square}
                                    className={ squareClass} 
                                    >
                                        {checkPieceInSquare(square) 
                                            ? <Piece name={checkPieceInSquare(square)} x={squareIndex} y={index}/> 
                                            : <></>}
                                    </Square>
                                }
                            )}
                        </div>
                    ))}
                </DndContext>
            </div>
            
        </>
    )
}

export default Board
