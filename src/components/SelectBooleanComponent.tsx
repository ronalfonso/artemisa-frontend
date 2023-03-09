import React, {useContext, useState} from 'react';
import {InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {GeneralContext} from '../contexts/GeneralContext';
import {ExpressionType} from '../core/models/ExpressionType';

const SelectExpressionComponent = () => {
    // @ts-ignore
    const {expression, setExpression} = useContext(GeneralContext);
    const [payload, setPayload] = useState('');
    const typesArray = [
        {value: '1', label: 'Verdadero'},
        {value: '0', label: 'Falso'},
    ]

    const handleChange = ({target}: SelectChangeEvent) => {
        const {value} = target;
        const payload = {
           expression: {
               type: ExpressionType.Const,
               payload: {
                   value: value === '1'
               }
           }
       }
        setExpression({
            ...expression,
            payload
        })
        setPayload(value as string);
    };

    return (
        <>
            <InputLabel id="simple-select-boolean">Valor</InputLabel>
            <Select
                labelId="simple-select-boolean"
                id="simple-select-boolean"
                label="Seleccion verdadero o falso"
                name={'payload'}
                value={payload}
                onChange={handleChange}
            >
                {typesArray.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

export default SelectExpressionComponent;
