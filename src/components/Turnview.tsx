/* eslint-disable @typescript-eslint/no-explicit-any */
import '../styles/Turnview.scss'

function Turnview({turn}: {turn: string}) {
    return (
        <div className='Turnview'>
            <div className={`turnSquare ${turn}`}>
                Turn
                <div className= 'turnSquareColor'></div>
            </div>
        </div>
    )
}

export default Turnview
