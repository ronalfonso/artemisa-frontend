import {GeneralContext} from './GeneralContext';
import {useState} from 'react';
import {Expression} from '../core/models/Expressions';

const initialExpression = {
    type: undefined,
    payload: undefined
}
export const GeneralProvider = ({ children }: any) => {
    // @ts-ignore
    const [expression, setExpression] = useState<Expression>(initialExpression);
    const data = {
        expression, setExpression,
    }

    return (
        <GeneralContext.Provider value={ data } >
            { children }
        </GeneralContext.Provider>
    )
}