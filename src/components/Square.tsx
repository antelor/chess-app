/* eslint-disable @typescript-eslint/no-explicit-any */
import '../styles/Square.scss'
import {useDroppable} from '@dnd-kit/core';

interface SquareProps {
    id: string, 
    content: any,
    className: string
}
  
function Square(props: SquareProps) {
    const {setNodeRef} = useDroppable({
        id: props.id,
    });

    return (
        <div className={'Square ' + props.className} ref={setNodeRef}>
            {props.content}
        </div>
    )
}

export default Square
