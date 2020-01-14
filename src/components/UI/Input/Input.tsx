import React from 'react';
import InputType from 'shared/enums/InputType.enum';
import classes from './Input.module.css';
import {InputConfig} from 'shared/interfaces/inputConfig';

interface InputProps {
    elementType: InputType;
    elementConfig: InputConfig;
    value: string;
    changed: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

const input: React.FC<InputProps> = props => {
    let inputNode: React.ReactNode;

    switch (props.elementType) {
        case InputType.text:
            inputNode = (
                <input
                    type="text"
                    className={classes.InputNode}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}/>
            );
            break;

        case InputType.email:
            inputNode = (
                <input
                    type="email"
                    className={classes.InputNode}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}/>
            );
            break;

        case InputType.textArea:
            inputNode = (
                <textarea
                    className={classes.InputNode}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}/>
            );
            break;

        case InputType.select:
            const options = (props.elementConfig.options || [])
                .map(option => (
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.name}
                    </option>
                ));

            inputNode = (
                <select
                    onChange={props.changed}
                    value={props.value}
                    name={props.elementConfig.name}
                    className={classes.InputNode}>
                    {options}
                </select>
            );
            break;
    }

    return (
        <div className={classes.Input}>
            {inputNode}
        </div>
    );
}

export default input;