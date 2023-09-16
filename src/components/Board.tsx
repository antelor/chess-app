/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const [colorTurn, setColorTurn] = useState('w');

    function handleDragStart(event: any){
        const newPieceBoard = {...pieceBoard};

        //dragged piece
        const active = event.active.data.current;
        const currentColumn = active.y;
        const currentRow = active.x;

        if(active.name[0]!=colorTurn) return;

        //change pieceboard to one where the possible movements have a certain character (a)
        //then on drag end remove the character before starting
        
        //pawn
        if(active.name[0]=='w'){
            if(active.name[1]=='p'){
                newPieceBoard[currentColumn-1][currentRow]+='a';
            }

        }        
        if(active.name[0]=='b'){
            if(active.name[1]=='p'){
                newPieceBoard[currentColumn+1][currentRow]+='a';
            }
        }
        
        //bishop
        if(active.name[1]=='b'){
            //up right side movement
            for(let j = currentColumn-1, i = currentRow+1; j >= 0 && i < 8; j--, i++){
                if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
            }
            //up left side movement
            for(let j = currentColumn-1, i = currentRow-1; j >= 0 && i >= 0; j--, i--){
                if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
            }
            //down right side movement
            for(let j = currentColumn+1, i = currentRow+1; j < 8 && i < 8; j++, i++){
                if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
            }
            //down left side movement
            for(let j = currentColumn+1, i = currentRow-1; j < 8 && i >= 0; j++, i--){
                if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
            }
        }

        //rook
        if(active.name[1]=='r'){
            for(let i = 0; i < 8; i++){
                if(i!==currentRow){
                    newPieceBoard[currentColumn][i]+='a';
                }
                if(i!==currentColumn){
                    newPieceBoard[i][currentRow]+='a';
                }
            }
        }

        //queen
        if(active.name[1]=='q'){
            //diagonals:
            //up right side movement
            for(let j = currentColumn-1, i = currentRow+1; j >= 0 && i < 8; j--, i++){
                if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
            }
            //up left side movement
            for(let j = currentColumn-1, i = currentRow-1; j >= 0 && i >= 0; j--, i--){
                if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
            }
            //down right side movement
            for(let j = currentColumn+1, i = currentRow+1; j < 8 && i < 8; j++, i++){
                if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
            }
            //down left side movement
            for(let j = currentColumn+1, i = currentRow-1; j < 8 && i >= 0; j++, i--){
                if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
            }

            //horizontal and vertical:
            for(let i = 0; i < 8; i++){
                if(i!==currentRow){
                    newPieceBoard[currentColumn][i]+='a';
                }
                if(i!==currentColumn){
                    newPieceBoard[i][currentRow]+='a';
                }
            }
        }
        
        //king
        if(active.name[1]=='k'){
            if(currentColumn==0){
                newPieceBoard[currentColumn+1][currentRow+1]+='a';
                newPieceBoard[currentColumn][currentRow+1]+='a';
                newPieceBoard[currentColumn+1][currentRow]+='a';
                if(currentRow!=0){
                    newPieceBoard[currentColumn][currentRow-1]+='a';
                    newPieceBoard[currentColumn+1][currentRow-1]+='a';
                }
            }
            else if(currentColumn==7){
                newPieceBoard[currentColumn-1][currentRow-1]+='a';
                newPieceBoard[currentColumn-1][currentRow]+='a';
                newPieceBoard[currentColumn][currentRow-1]+='a';
                
                if(currentRow!=7){
                    newPieceBoard[currentColumn-1][currentRow+1]+='a';
                    newPieceBoard[currentColumn][currentRow+1]+='a';
                }
            }
            else{
                newPieceBoard[currentColumn][currentRow+1]+='a';
                newPieceBoard[currentColumn+1][currentRow+1]+='a';
                newPieceBoard[currentColumn+1][currentRow]+='a';
                newPieceBoard[currentColumn-1][currentRow+1]+='a';
                newPieceBoard[currentColumn-1][currentRow]+='a';
                if(currentRow!=0){
                    newPieceBoard[currentColumn-1][currentRow-1]+='a';
                    newPieceBoard[currentColumn][currentRow-1]+='a';
                    newPieceBoard[currentColumn+1][currentRow-1]+='a';
                }
            }
        }

        //knight
        if(active.name[1]=='n'){
            if(currentColumn>=2 && currentRow<=6){
                newPieceBoard[currentColumn-2][currentRow+1]+='a';
            }
            if(currentColumn>=2 && currentRow>=1){
                newPieceBoard[currentColumn-2][currentRow-1]+='a';
            }
            if(currentColumn<=5 && currentRow<=6){
                newPieceBoard[currentColumn+2][currentRow+1]+='a';
            }
            if(currentColumn<=5 && currentRow>=1){
                newPieceBoard[currentColumn+2][currentRow-1]+='a';
            }

            if(currentColumn>=1 && currentRow<=5){
                newPieceBoard[currentColumn-1][currentRow+2]+='a';
            }
            if(currentColumn>=1 && currentRow>=2){
                newPieceBoard[currentColumn-1][currentRow-2]+='a';
            }
            if(currentColumn<=6 && currentRow<=6){
                newPieceBoard[currentColumn+1][currentRow+2]+='a';
            }
            if(currentColumn<=6 && currentRow>=1){
                newPieceBoard[currentColumn+1][currentRow-2]+='a';
            }
        }

        setPieceBoard(newPieceBoard);
    }
    
    function handleDragEnd(event: any) {
        let newPieceBoard = {...pieceBoard};

        //dragged piece
        const active = event.active.data.current
        const currentColumn = active.y;
        const currentRow = active.x;

        //check if the movement was made by the correct color according to turn
        if(colorTurn!=active.name[0]) return false;

        //destination square
        const {over} = event;
        
        //check if the piece was dragged over a square
        if(over){
            const [destinationRow, destinationColumn] = getCoordinatesFromSquareName(over.id)

            //check if its a valid movement
            if(checkMovement(active.name, currentColumn, currentRow, destinationColumn, destinationRow)){
                newPieceBoard[currentColumn][currentRow]= '';
                newPieceBoard[destinationColumn][destinationRow] = active.name;
                newPieceBoard = removeActiveColorFromBoard(newPieceBoard);
                setPieceBoard(newPieceBoard);
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

    function changeTurn(){
        if(colorTurn=='w') setColorTurn('b');
        if(colorTurn=='b') setColorTurn('w');
    }

    function removeActiveColorFromBoard(newPieceBoard: string[][]){
        const pieceBoardArrayFromObject = Object.entries(newPieceBoard);
        const pieceArray = pieceBoardArrayFromObject.map((item) => item[1]);
        
        const newPieceArray = [];
        for (const rowArray of pieceArray){
            const newRow = [];

            for(let row of rowArray){
                row = row.replace("a","");
                newRow.push(row)
            }
            newPieceArray.push(newRow);
        }
        newPieceBoard = {...newPieceArray};

        return newPieceBoard;
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
            if(pieceInDestinationSquare && pieceInDestinationSquare!='a'){
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
