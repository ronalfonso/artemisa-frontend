import { ExpressionType } from './ExpressionType';

export interface BaseExpression<T extends ExpressionType, P = any> {
  type: T;
  payload: P;
}
