import {useState} from 'react';
import Piece from './Piece';
import '../styles/Board.scss';

const basicBoard = [
    [ 'r', 'n', 'b','q','k','b','n','r'],
    [ 'p', 'p', 'p','p','p','p','p','p'],
    [ '.', '.', '.','.','.','.','.','.'],
    [ '.', '.', '.','.','.','.','.','.'],
    [ '.', '.', '.','.','.','.','.','.'],
    [ '.', '.', '.','.','.','.','.','.'],
    [ 'p', 'p', 'p','p','p','p','p','p'],
    [ 'r', 'n', 'b','q','k','b','n','r'],
]

function Board() {
    const [board, setBoard] = useState(basicBoard);

    return (
        <div className='Board'>
            {board.map( (row, index) => <div className='BoardRow' key={index}>
                {row.map( (square) =>
                    <Piece name={square}/>
                )}
            </div>)}
        </div>
    )
}

export default Board
