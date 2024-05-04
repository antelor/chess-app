/* eslint-disable @typescript-eslint/no-explicit-any */
import '../styles/Turnview.scss'

function Turnview({turn}: {turn: string}) {
    return (
        <div className='Turnview'>
            Turn
            <div className= {`turnSquare ${turn}`}></div>
        </div>
    )
}

export default Turnview
