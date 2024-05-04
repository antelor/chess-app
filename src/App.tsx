import {useState} from 'react';
import './styles/App.scss'
import Board from './components/Board';
import Turnview from './components/Turnview';

function App() {
  const [colorTurn, setColorTurn] = useState('w');

  return (
    <div className='App'>
      <Board colorTurn={colorTurn} setColorTurn={setColorTurn}/>
      <Turnview turn={colorTurn}/>
    </div>
  )
}

export default App
