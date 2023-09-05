import '../styles/Piece.scss'
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

interface PieceProps {
    name: string;
    parent: string;
}
  
function Piece({name, parent}: PieceProps) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'draggable',
        data:{
            parent
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

