import { BaseExpression } from './BaseExpression';
import { ExpressionType } from './ExpressionType';

export type If = BaseExpression<
  ExpressionType.If,
  {
    test_expression: Expression;
    if_true: Expression;
    if_false: Expression;
  }
>;

export type Const = BaseExpression<
  ExpressionType.Const,
  {
    value: string | boolean | number;
  }
>;

export type And = BaseExpression<
  ExpressionType.And,
  {
    expressions: Array<Expression>;
  }
>;

export type Or = BaseExpression<
  ExpressionType.Or,
  {
    expressions: Array<Expression>;
  }
>;

export type Not = BaseExpression<
  ExpressionType.Not,
  {
    expression: Expression;
  }
>;

export type StringToUpper = BaseExpression<
  ExpressionType.StringToUpper,
  {
    value: Expression;
  }
>;

export type StringToLower = BaseExpression<
  ExpressionType.StringToLower,
  {
    value: Expression;
  }
>;

export type Equal = BaseExpression<
  ExpressionType.Eq,
  {
    left: Expression;
    right: Expression;
  }
>;

export type Expression =
  | If
  | Const
  | And
  | Not
  | Or
  | Equal
  | StringToUpper
  | StringToLower;
