import '../styles/Piece.scss'

interface PieceProps {
    name: string;
}
  
function Piece({name}: PieceProps) {
    return (
        <div className="Piece">
            {name}
        </div>
    )
}

export default Piece
