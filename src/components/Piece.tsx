import '../styles/Piece.scss'
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

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
            {name}
        </div>
    )
}

export default Piece;    

