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

export {removeActiveColorFromBoard};