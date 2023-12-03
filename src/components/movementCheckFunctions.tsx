function switchCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, activePiece: string){
    switch(activePiece){
        case 'p':
            newPieceBoard = pawnCheck(newPieceBoard, currentColumn, currentRow, activeColor, activePiece);
            break;

        case 'b':
            newPieceBoard = bishopCheck(newPieceBoard, currentColumn, currentRow, activeColor, activePiece);
            break;
        
        case 'r':
            newPieceBoard = rookCheck(newPieceBoard, currentColumn, currentRow, activeColor, activePiece);
            break;

        case 'q':
            newPieceBoard = queenCheck(newPieceBoard, currentColumn, currentRow, activeColor, activePiece);
            break;

        case 'k':
            newPieceBoard = kingCheck(newPieceBoard, currentColumn, currentRow, activeColor, activePiece);
            break;

        case 'n':
            newPieceBoard = knightCheck(newPieceBoard, currentColumn, currentRow, activeColor, activePiece);
            break;

        default:
            break;
    }

    return newPieceBoard;
}

//how checks work:
//change pieceboard to one where the possible movements have a certain character (a)
//then on drag end remove the character before starting

//to-do: don't allow movement to squares you can be eaten
//? add 'b' to squares where you can be eaten

function pawnCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, activePiece: string){
    //pawn
    const upSpace = (currentColumn >= 1 ? newPieceBoard[currentColumn-1][currentRow]: undefined);
    const downSpace = (currentColumn <= 6 ? newPieceBoard[currentColumn+1][currentRow] : undefined);
    const upLeftSpace = (currentColumn >=1 && currentRow>=1 ? newPieceBoard[currentColumn-1][currentRow-1] : undefined);
    const upRightSpace = (currentColumn >=1 && currentRow<=6 ? newPieceBoard[currentColumn-1][currentRow+1] : undefined);
    const downLeftSpace = (currentColumn <= 6 && currentRow<=6 ? newPieceBoard[currentColumn+1][currentRow-1] : undefined);
    const downRightSpace = (currentColumn <= 6 && currentRow<=6 ? newPieceBoard[currentColumn+1][currentRow+1] : undefined);

    if(activeColor=='w' && activePiece=='p'){
        //if up is empty, color it in
        if(upSpace!=undefined && upSpace===''){
            newPieceBoard[currentColumn-1][currentRow]+='a';
        }
        //if it's first turn, 2 spaces
        if(currentColumn===6){
            newPieceBoard[currentColumn-2][currentRow]+='a';
        }

        //if the upLeftSpace contains enemy piece, color it in
        if(upLeftSpace!=undefined && upLeftSpace[0]!=activeColor && upLeftSpace!=''){
            newPieceBoard[currentColumn-1][currentRow-1]+='a';
        }

        //if the upRightSpace contains enemy piece, color it in
        if(upRightSpace!=undefined && upRightSpace[0]!=activeColor && upRightSpace!=''){
            newPieceBoard[currentColumn-1][currentRow+1]+='a';
        }
    }        
    if(activeColor=='b' && activePiece=='p'){
        //if down is empty, color it in
        if(downSpace!=undefined && downSpace===''){
            newPieceBoard[currentColumn+1][currentRow]+='a';
        }
        //if it's first turn, 2 spaces
        if(currentColumn===1){
            newPieceBoard[currentColumn+2][currentRow]+='a';
        }

        //if the downLeftSpace contains enemy piece, color it in
        if(downLeftSpace!=undefined && downLeftSpace[0]!=activeColor && downLeftSpace!=''){
            newPieceBoard[currentColumn+1][currentRow-1]+='a';
        }

        //if the downRightSpace contains enemy piece, color it in
        if(downRightSpace!=undefined && downRightSpace[0]!=activeColor && downRightSpace!=''){
            newPieceBoard[currentColumn+1][currentRow+1]+='a';
        }
    }

    return newPieceBoard;
}

function bishopCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, activePiece: string){
    //bishop
    if(activePiece=='b'){
        //up right side movement
        for(let j = currentColumn-1, i = currentRow+1; j >= 0 && i < 8; j--, i++){
            if(newPieceBoard[j][i]!='a' && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]==activeColor) break;
            if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
            if(newPieceBoard[j][i]!='a' && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]!=activeColor) break;
        }
        //up left side movement
        for(let j = currentColumn-1, i = currentRow-1; j >= 0 && i >= 0; j--, i--){
            if(newPieceBoard[j][i]!='a' && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]==activeColor) break;
            if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
            if(newPieceBoard[j][i]!='a' && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]!=activeColor) break;
        }
        //down right side movement
        for(let j = currentColumn+1, i = currentRow+1; j < 8 && i < 8; j++, i++){
            if(newPieceBoard[j][i]!='a' && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]==activeColor) break;
            if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
            if(newPieceBoard[j][i]!='a' && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]!=activeColor) break;
        }
        //down left side movement
        for(let j = currentColumn+1, i = currentRow-1; j < 8 && i >= 0; j++, i--){
            if(newPieceBoard[j][i]!='a' && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]==activeColor) break;
            if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
            if(newPieceBoard[j][i]!='a' && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]!=activeColor) break;
        }
    }

    return newPieceBoard;
}

function rookCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, activePiece: string){
    //rook
    if(activePiece=='r'){
        //right side check
        for(let j = currentColumn, i = currentRow+1; i <=7; i++){
            if(newPieceBoard[j][i].includes(activeColor)) break;
            if(activeColor==='w'){
                if(newPieceBoard[j][i][0]==='b'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
                else newPieceBoard[j][i]+='a';
            }
            if(activeColor==='b'){
                console.log('a')
                if(newPieceBoard[j][i][0]==='w'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
                else newPieceBoard[j][i]+='a';
            }
            
        }

        //left side check
        for(let j = currentColumn, i = currentRow-1; i >=0; i--){
            if(newPieceBoard[j][i].includes(activeColor)) break;
            if(activeColor==='w'){
                if(newPieceBoard[j][i][0]==='b'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
                else newPieceBoard[j][i]+='a';
            }
            if(activeColor==='b'){
                if(newPieceBoard[j][i][0]==='w'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
                else newPieceBoard[j][i]+='a';
            }
        }

        //top check
        for(let j = currentColumn-1, i = currentRow; j >=0; j--){
            if(newPieceBoard[j][i].includes(activeColor)) break;
            if(activeColor==='w'){
                if(newPieceBoard[j][i][0]==='b'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
                else newPieceBoard[j][i]+='a';
            }
            if(activeColor==='b'){
                if(newPieceBoard[j][i][0]==='w'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
                else newPieceBoard[j][i]+='a';
            }
        }

        //down check
        for(let j = currentColumn+1, i = currentRow; j <=7; j++){
            if(newPieceBoard[j][i].includes(activeColor)) break;
            if(activeColor==='w'){
                if(newPieceBoard[j][i][0]==='b'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
                else newPieceBoard[j][i]+='a';
            }
            if(activeColor==='b'){
                if(newPieceBoard[j][i][0]==='w'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
                else newPieceBoard[j][i]+='a';
            }
        }
    }

    return newPieceBoard;
}

//to-do: castling
function queenCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, activePiece: string){
    //queen
    if(activePiece=='q'){
        //diagonals:
        //up right side movement
        for(let j = currentColumn-1, i = currentRow+1; j >= 0 && i < 8; j--, i++){
            if (newPieceBoard[j][i].includes(activeColor)) break;
            if(activeColor==='w'){
                if(newPieceBoard[j][i][0]==='b'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
            }
            if(activeColor==='b'){
                if(newPieceBoard[j][i][0]==='w'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
            }
            if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
        }
        //up left side movement
        for(let j = currentColumn-1, i = currentRow-1; j >= 0 && i >= 0; j--, i--){
            if (newPieceBoard[j][i].includes(activeColor)) break;
            if(activeColor==='w'){
                if(newPieceBoard[j][i][0]==='b'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
            }
            if(activeColor==='b'){
                if(newPieceBoard[j][i][0]==='w'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
            }
            if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
        }
        //down right side movement
        for(let j = currentColumn+1, i = currentRow+1; j < 8 && i < 8; j++, i++){
            if (newPieceBoard[j][i].includes(activeColor)) break;
            if(activeColor==='w'){
                if(newPieceBoard[j][i][0]==='b'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
            }
            if(activeColor==='b'){
                if(newPieceBoard[j][i][0]==='w'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
            }
            if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
        }
        //down left side movement
        for(let j = currentColumn+1, i = currentRow-1; j < 8 && i >= 0; j++, i--){
            if (newPieceBoard[j][i].includes(activeColor)) break;
            if(activeColor==='w'){
                if(newPieceBoard[j][i][0]==='b'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
            }
            if(activeColor==='b'){
                if(newPieceBoard[j][i][0]==='w'){
                    newPieceBoard[j][i]+='a';
                    break;
                }
            }
            if(!newPieceBoard[j][i].includes('a')) newPieceBoard[j][i]+='a';
        }

        //horizontal and vertical:
        //down
        for(let j = currentColumn+1; j <= 7; j++){
            if (newPieceBoard[j][currentRow].includes(activeColor)) break;
            if(activeColor==='w'){
                if(newPieceBoard[j][currentRow][0]==='b'){
                    newPieceBoard[j][currentRow]+='a';
                    break;
                }
            }
            if(activeColor==='b'){
                if(newPieceBoard[j][currentRow][0]==='w'){
                    newPieceBoard[j][currentRow]+='a';
                    break;
                }
            }
            newPieceBoard[j][currentRow]+='a';
        }

        //up
        for(let j = currentColumn-1; j >= 0; j--){
            if (newPieceBoard[j][currentRow].includes(activeColor)) break;
            if(activeColor==='w'){
                if(newPieceBoard[j][currentRow][0]==='b'){
                    newPieceBoard[j][currentRow]+='a';
                    break;
                }
            }
            if(activeColor==='b'){
                if(newPieceBoard[j][currentRow][0]==='w'){
                    newPieceBoard[j][currentRow]+='a';
                    break;
                }
            }
            newPieceBoard[j][currentRow]+='a';
        }

        //right
        for(let i = currentRow+1; i <= 7; i++){
            if (newPieceBoard[currentColumn][i].includes(activeColor)) break;
            if(activeColor==='w'){
                if(newPieceBoard[currentColumn][i][0]==='b'){
                    newPieceBoard[currentColumn][i]+='a';
                    break;
                }
            }
            if(activeColor==='b'){
                if(newPieceBoard[currentColumn][i][0]==='w'){
                    newPieceBoard[currentColumn][i]+='a';
                    break;
                }
            }
            newPieceBoard[currentColumn][i]+='a';
        }

        //left
        for(let i = currentRow-1; i >= 0; i--){
            if (newPieceBoard[currentColumn][i].includes(activeColor)) break;
            if(activeColor==='w'){
                if(newPieceBoard[currentColumn][i][0]==='b'){
                    newPieceBoard[currentColumn][i]+='a';
                    break;
                }
            }
            if(activeColor==='b'){
                if(newPieceBoard[currentColumn][i][0]==='w'){
                    newPieceBoard[currentColumn][i]+='a';
                    break;
                }
            }
            newPieceBoard[currentColumn][i]+='a';
        }
    }

    return newPieceBoard;
}

function kingCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, activePiece: string){
    if(activePiece=='k'){
        if(currentColumn==0){
                if(!newPieceBoard[currentColumn+1][currentRow+1].includes(activeColor)) newPieceBoard[currentColumn+1][currentRow+1]+='a';
                if(!newPieceBoard[currentColumn][currentRow+1].includes(activeColor)) newPieceBoard[currentColumn][currentRow+1]+='a';
                if(!newPieceBoard[currentColumn+1][currentRow].includes(activeColor))newPieceBoard[currentColumn+1][currentRow]+='a';
                if(currentRow!=0){
                    if(!newPieceBoard[currentColumn][currentRow-1].includes(activeColor)) newPieceBoard[currentColumn][currentRow-1]+='a';
                    if(!newPieceBoard[currentColumn+1][currentRow-1].includes(activeColor)) newPieceBoard[currentColumn+1][currentRow-1]+='a';
                }
        }
        else if(currentColumn==7){
            if(!newPieceBoard[currentColumn-1][currentRow-1].includes(activeColor)) newPieceBoard[currentColumn-1][currentRow-1]+='a';
            if(!newPieceBoard[currentColumn-1][currentRow].includes(activeColor)) newPieceBoard[currentColumn-1][currentRow]+='a';
            if(!newPieceBoard[currentColumn][currentRow-1].includes(activeColor)) newPieceBoard[currentColumn][currentRow-1]+='a';
            
            if(currentRow!=7){
                if(!newPieceBoard[currentColumn-1][currentRow+1].includes(activeColor)) newPieceBoard[currentColumn-1][currentRow+1]+='a';
                if(!newPieceBoard[currentColumn][currentRow+1].includes(activeColor)) newPieceBoard[currentColumn][currentRow+1]+='a';
            }
        }
        else{
            if(!newPieceBoard[currentColumn][currentRow+1].includes(activeColor)) newPieceBoard[currentColumn][currentRow+1]+='a';
            if(!newPieceBoard[currentColumn+1][currentRow+1].includes(activeColor)) newPieceBoard[currentColumn+1][currentRow+1]+='a';
            if(!newPieceBoard[currentColumn+1][currentRow].includes(activeColor)) newPieceBoard[currentColumn+1][currentRow]+='a';
            if(!newPieceBoard[currentColumn-1][currentRow+1].includes(activeColor)) newPieceBoard[currentColumn-1][currentRow+1]+='a';
            if(!newPieceBoard[currentColumn-1][currentRow].includes(activeColor)) newPieceBoard[currentColumn-1][currentRow]+='a';
            if(currentRow!=0){
                if(!newPieceBoard[currentColumn-1][currentRow-1].includes(activeColor)) newPieceBoard[currentColumn-1][currentRow-1]+='a';
                if(!newPieceBoard[currentColumn][currentRow-1].includes(activeColor)) newPieceBoard[currentColumn][currentRow-1]+='a';
                if(!newPieceBoard[currentColumn+1][currentRow-1].includes(activeColor)) newPieceBoard[currentColumn+1][currentRow-1]+='a';
            }
        }
    }

    return newPieceBoard;
}

function knightCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, activePiece: string){
    if(activePiece=='n'){
        //if the space exists and it's not occupied by a friendly piece, it's active
        if(currentColumn>=2 && currentRow<=6 && newPieceBoard[currentColumn-2][currentRow+1][0]!=activeColor){
            newPieceBoard[currentColumn-2][currentRow+1]+='a';
        }
        if(currentColumn>=2 && currentRow>=1 && newPieceBoard[currentColumn-2][currentRow-1][0]!=activeColor){
            newPieceBoard[currentColumn-2][currentRow-1]+='a';
        }
        if(currentColumn<=5 && currentRow<=6 && newPieceBoard[currentColumn+2][currentRow+1][0]!=activeColor){
            newPieceBoard[currentColumn+2][currentRow+1]+='a';
        }
        if(currentColumn<=5 && currentRow>=1 && newPieceBoard[currentColumn+2][currentRow-1][0]!=activeColor){
            newPieceBoard[currentColumn+2][currentRow-1]+='a';
        }
    
        if(currentColumn>=1 && currentRow<=5 && newPieceBoard[currentColumn-1][currentRow+2][0]!=activeColor){
            newPieceBoard[currentColumn-1][currentRow+2]+='a';
        }
        if(currentColumn>=1 && currentRow>=2 && newPieceBoard[currentColumn-1][currentRow-2][0]!=activeColor){
            newPieceBoard[currentColumn-1][currentRow-2]+='a';
        }
        if(currentColumn<=6 && currentRow<=5 && newPieceBoard[currentColumn+1][currentRow+2][0]!=activeColor){
            newPieceBoard[currentColumn+1][currentRow+2]+='a';
        }
        if(currentColumn<=6 && currentRow>=2 && newPieceBoard[currentColumn+1][currentRow-2][0]!=activeColor){
            newPieceBoard[currentColumn+1][currentRow-2]+='a';
        }
    }

    return newPieceBoard;
}

export {switchCheck, pawnCheck, bishopCheck, rookCheck, queenCheck, kingCheck, knightCheck};