import React, {useEffect, useState} from 'react';
import "./App.sass"
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import PreviousSteps from "./components/PreviousSteps";

const App = () => {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [history, setHistory] = useState<{x: number, y: number, figure: string}[]>([]);
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, [])

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer)
    }

    function decrementBlackTimer() {
        setBlackTime((prev) => (prev > 0 ? prev - 1 : prev));
    }

    function decrementWhiteTimer() {
        setWhiteTime((prev) => (prev > 0 ? prev - 1 : prev));
    }

    const handleRestart = () => {
        setWhiteTime(300);
        setBlackTime(300);
        restart();
    }

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
        setHistory([]);
        setCurrentPlayer(whitePlayer);
    }

    return (
        <div className="screen">
            <Timer
                currentPlayer={currentPlayer}
                whiteTime={whiteTime}
                blackTime={blackTime}
                decrementWhiteTimer={decrementWhiteTimer}
                decrementBlackTimer={decrementBlackTimer}
                handleRestart={handleRestart}
            />
            <BoardComponent
                handleRestart={handleRestart}
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
                history={history}
                setHistory={setHistory}
            />
            <div>
                <LostFigures title="Black figures" figures={board.lostBlackFigures}/>
                <LostFigures title="White figures" figures={board.lostWhiteFigures}/>
            </div>
            <PreviousSteps title="Previous steps" history={history}/>
        </div>
    );
};

export default App;
