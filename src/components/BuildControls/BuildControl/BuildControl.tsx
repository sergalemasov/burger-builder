import React from 'react';
import classes from './BuildControl.module.css';

interface BuildControlProps {
    label: string;
    isRemovingDisabled: boolean;
    ingredientAdded: () => void;
    ingredientRemoved: () => void;
}

const buildControl = (props: BuildControlProps) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
            disabled={props.isRemovingDisabled}
            className={classes.Less}
            onClick={props.ingredientRemoved}>
            Less
        </button>
        <button
            className={classes.More}
            onClick={props.ingredientAdded}>
            More
        </button>
    </div>
);

export default buildControl;
