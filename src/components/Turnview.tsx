/* eslint-disable @typescript-eslint/no-explicit-any */
import '../styles/Turnview.scss'

function Turnview({turn}: {turn: string}) {
    return (
        <div className={`Turnview ${turn}`}>
            Turn
            <div className= 'turnSquare'></div>
        </div>
    )
}

export default Turnview
