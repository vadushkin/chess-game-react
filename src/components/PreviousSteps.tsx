import React, {FC} from 'react';

interface History {
    title: string;
    history: { figure: string, cell: string }[];
}

const PreviousSteps: FC<History> = ({title, history}) => {
    return (
        <div className="previousSteps">
            <h3>{title}</h3>
            {history.map((cell, index) => (
                <div key={index}>
                    {cell.figure}
                    {cell.cell}
                </div>
            ))}
        </div>
    );
};

export default PreviousSteps;
