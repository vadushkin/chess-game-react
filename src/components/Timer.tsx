import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface TimeProps {
    currentPlayer: Player | null;
    blackTime: number;
    whiteTime: number;
    decrementBlackTimer: () => void;
    decrementWhiteTimer: () => void;
    handleRestart: () => void;
}


const Timer: FC<TimeProps> = ({
                                  currentPlayer,
                                  whiteTime,
                                  blackTime,
                                  handleRestart,
                                  decrementBlackTimer,
                                  decrementWhiteTimer
                              }) => {
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        startTimer();
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000);
    }

    return (
        <div>
            {whiteTime && blackTime ? (
                <div className="timerBlock">
                    <div>
                        <Button variant="primary" onClick={handleRestart}>Restart game</Button>
                    </div>
                    <h2> Black time: {blackTime}</h2>
                    <h2> White time: {whiteTime}</h2>
                </div>
            ) : (
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Game Over</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {whiteTime ? "White" : "Black"} won.
                        Maybe again?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleRestart}>
                            New game
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Timer;
