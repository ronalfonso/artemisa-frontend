import axios from 'axios';
import {Expression} from '../models/Expressions';
import {environment} from '../../environment';

const BASE_URL = environment.SHIP_URL;
const URL_COMPONENT = `${BASE_URL}/ship`
export const evaluate = async (body: Expression) => {
    const url = `${URL_COMPONENT}/evaluate`;
    try {
        return await axios.post(url, body)
            .then(resp => resp);
    } catch (err: unknown) {
        return err;
    }
}