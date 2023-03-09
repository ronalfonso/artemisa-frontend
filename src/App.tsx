import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader, FormControl, TextField} from '@mui/material';
import './App.scss';
import {ExpressionType} from './core/models/ExpressionType';
import SelectExpressionComponent from './components/SelectExpressionComponent';
import SelectBooleanComponent from './components/SelectBooleanComponent';
import {GeneralContext} from './contexts/GeneralContext';
import {ExpressionEqComponent} from './components/ExpressionEqComponent';
import {ExpressionLogicalComponent} from './components/ExpressionLogicalComponent';
import {ExpressionIfComponent} from './components/ExpressionIfComponent';
import {evaluate} from './core/api/ship.service';

function App() {
    // @ts-ignore
    const {expression, setExpression} = useContext(GeneralContext);
    const [inputConst, setInputConst] = useState('');
    const [response, setResponse] = useState('');

    const handleSend = () => {
        evaluate(expression).then((resp: any) => {
            if (resp.status === 201) {
                setResponse(resp.data.toString());
            }
        });
    }

    const onInputChange = ({target}: any) => {
        const {value} = target;
        let payload;
        if (expression.type === ExpressionType.Const) {
            payload = {
                value: value
            }

        } else {
            payload = {
                value: {
                    type: ExpressionType.Const,
                    payload: {
                        value: value,
                    },
                },
            }
        }
        setExpression({
            ...expression,
            payload
        })

        setInputConst(value);
    }


    useEffect(() => {

    }, [expression])

    return (
        <div style={{padding: '2rem'}}>
            <h1>Instrucciones para la nave</h1>

            <Card sx={{width: '80%', margin: '2rem auto'}}>
                <CardHeader
                    title={'Expresion padre'}
                />

                <CardContent>
                    <div>
                        <FormControl sx={{mt: 2}} fullWidth>
                            <SelectExpressionComponent />
                        </FormControl>

                        {
                            expression.type === ExpressionType.Not &&
                            <FormControl sx={{mt: 2}} fullWidth>
                                <SelectBooleanComponent/>
                            </FormControl>
                        }

                        {
                            (
                                expression.type === ExpressionType.Const ||
                                expression.type === ExpressionType.StringToUpper ||
                                expression.type === ExpressionType.StringToLower
                            ) &&
                            <FormControl sx={{mt: 2}} fullWidth>
                                <TextField
                                    id="outlined-error"
                                    label="Texto"
                                    name={'text'}
                                    value={inputConst}
                                    onChange={onInputChange}
                                />
                            </FormControl>
                        }

                        {
                            expression.type === ExpressionType.Eq &&
                            <ExpressionEqComponent />
                        }

                        {
                            (expression.type === ExpressionType.And ||
                            expression.type === ExpressionType.Or) &&
                                <ExpressionLogicalComponent />
                        }

                        {
                            expression.type === ExpressionType.If &&
                            <ExpressionIfComponent />
                        }


                        <FormControl sx={{mt: 2}} fullWidth>
                            <Button onClick={handleSend} type={'submit'} variant="contained">Enviar</Button>
                        </FormControl>
                    </div>

                </CardContent>
            </Card>

            {
                response.length > 0 &&
                <Card sx={{width: '80%', margin: '2rem auto'}}>
                    <CardContent>
                        <div className="title">
                            Respuesta:
                        </div>
                        <div className="response">
                            <h3>{response}</h3>
                        </div>
                    </CardContent>
                </Card>
            }

        </div>
    );
}

export default App;
