import React from 'react';
import classes from './Button.module.css';
import ButtonType from 'shared/enums/ButtonType.enum';

interface ButtonProps {
    children: React.ReactNode;
    clicked: () => void;
    type?: ButtonType;
}

const _button: React.FC<ButtonProps> = props => {
    const buttonClasses = [classes.Button];

    switch (props.type) {
        case ButtonType.danger:
            buttonClasses.push(classes.Danger);
            break;

        case ButtonType.success:
            buttonClasses.push(classes.Success);
            break;
    }

    return (
        <button
            onClick={props.clicked}
            className={buttonClasses.join(' ')}>
            {props.children}
        </button>
    );
};

export default _button;