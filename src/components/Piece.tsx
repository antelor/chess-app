import '../styles/Piece.scss'
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import {BlackBishop, BlackKing, BlackKnight, BlackPawn, BlackQueen, BlackRook} from '../assets/svgImports';
import {WhiteBishop, WhiteKing, WhiteKnight, WhitePawn, WhiteQueen, WhiteRook} from '../assets/svgImports';

interface PieceProps {
    name: string | null;
    x: number,
    y: number
}
  
function Piece({name, x, y}: PieceProps) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        //id: "xy"
        id: (x+''+y),
        data:{
            name,
            x,
            y
        }
    });

    const style = {  
        transform: CSS.Translate.toString(transform),
    }
      
    return (
        <div className="Piece" ref={setNodeRef} style={style} {...listeners} {...attributes}>
            { name ? 
                name[0]=='b' ?
                    name[1]=='b' ? <BlackBishop/> :
                    name[1]=='k' ? <BlackKing/> :
                    name[1]=='n' ? <BlackKnight /> : 
                    name[1]=='p' ? <BlackPawn /> :
                    name[1]=='q' ? <BlackQueen /> :
                    name[1]=='r' ? <BlackRook /> :
                    <></>
                : 
                    name[1]=='b' ? <WhiteBishop/> :
                    name[1]=='k' ? <WhiteKing/> :
                    name[1]=='n' ? <WhiteKnight /> : 
                    name[1]=='p' ? <WhitePawn /> :
                    name[1]=='q' ? <WhiteQueen /> :
                    name[1]=='r' ? <WhiteRook /> :
                    <></>
            : <></>
            }
            
        </div>
    )
}

export default Piece;    

