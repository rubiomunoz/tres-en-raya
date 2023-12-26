'use client'
import { useState, useEffect } from 'react';

export default function Home() {

   
  const classCell = `w-[100px] h-[100px] border border-gray-500 flex justify-center items-center text-4xl font-bold cursor-pointer`; // Estilos de las celdas

  const [jsConfetti, setJsConfetti] = useState(null);
    const [turno, setTurno] = useState(1);
  const [jugadas, setJugadas] = useState(0) // 9 jugadas es empate sin ganador es empate

  const [isBlocked, setIsBlocked] = useState(false)// si es true, no se puede jugar, es empate o victoria y no se puede continuar

  //Para importar el modulo de confetti sin error por usar el elemento document
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('js-confetti').then((module) => {
        const JsConfetti = module.default;
        setJsConfetti(new JsConfetti());
      });
    }
  }, []);

  const handlePlay = (cell) => {
    if (isBlocked) return; //Hay ganador o empate, no se puede jugar más en esta partida

    const cellElement = document.getElementById(cell);
    if (cellElement.innerHTML !== '') { return false };

    (turno ===1) ? cellElement.classList.add('text-white') : cellElement.classList.add('text-red-900');
    cellElement.innerHTML = turno === 1 ? 'X' : 'O';
    cellElement.contentEditable = false;
    cellElement.style.cursor = 'not-allowed';
    setJugadas(jugadas + 1);

    if (isWinner()) { //Hay ganador
      jsConfetti.addConfetti()
      document.getElementById('textmessage').innerHTML = `Ganó el jugador ${turno}`;
    } else { //No hay ganador
      if (jugadas === 8) { //No hay ganador y se acabaron las jugadas
        document.getElementById('textmessage').innerHTML = `¡La partida terminó en empate!`;
        setIsBlocked(true)
      } else { //No hay ganador y hay jugadas disponibles
        setTurno(turno === 1 ? 2 : 1);
        document.getElementById('textmessage').innerHTML = `Turno jugador: ${turno === 1 ? 2 : 1}`;
      }
      
    }
  }

  const isWinner = () => {
    const cell1 = document.getElementById(1).innerHTML;
    const cell2 = document.getElementById(2).innerHTML;
    const cell3 = document.getElementById(3).innerHTML;
    const cell4 = document.getElementById(4).innerHTML;
    const cell5 = document.getElementById(5).innerHTML;
    const cell6 = document.getElementById(6).innerHTML;
    const cell7 = document.getElementById(7).innerHTML;
    const cell8 = document.getElementById(8).innerHTML;
    const cell9 = document.getElementById(9).innerHTML;

    if ((cell1 === cell2 && cell1 === cell3 && cell1 !== '') 
    || (cell4 === cell5 && cell4 === cell6 && cell4 !== '')
    || (cell7 === cell8 && cell7 === cell9 && cell7 !== '')
    || (cell1 === cell4 && cell1 === cell7 && cell1 !== '')
    || (cell2 === cell5 && cell2 === cell8 && cell2 !== '')
    || (cell3 === cell6 && cell3 === cell9 && cell3 !== '')
    || (cell1 === cell5 && cell1 === cell9 && cell1 !== '')
    || (cell3 === cell5 && cell3 === cell7 && cell3 !== '')) {
      setIsBlocked(true)
      return true;
    } else {
      return false;
    }

  }

  //Reiniciar el juego
  const resetGame = () => {
    for (let i = 1; i < 10; i++) {
      document.getElementById(i).innerHTML = '';
      document.getElementById(i).classList.remove('text-white');
      document.getElementById(i).classList.remove('text-red-900');
      document.getElementById(i).contentEditable = true;
      document.getElementById(i).style.cursor = 'pointer';
    }
    document.getElementById('textmessage').innerHTML = `Turno jugador: 1`;
    setIsBlocked(false)
    setTurno(1)
    setJugadas(0)
  }

  return (
    <main className="flex justify-center items-center h-[100dvh] m-0 bg-gradient-to-b from-gray-800 to-gray-900 content-around flex-col">
      <img src="/mainlogo.png" className='w-full max-w-72 h-auto text-center my-2' />
      <div className='grid grid-cols-3 gap-0 mt-5'> 
        <div id="1" className={classCell} onClick={() => handlePlay(1)}></div>
        <div id="2" className={classCell} onClick={() => handlePlay(2)}></div>
        <div id="3" className={classCell} onClick={() => handlePlay(3)}></div>
        <div id="4" className={classCell} onClick={() => handlePlay(4)}></div>
        <div id="5" className={classCell} onClick={() => handlePlay(5)}></div>
        <div id="6" className={classCell} onClick={() => handlePlay(6)}></div>
        <div id="7" className={classCell} onClick={() => handlePlay(7)}></div>
        <div id="8" className={classCell} onClick={() => handlePlay(8)}></div>
        <div id="9" className={classCell} onClick={() => handlePlay(9)}></div>
      </div>
      
      <p id="textmessage" className="m-4 text-2xl font-bold text-gray-500 mt-10 text-center block w-full">Turno jugador: {turno}</p>

      <button className='absolute bottom-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded' onClick={resetGame}>Reiniciar</button>
    </main>
  )
}
