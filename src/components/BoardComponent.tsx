import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import {FigureNames} from "../models/figures/Figure";
import {Modal, Button} from "react-bootstrap";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
    restart: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer, restart}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && cell.available) {
            selectedCell?.moveFigure(cell);
            board.pawnReady();
            swapPlayer();
            board.isCheckmate(currentPlayer?.color);
            setSelectedCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
            if (!cell.figure) {
                setSelectedCell(null);
            }
        }
    }

    useEffect(() => {
        highlightCells();
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell, currentPlayer?.color);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    const handleRestartMate = () => {
        board.checkmate = false;
        restart();
    };
    const handleRestartPromote = (type: FigureNames) => {
        if (board.promotePawnCell) {
            board.promotePawn(
                board.promotePawnCell?.figure?.color,
                board.promotePawnCell,
                type
            );
        }
        board.promotePawnCell = null;
        updateBoard();
    };


    return (
        <div className="Container">
            {/* Checkmate or Stalemate on the board */}
            {board.checkmate || board.stalemate
                ? (
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header>
                        <Modal.Title>
                            {board.checkmate ? "Mate!" : "Stalemate!"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {board.checkmate
                            ? ` ${board.blackCheck ? "White" : "Black"} won. Maybe again?`
                            : "It`s a draw! Maybe again?"}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleRestartMate}>
                            New game
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : (<></>)}

            {/* For make a figure from pawn */}
            {board.promotePawnCell ? (
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Body>Choose the figure to promote your pawn!</Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            onClick={() => handleRestartPromote(FigureNames.QUEEN)}>
                            Queen
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => handleRestartPromote(FigureNames.KNIGHT)}>
                            Knight
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => handleRestartPromote(FigureNames.BISHOP)}>
                            Bishop
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => handleRestartPromote(FigureNames.ROOK)}>
                            Rook
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : (<></>)}

            {/* Current Player */}
            <h1>Move: {currentPlayer?.color}</h1>
            <div>
                {/* If check */}
                {board.whiteCheck || board.blackCheck ? (
                    <h3>Check!</h3>
                ) : (<></>)}
            </div>

            {/* Board */}
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;
