import React, {useContext, useState} from 'react';
import {InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {GeneralContext} from '../contexts/GeneralContext';

const SelectExpressionComponent = () => {
    // @ts-ignore
    const {expression, setExpression} = useContext(GeneralContext);
    const [type, setType] = useState('');

    const typesArray = [
        {value: 'if', label: 'Si?'},
        {value: 'and', label: 'Y'},
        {value: 'or', label: 'O'},
        {value: 'not', label: 'No'},
        {value: 'const', label: 'Constante'},
        {value: 'eq', label: 'Equación'},
        {value: 'to-lower', label: 'Minuscula'},
        {value: 'to-upper', label: 'Mayuscula'},
    ]

    const handleChange = ({target}: SelectChangeEvent) => {
        const {value} = target;
        setExpression({
            ...expression,
            type: value as string
        })
        setType(value as string);
    };

    return (
        <>
            <InputLabel id="simple-select-type">Tipo de expresión</InputLabel>
            <Select
                labelId="simple-select-type"
                id="simple-select-type"
                name={'type'}
                label="Tipo de expresión"
                value={type}
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
