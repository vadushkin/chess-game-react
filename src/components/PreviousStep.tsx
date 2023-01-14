import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CellProps {
    cell: Cell;
}

const PreviousStep: FC<CellProps> = ({cell}) => {
    return (
        <p>{cell.x} {cell.y} {cell.figure?.name}</p>
    );
};

export default PreviousStep;
