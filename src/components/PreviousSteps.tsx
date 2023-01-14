import React, {FC} from 'react';

interface History {
    title: string;
    history: { x: number; y: number; figure: string }[];
}

const PreviousSteps: FC<History> = ({title, history}) => {
    return (
        <div className="previousSteps">
            <h3>{title}</h3>
            {history.map((cell, index) => (
                <div key={index}>
                    {cell.x}
                    {cell.y}
                    {cell.figure}
                </div>
                ))}
        </div>
    );
};

export default PreviousSteps;
