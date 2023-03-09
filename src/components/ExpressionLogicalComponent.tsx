import React, {useContext, useState} from 'react';
import {GeneralContext} from '../contexts/GeneralContext';
import {FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {ExpressionType} from '../core/models/ExpressionType';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const ExpressionLogicalComponent = () => {
    // @ts-ignore
    const {expression, setExpression} = useContext(GeneralContext);
    const [selectList, setSelectList] = useState<any[]>([
        {
            labelId: "simple-select-boolean",
            id: "simple-select-boolean",
            label: "Seleccion verdadero o falso",
            name: "selector",
            value: '',
        }
    ]);
    const typesArray = [
        {value: '1', label: 'Verdadero'},
        {value: '0', label: 'Falso'},
    ]

    const handleChange = ({target}: SelectChangeEvent, index: number) => {
        const {value} = target;
        const list: any[] = [...selectList];
        list[index]['value'] = value;
        setSelectList([...list]);
        const expressionsList = list.map(ele => {
            return {
                type: ExpressionType.Const,
                payload: {
                    value: ele.value === '1',
                },
            }
        })
        setExpression({
            ...expression,
            payload: {
                expressions: expressionsList
            }
        })
    };

    const handleAdd = () => {
        const newElement = {
            labelId: 'simple-select-boolean',
            id: 'simple-select-boolean',
            label: 'Seleccion verdadero o falso',
            name: 'selector',
            value: '',
        }

        setSelectList([...selectList, newElement])
    }

    const handleRemove = (index: number) => {
        const list = [...selectList];
        list.splice(index, 1)
        setSelectList([...list])
    }

    return (
        <>
            {
                selectList.map((select, index) => (
                    <FormControl key={index} sx={{mt: 2}} fullWidth>
                        <InputLabel id={select.labelId}>Valor</InputLabel>
                        <Select
                            labelId={select.labelId}
                            id={select.id}
                            label={select.label}
                            value={select.value}
                            name={select.name}
                            onChange={(e) => handleChange(e, index)}
                        >
                            {typesArray.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ))
            }
            <IconButton aria-label="agregar" onClick={handleAdd}>
                <AddCircleIcon/>
            </IconButton>
        </>
    )
}