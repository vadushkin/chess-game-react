import React, {useEffect, useState} from 'react';
import {useMediaQuery} from "react-responsive";

import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";

import Mobile from "./displays/Mobile";
import Desktop from "./displays/Desktop";

import "./App.sass"

const App = () => {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [history, setHistory] = useState<{ x: number, y: number, figure: string }[]>([]);
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);

    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1224px)",
    });

    const isTabletOrMobile = useMediaQuery({query: "(max-width: 1224px)"});

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
        <div className="app">
            {isDesktopOrLaptop && (
                <Desktop
                    board={board}
                    setBoard={setBoard}
                    currentPlayer={currentPlayer}
                    whiteTime={whiteTime}
                    blackTime={blackTime}
                    decrementWhiteTimer={decrementWhiteTimer}
                    decrementBlackTimer={decrementBlackTimer}
                    handleRestart={handleRestart}
                    setHistory={setHistory}
                    history={history}
                    swapPlayer={swapPlayer}
                />
            )}
            {isTabletOrMobile && (
                <Mobile
                    board={board}
                    setBoard={setBoard}
                    currentPlayer={currentPlayer}
                    whiteTime={whiteTime}
                    blackTime={blackTime}
                    decrementWhiteTimer={decrementWhiteTimer}
                    decrementBlackTimer={decrementBlackTimer}
                    handleRestart={handleRestart}
                    setHistory={setHistory}
                    history={history}
                    swapPlayer={swapPlayer}
                />
            )}
        </div>
    );
};

export default App;
