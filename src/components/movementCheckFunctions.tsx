import { removeActiveColorFromBoard } from "./boardFunctions";

function switchCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, activePiece: string, state: string){
    switch(activePiece){
        case 'p':
            newPieceBoard = pawnCheck(newPieceBoard, currentColumn, currentRow, activeColor, state);
            break;
            
        case 'b':
            newPieceBoard = bishopCheck(newPieceBoard, currentColumn, currentRow, activeColor, state);
            break;
    
        case 'r':
            newPieceBoard = rookCheck(newPieceBoard, currentColumn, currentRow, activeColor, state);
            break;

        case 'q':
            newPieceBoard = queenCheck(newPieceBoard, currentColumn, currentRow, activeColor, state);
            break;

        case 'k':
            //to prevent infinite checks
            if(state==='a') newPieceBoard = kingCheck(newPieceBoard, currentColumn, currentRow, activeColor, 'c');
            break;

        case 'n':
            newPieceBoard = knightCheck(newPieceBoard, currentColumn, currentRow, activeColor, state);
            break;

        default:
            break;
    }

    return newPieceBoard;
}

//how checks work:
//change pieceboard to one where the possible movements have a certain character (a)
//then on drag end remove the character before starting


function pawnCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, state: string){
    const upSpace = (currentColumn >= 1 ? newPieceBoard[currentColumn-1][currentRow]: undefined);
    const downSpace = (currentColumn <= 6 ? newPieceBoard[currentColumn+1][currentRow] : undefined);
    const upLeftSpace = (currentColumn >=1 && currentRow>=1 ? newPieceBoard[currentColumn-1][currentRow-1] : undefined);
    const upRightSpace = (currentColumn >=1 && currentRow<=6 ? newPieceBoard[currentColumn-1][currentRow+1] : undefined);
    const downLeftSpace = (currentColumn <= 6 && currentRow<=6 ? newPieceBoard[currentColumn+1][currentRow-1] : undefined);
    const downRightSpace = (currentColumn <= 6 && currentRow<=6 ? newPieceBoard[currentColumn+1][currentRow+1] : undefined);

    if(activeColor=='w'){
        //if up is empty, color it in
        if(upSpace!=undefined && upSpace===''){
            newPieceBoard[currentColumn-1][currentRow]+=state;
        }
        //if it's first turn, 2 spaces
        if(currentColumn===6){
            newPieceBoard[currentColumn-2][currentRow]+=state;
        }

        //if the upLeftSpace contains enemy piece, color it in
        if(upLeftSpace!=undefined && upLeftSpace[0]!=activeColor && upLeftSpace!=''){
            newPieceBoard[currentColumn-1][currentRow-1]+=state;
        }

        //if the upRightSpace contains enemy piece, color it in
        if(upRightSpace!=undefined && upRightSpace[0]!=activeColor && upRightSpace!=''){
            newPieceBoard[currentColumn-1][currentRow+1]+=state;
        }
    }        
    if(activeColor=='b'){
        //if down is empty, color it in
        if(downSpace!=undefined && downSpace===''){
            newPieceBoard[currentColumn+1][currentRow]+=state;
        }
        //if it's first turn, 2 spaces
        if(currentColumn===1){
            newPieceBoard[currentColumn+2][currentRow]+=state;
        }

        //if the downLeftSpace contains enemy piece, color it in
        if(downLeftSpace!=undefined && downLeftSpace[0]!=activeColor && downLeftSpace!=''){
            newPieceBoard[currentColumn+1][currentRow-1]+=state;
        }

        //if the downRightSpace contains enemy piece, color it in
        if(downRightSpace!=undefined && downRightSpace[0]!=activeColor && downRightSpace!=''){
            newPieceBoard[currentColumn+1][currentRow+1]+=state;
        }
    }

    return newPieceBoard;
}

function bishopCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, state: string){
    //up right side movement
    for(let j = currentColumn-1, i = currentRow+1; j >= 0 && i < 8; j--, i++){
        if(newPieceBoard[j][i]!=state && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]==activeColor) break; //friendly space
        if(!newPieceBoard[j][i].includes(state)) newPieceBoard[j][i]+=state;                                    //if not already tagged, tag
        if(newPieceBoard[j][i]!=state && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]!=activeColor) break;
    }
    //up left side movement
    for(let j = currentColumn-1, i = currentRow-1; j >= 0 && i >= 0; j--, i--){
        if(newPieceBoard[j][i]!=state && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]==activeColor) break; //friendly space
        if(!newPieceBoard[j][i].includes(state)) newPieceBoard[j][i]+=state;                                    //if not already tagged, tag
        if(newPieceBoard[j][i]!=state && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]!=activeColor) break;
    }
    //down right side movement
    for(let j = currentColumn+1, i = currentRow+1; j < 8 && i < 8; j++, i++){
        if(newPieceBoard[j][i]!=state && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]==activeColor) break; //friendly space
        if(!newPieceBoard[j][i].includes(state)) newPieceBoard[j][i]+=state;                                    //if not already tagged, tag
        if(newPieceBoard[j][i]!=state && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]!=activeColor) break; //not tagged, not empty, not active color
    }
    //down left side movement
    for(let j = currentColumn+1, i = currentRow-1; j < 8 && i >= 0; j++, i--){
        if(newPieceBoard[j][i]!=state && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]==activeColor) break; //friendly space
        if(!newPieceBoard[j][i].includes(state)) newPieceBoard[j][i]+=state;                                    //if not already tagged, tag
        if(newPieceBoard[j][i]!=state && newPieceBoard[j][i]!='' && newPieceBoard[j][i][0]!=activeColor) break;
    }

    return newPieceBoard;
}

function rookCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, state: string){
    //right side check
    for(let j = currentColumn, i = currentRow+1; i <=7; i++){
        if(newPieceBoard[j][i].includes(activeColor)) break;
        if(activeColor==='w'){
            if(newPieceBoard[j][i][0]==='b'){
                newPieceBoard[j][i]+=state;
                break;
            }
            else newPieceBoard[j][i]+=state;
        }
        if(activeColor==='b'){
            if(newPieceBoard[j][i][0]==='w'){
                newPieceBoard[j][i]+=state;
                break;
            }
            else newPieceBoard[j][i]+=state;
        }
        
    }

    //left side check
    for(let j = currentColumn, i = currentRow-1; i >=0; i--){
        if(newPieceBoard[j][i].includes(activeColor)) break;
        if(activeColor==='w'){
            if(newPieceBoard[j][i][0]==='b'){
                newPieceBoard[j][i]+=state;
                break;
            }
            else newPieceBoard[j][i]+=state;
        }
        if(activeColor==='b'){
            if(newPieceBoard[j][i][0]==='w'){
                newPieceBoard[j][i]+=state;
                break;
            }
            else newPieceBoard[j][i]+=state;
        }
    }

    //top check
    for(let j = currentColumn-1, i = currentRow; j >=0; j--){
        if(newPieceBoard[j][i].includes(activeColor)) break;
        if(activeColor==='w'){
            if(newPieceBoard[j][i][0]==='b'){
                newPieceBoard[j][i]+=state;
                break;
            }
            else newPieceBoard[j][i]+=state;
        }
        if(activeColor==='b'){
            if(newPieceBoard[j][i][0]==='w'){
                newPieceBoard[j][i]+=state;
                break;
            }
            else newPieceBoard[j][i]+=state;
        }
    }

    //down check
    for(let j = currentColumn+1, i = currentRow; j <=7; j++){
        if(newPieceBoard[j][i].includes(activeColor)) break;
        if(activeColor==='w'){
            if(newPieceBoard[j][i][0]==='b'){
                newPieceBoard[j][i]+=state;
                break;
            }
            else newPieceBoard[j][i]+=state;
        }
        if(activeColor==='b'){
            if(newPieceBoard[j][i][0]==='w'){
                newPieceBoard[j][i]+=state;
                break;
            }
            else newPieceBoard[j][i]+=state;
        }
    }

    return newPieceBoard;
}

function queenCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, state: string){
    //diagonals:
    //up right side movement
    for(let j = currentColumn-1, i = currentRow+1; j >= 0 && i < 8; j--, i++){
        if (newPieceBoard[j][i].includes(activeColor)) break;
        if(activeColor==='w'){
            if(newPieceBoard[j][i][0]==='b'){
                newPieceBoard[j][i]+=state;
                break;
            }
        }
        if(activeColor==='b'){
            if(newPieceBoard[j][i][0]==='w'){
                newPieceBoard[j][i]+=state;
                break;
            }
        }
        if(!newPieceBoard[j][i].includes(state)) newPieceBoard[j][i]+=state;
    }
    //up left side movement
    for(let j = currentColumn-1, i = currentRow-1; j >= 0 && i >= 0; j--, i--){
        if (newPieceBoard[j][i].includes(activeColor)) break;
        if(activeColor==='w'){
            if(newPieceBoard[j][i][0]==='b'){
                newPieceBoard[j][i]+=state;
                break;
            }
        }
        if(activeColor==='b'){
            if(newPieceBoard[j][i][0]==='w'){
                newPieceBoard[j][i]+=state;
                break;
            }
        }
        if(!newPieceBoard[j][i].includes(state)) newPieceBoard[j][i]+=state;
    }
    //down right side movement
    for(let j = currentColumn+1, i = currentRow+1; j < 8 && i < 8; j++, i++){
        if (newPieceBoard[j][i].includes(activeColor)) break;
        if(activeColor==='w'){
            if(newPieceBoard[j][i][0]==='b'){
                newPieceBoard[j][i]+=state;
                break;
            }
        }
        if(activeColor==='b'){
            if(newPieceBoard[j][i][0]==='w'){
                newPieceBoard[j][i]+=state;
                break;
            }
        }
        if(!newPieceBoard[j][i].includes(state)) newPieceBoard[j][i]+=state;
    }
    //down left side movement
    for(let j = currentColumn+1, i = currentRow-1; j < 8 && i >= 0; j++, i--){
        if (newPieceBoard[j][i].includes(activeColor)) break;
        if(activeColor==='w'){
            if(newPieceBoard[j][i][0]==='b'){
                newPieceBoard[j][i]+=state;
                break;
            }
        }
        if(activeColor==='b'){
            if(newPieceBoard[j][i][0]==='w'){
                newPieceBoard[j][i]+=state;
                break;
            }
        }
        if(!newPieceBoard[j][i].includes(state)) newPieceBoard[j][i]+=state;
    }

    //horizontal and vertical:
    //down
    for(let j = currentColumn+1; j <= 7; j++){
        if (newPieceBoard[j][currentRow].includes(activeColor)) break;
        if(activeColor==='w'){
            if(newPieceBoard[j][currentRow][0]==='b'){
                newPieceBoard[j][currentRow]+=state;
                break;
            }
        }
        if(activeColor==='b'){
            if(newPieceBoard[j][currentRow][0]==='w'){
                newPieceBoard[j][currentRow]+=state;
                break;
            }
        }
        newPieceBoard[j][currentRow]+=state;
    }

    //up
    for(let j = currentColumn-1; j >= 0; j--){
        if (newPieceBoard[j][currentRow].includes(activeColor)) break;
        if(activeColor==='w'){
            if(newPieceBoard[j][currentRow][0]==='b'){
                newPieceBoard[j][currentRow]+=state;
                break;
            }
        }
        if(activeColor==='b'){
            if(newPieceBoard[j][currentRow][0]==='w'){
                newPieceBoard[j][currentRow]+=state;
                break;
            }
        }
        newPieceBoard[j][currentRow]+=state;
    }

    //right
    for(let i = currentRow+1; i <= 7; i++){
        if (newPieceBoard[currentColumn][i].includes(activeColor)) break;
        if(activeColor==='w'){
            if(newPieceBoard[currentColumn][i][0]==='b'){
                newPieceBoard[currentColumn][i]+=state;
                break;
            }
        }
        if(activeColor==='b'){
            if(newPieceBoard[currentColumn][i][0]==='w'){
                newPieceBoard[currentColumn][i]+=state;
                break;
            }
        }
        newPieceBoard[currentColumn][i]+=state;
    }

    //left
    for(let i = currentRow-1; i >= 0; i--){
        if (newPieceBoard[currentColumn][i].includes(activeColor)) break;
        if(activeColor==='w'){
            if(newPieceBoard[currentColumn][i][0]==='b'){
                newPieceBoard[currentColumn][i]+=state;
                break;
            }
        }
        if(activeColor==='b'){
            if(newPieceBoard[currentColumn][i][0]==='w'){
                newPieceBoard[currentColumn][i]+=state;
                break;
            }
        }
        newPieceBoard[currentColumn][i]+=state;
    }

    return newPieceBoard;
}

//to-do: don't allow movement to squares you can be eaten
//? add 'c' *'check') to squares where you can be eaten
//add letter variable to the checks, first add Cs then As

function kingCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, state:string){
    //check all squares where opposing pieces can move and tag them with a 'c'
    if(activeColor==='w'){
        for(let j=0; j<8; j++){
            for(let i=0; i<8; i++){
                if(newPieceBoard[j][i][0]==='b'){
                    newPieceBoard = switchCheck(newPieceBoard, j, i, newPieceBoard[j][i][0], newPieceBoard[j][i][1], state);
                    //remove duplicate 'c's
                    for(let j=0; j<8; j++){
                        for(let i=0; i<8; i++){
                            if(newPieceBoard[j][i][0]==state) newPieceBoard[j][i]=state
                            if(newPieceBoard[j][i][2]==state) newPieceBoard[j][i].substring(0,2);
                        }
                    }
                }
            }
        }
    }
    else{
        for(let j=0; j<8; j++){
            for(let i=0; i<8; i++){
                if(newPieceBoard[j][i][0]==='w'){
                    newPieceBoard = switchCheck(newPieceBoard, j, i, newPieceBoard[j][i][0], newPieceBoard[j][i][1], state);
                    //remove duplicate 'c's
                    for(let j=0; j<8; j++){
                        for(let i=0; i<8; i++){
                            if(newPieceBoard[j][i][0]==state) newPieceBoard[j][i]=state
                            if(newPieceBoard[j][i][2]==state) newPieceBoard[j][i].substring(0,2)
                        }
                    }
                }
            }
        }
    }

    
    
    if(currentColumn==0){
            if(!newPieceBoard[currentColumn+1][currentRow+1].includes(activeColor) && !newPieceBoard[currentColumn+1][currentRow+1].includes(state)) newPieceBoard[currentColumn+1][currentRow+1]+='a';
            if(!newPieceBoard[currentColumn][currentRow+1].includes(activeColor) && !newPieceBoard[currentColumn][currentRow+1].includes(state)) newPieceBoard[currentColumn][currentRow+1]+='a';
            if(!newPieceBoard[currentColumn+1][currentRow].includes(activeColor) && !newPieceBoard[currentColumn+1][currentRow].includes(state))newPieceBoard[currentColumn+1][currentRow]+='a';
            if(currentRow!=0){
                if(!newPieceBoard[currentColumn][currentRow-1].includes(activeColor) && !newPieceBoard[currentColumn][currentRow-1].includes(state)) newPieceBoard[currentColumn][currentRow-1]+='a';
                if(!newPieceBoard[currentColumn+1][currentRow-1].includes(activeColor) && !newPieceBoard[currentColumn+1][currentRow-1].includes(state)) newPieceBoard[currentColumn+1][currentRow-1]+='a';
            }
    }
    else if(currentColumn==7){
        if(!newPieceBoard[currentColumn-1][currentRow-1].includes(activeColor) && !newPieceBoard[currentColumn-1][currentRow-1].includes(state)) newPieceBoard[currentColumn-1][currentRow-1]+='a';
        if(!newPieceBoard[currentColumn-1][currentRow].includes(activeColor) && !newPieceBoard[currentColumn-1][currentRow].includes(state)) newPieceBoard[currentColumn-1][currentRow]+='a';
        if(!newPieceBoard[currentColumn][currentRow-1].includes(activeColor) && !newPieceBoard[currentColumn][currentRow-1].includes(state)) newPieceBoard[currentColumn][currentRow-1]+='a';
        
        if(currentRow!=7){
            if(!newPieceBoard[currentColumn-1][currentRow+1].includes(activeColor) && !newPieceBoard[currentColumn-1][currentRow+1].includes(state)) newPieceBoard[currentColumn-1][currentRow+1]+='a';
            if(!newPieceBoard[currentColumn][currentRow+1].includes(activeColor) && !newPieceBoard[currentColumn][currentRow+1].includes(state)) newPieceBoard[currentColumn][currentRow+1]+='a';
        }
    }
    else{
        if(!newPieceBoard[currentColumn][currentRow+1].includes(activeColor) && !newPieceBoard[currentColumn][currentRow+1].includes(state)) newPieceBoard[currentColumn][currentRow+1]+='a';
        if(!newPieceBoard[currentColumn+1][currentRow+1].includes(activeColor) && !newPieceBoard[currentColumn+1][currentRow+1].includes(state)) newPieceBoard[currentColumn+1][currentRow+1]+='a';
        if(!newPieceBoard[currentColumn+1][currentRow].includes(activeColor) && !newPieceBoard[currentColumn+1][currentRow].includes(state)) newPieceBoard[currentColumn+1][currentRow]+='a';
        if(!newPieceBoard[currentColumn-1][currentRow+1].includes(activeColor) && !newPieceBoard[currentColumn-1][currentRow+1].includes(state)) newPieceBoard[currentColumn-1][currentRow+1]+='a';
        if(!newPieceBoard[currentColumn-1][currentRow].includes(activeColor) && !newPieceBoard[currentColumn-1][currentRow].includes(state)) newPieceBoard[currentColumn-1][currentRow]+='a';
        if(currentRow!=0){
            if(!newPieceBoard[currentColumn-1][currentRow-1].includes(activeColor) && !newPieceBoard[currentColumn-1][currentRow-1].includes(state)) newPieceBoard[currentColumn-1][currentRow-1]+='a';
            if(!newPieceBoard[currentColumn][currentRow-1].includes(activeColor) && !newPieceBoard[currentColumn][currentRow-1].includes(state)) newPieceBoard[currentColumn][currentRow-1]+='a';
            if(!newPieceBoard[currentColumn+1][currentRow-1].includes(activeColor) && !newPieceBoard[currentColumn+1][currentRow-1].includes(state)) newPieceBoard[currentColumn+1][currentRow-1]+='a';
        }
    }
    
    //remove all 'c's
    for(let j=0; j<8; j++){
        for(let i=0; i<8; i++){
            newPieceBoard[j][i] = newPieceBoard[j][i].replace(/c/g,"");
        }
    }


    return newPieceBoard;
}

function knightCheck(newPieceBoard: string[][], currentColumn: number, currentRow: number, activeColor: string, state: string){
    //if the space exists and it's not occupied by a friendly piece, it's active
    if(currentColumn>=2 && currentRow<=6 && newPieceBoard[currentColumn-2][currentRow+1][0]!=activeColor){
        newPieceBoard[currentColumn-2][currentRow+1]+=state;
    }
    if(currentColumn>=2 && currentRow>=1 && newPieceBoard[currentColumn-2][currentRow-1][0]!=activeColor){
        newPieceBoard[currentColumn-2][currentRow-1]+=state;
    }
    if(currentColumn<=5 && currentRow<=6 && newPieceBoard[currentColumn+2][currentRow+1][0]!=activeColor){
        newPieceBoard[currentColumn+2][currentRow+1]+=state;
    }
    if(currentColumn<=5 && currentRow>=1 && newPieceBoard[currentColumn+2][currentRow-1][0]!=activeColor){
        newPieceBoard[currentColumn+2][currentRow-1]+=state;
    }

    if(currentColumn>=1 && currentRow<=5 && newPieceBoard[currentColumn-1][currentRow+2][0]!=activeColor){
        newPieceBoard[currentColumn-1][currentRow+2]+=state;
    }
    if(currentColumn>=1 && currentRow>=2 && newPieceBoard[currentColumn-1][currentRow-2][0]!=activeColor){
        newPieceBoard[currentColumn-1][currentRow-2]+=state;
    }
    if(currentColumn<=6 && currentRow<=5 && newPieceBoard[currentColumn+1][currentRow+2][0]!=activeColor){
        newPieceBoard[currentColumn+1][currentRow+2]+=state;
    }
    if(currentColumn<=6 && currentRow>=2 && newPieceBoard[currentColumn+1][currentRow-2][0]!=activeColor){
        newPieceBoard[currentColumn+1][currentRow-2]+=state;
    }

    return newPieceBoard;
}

function mate(pieceBoard: string[][]): 'neither' | 'b' | 'w' {
    //clone board
    let auxBoard:string[][] = []
    for(let j=0; j<8; j++){
        const newRow = [];
        for(let i=0; i<8; i++){
            newRow.push(pieceBoard[j][i]);
        }
        auxBoard.push(newRow);
    }
    //first, look for king
    for(let j=0; j<8; j++){
        for(let i=0; i<8; i++){
            if(pieceBoard[j][i]==='bk'){
                auxBoard = kingCheck(auxBoard, j, i, 'b', 'c');
                //then check for possible movements and surrounding friendly pieces
                if(hasPossibleMovements(auxBoard)===false && surroundedByNeighbors(auxBoard,j,i,'b')===false){
                    return 'w';
                } 
                auxBoard = removeActiveColorFromBoard(auxBoard);
            }
        }
    }
    
    //same for opposite color
    for(let j=0; j<8; j++){
        for(let i=0; i<8; i++){
            if(pieceBoard[j][i]==='wk'){
                auxBoard = kingCheck(auxBoard, j, i, 'w', 'c');
                //then check for possible movements and surrounding friendly pieces
                if(hasPossibleMovements(auxBoard)===false && surroundedByNeighbors(auxBoard,j,i,'w')===false){
                    return 'b';
                } 
                auxBoard = removeActiveColorFromBoard(auxBoard);
            }
        }
    }


    //if neither, not mate
    return 'neither';
}


function surroundedByNeighbors(pieceBoard:string[][], currentColumn: number, currentRow: number, color: string){
    if(currentRow<7){
        if(pieceBoard[currentColumn][currentRow+1][0]!=color) return false;
    }
    if(currentRow>0){
        if(pieceBoard[currentColumn][currentRow-1][0]!=color) return false;
    }
    if(currentColumn<7){
        if(pieceBoard[currentColumn+1][currentRow][0]!=color) return false;
    }
    if(currentColumn>0){
        if(pieceBoard[currentColumn-1][currentRow][0]!=color) return false;
    }
    if(currentColumn<7 && currentRow<7){
        if(pieceBoard[currentColumn+1][currentRow+1][0]!=color) return false;
    }
    if(currentRow>0 && currentColumn>0){
        if(pieceBoard[currentColumn-1][currentRow-1][0]!=color) return false;
    }
    return true;
}

//scans for possible squares for king, if there are none, it's mate
function hasPossibleMovements(auxBoard: string[][]){
    for(let j=0; j<8; j++){
        for(let i=0; i<8; i++){
            if(auxBoard[j][i].includes('a')) return true;
        }
    }
    return false;
}

export {switchCheck, mate};