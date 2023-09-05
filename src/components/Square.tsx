import '../styles/Square.scss'
import {useDroppable} from '@dnd-kit/core';

interface SquareProps {
    id: string, 
    content: unknown
}
  
function Square(props: SquareProps) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });    
    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div className="Square" ref={setNodeRef} style={style}>
            {props.content}
        </div>
    )
}

export default Square
