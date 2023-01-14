import React, {FC} from 'react';
import Timer from "../components/Timer";
import BoardComponent from "../components/BoardComponent";
import {Player} from "../models/Player";
import {Board} from "../models/Board";

interface DesktopProps {
    currentPlayer: Player | null;
    blackTime: number;
    whiteTime: number;
    decrementBlackTimer: () => void;
    decrementWhiteTimer: () => void;
    handleRestart: () => void;
    board: Board;
    setBoard: (board: Board) => void;
    history: { x: number; y: number; figure: string }[];
    setHistory: React.ComponentState;
    swapPlayer: () => void;
}

const Desktop: FC<DesktopProps> = ({
                                       currentPlayer,
                                       whiteTime,
                                       blackTime,
                                       decrementWhiteTimer,
                                       handleRestart,
                                       decrementBlackTimer,
                                       board,
                                       setBoard,
                                       history,
                                       swapPlayer,
                                       setHistory
                                   }) => {
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
        </div>
    );
};

export default Desktop;
