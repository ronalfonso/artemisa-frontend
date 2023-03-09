import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';
import React, {ChangeEvent, useContext, useState} from 'react';
import {ExpressionType} from '../core/models/ExpressionType';
import {GeneralContext} from '../contexts/GeneralContext';

export const ExpressionIfComponent = () => {
    // @ts-ignore
    const {expression, setExpression} = useContext(GeneralContext);
    const [checked, setChecked] = useState(false);
    const [payload, setPayload] = useState('');
    const [inputs, setInputs] = useState({
        isTrue: '',
        isFalse: ''
    });
    const [inputConstIf, setInputConstIf] = useState({
        test_expression: {},
        is_true: undefined,
        is_false: undefined
    });
    const typesArray = [
        {value: '1', label: 'Verdadero'},
        {value: '0', label: 'Falso'},
    ]

    const handleChange = ({target}: SelectChangeEvent) => {
        const {value} = target;
        const testExpression = {
            type: ExpressionType.Const,
            payload: {
                value: value === '1'
            }
        }
        setInputConstIf({
            ...inputConstIf,
            test_expression: testExpression
        })
        setExpression({
            ...expression,
            payload: {
                test_expression: testExpression
            }
        })
        setPayload(value as string);
    }

    const onInputChangeEq = ({target}: any) => {
        const {name, value} = target;
        setInputs({
            ...inputs,
            [name]: value
        });
        const testExpression = inputConstIf.test_expression;
        let isTrue, isFalse, payload;
        if (name === 'isTrue') {
            isTrue = {
                type: ExpressionType.Const,
                payload: {
                    value
                }
            }
            payload =  {
                is_false: {
                    type: ExpressionType.Const,
                    payload: {
                        value: inputs.isFalse
                    }
                },
                test_expression: testExpression,
                is_true: isTrue
            }
        } else if (name === 'isFalse') {
            isFalse = {
                type: ExpressionType.Const,
                payload: {
                    value: value
                }
            }
            payload =  {
                is_true: {
                    type: ExpressionType.Const,
                    payload: {
                        value: inputs.isTrue
                    }
                },
                test_expression: testExpression,
                is_false: isFalse
            }
        }

        setExpression({
            ...expression,
            payload
        })
    }

    const handleValidate = () => {
        if (inputs.isFalse === '' || inputs.isTrue === '') {
           return true;
        }
        return Object.keys(inputConstIf.test_expression).length === 0;
    }

    const handleChangeChecked = ({target}: ChangeEvent<HTMLInputElement>) => {
        setChecked(target.checked);
        const payloadExpression = expression.payload;
        const testExpression = {
            type: ExpressionType.Not,
            payload: {
                expression: {
                    type: ExpressionType.Const,
                    payload: {
                        value: payloadExpression.test_expression.payload.value
                    }
                }
            }
        }
        const payloadNot = {
            test_expression: testExpression,
            is_false: payloadExpression.is_false,
            is_true: payloadExpression.is_true
        }
        setExpression({
            ...expression,
            payload: payloadNot
        })
    };

    return (
        <>
            <FormControl sx={{mt: 2}} fullWidth>
                <InputLabel id={'simple-select-boolean'}>Seleccion verdadero o falso</InputLabel>
                <Select
                    labelId={'simple-select-boolean'}
                    id={'simple-select-boolean'}
                    label={'Seleccion verdadero o falso'}
                    value={payload}
                    name={'selector'}
                    onChange={handleChange}
                >
                    {typesArray.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                <div>
                    <FormControlLabel disabled={handleValidate()} control={
                        <Checkbox checked={checked}
                                  onChange={handleChangeChecked}

                                  defaultChecked/>}
                                      label="Negar función"/>
                </div>
            </FormControl>
            <FormControl sx={{mt: 1}} fullWidth>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <FormControl sx={{mt: 2}} fullWidth>
                            <TextField
                                id="outlined-error"
                                label="Respuesta si es verdadero"
                                name={'isTrue'}
                                value={inputs.isTrue}
                                onChange={onInputChangeEq}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{mt: 2}} fullWidth>
                            <TextField
                                id="outlined-error"
                                label="Respuesta si es falso"
                                name={'isFalse'}
                                value={inputs.isFalse}
                                onChange={onInputChangeEq}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    )
}