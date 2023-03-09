import {FormControl, Grid, TextField} from '@mui/material';
import React, {useContext, useState} from 'react';
import {ExpressionType} from '../core/models/ExpressionType';
import {GeneralContext} from '../contexts/GeneralContext';

export const ExpressionEqComponent = () => {
    // @ts-ignore
    const {expression, setExpression} = useContext(GeneralContext);
    const [inputConstEq, setInputConstEq] = useState({
        left: '',
        right: ''
    });

    const onInputChangeEq = ({target}: any) => {
        const {name, value} = target;

        setInputConstEq({
            ...inputConstEq,
            [name]: value
        });
        let payload = {
            right: {
                type: ExpressionType.Const,
                payload: {
                    value: inputConstEq.right,
                }
            },
            left: {
                type: ExpressionType.Const,
                payload: {
                    value: inputConstEq.left,
                }
            }
        }

        setExpression({
            ...expression,
            payload
        })

    }

    return (
        <>
            <FormControl sx={{mt: 2}} fullWidth>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl sx={{mt: 2}} fullWidth>
                            <TextField
                                id="outlined-error"
                                label="Izquierda"
                                name={'left'}
                                value={inputConstEq.left}
                                onChange={onInputChangeEq}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{mt: 2}} fullWidth>
                            <TextField
                                id="outlined-error"
                                label="Derecha"
                                name={'right'}
                                value={inputConstEq.right}
                                onChange={onInputChangeEq}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    )
}