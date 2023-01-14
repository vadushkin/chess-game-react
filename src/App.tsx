import React, {useEffect, useState} from 'react';
import "./App.css"
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import {Cell} from "./models/Cell";

const App = () => {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [history, setHistory] = useState<Cell[] | []>([]);

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, [])

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer)
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
        <div className="app">
            <Timer
                restart={restart}
                currentPlayer={currentPlayer}
            />
            <BoardComponent
                restart={restart}
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
        </div>
    );
};

export default App;
