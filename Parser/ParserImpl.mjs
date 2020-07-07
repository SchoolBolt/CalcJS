/**
 * @file ParserImpl.mjs
 * Реализация парсера математических выражений по представленной
 * ниже грамматике
 *
 * BNF:
 * (https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form)
 *
 * <expr> ::= <term> + <expr> | <term> - <expr> | <term>
 * <term> ::= <factor> * <term> | <factor> / <term> | <factor>
 * <factor> ::= ( <expr> ) | <number>
 *
 */

import {
    Expression,
    AddOperation,
    SubtractOperation,
    MultiplyOperation,
    DivideOperation,
    NumberExpr
} from "../Expressions";

/**
 * Функция пропуска пробелов в исходной строке, начиная с указанной позиции
 *
 * @param {String} source строка с исходным математическим выражением
 * @param {Number} pos текущая позиция
 * @returns {Number} новая позиция
 */
export function skipSpaces(source, pos) {
    while (pos < source.length && source[pos] == ' ') pos++;
    return pos;
}

/**
 * Парсер символа <expr> в представленной грамматике
 */
export class ExprParser {

    /**
     * Метод проверяет применим ли символ <expr> к текущей позиции
     *
     * @static
     * @param {String} source строка с исходным математическим выражением
     * @param {Number} pos текущая позиция
     * @returns {Boolean} истина, если применим, ложь -- в обратном случае
     */
    static isApplicable(source, pos) {
        return TermParser.isApplicable(source, pos);
    }

    /**
     * Метод выполянет разбор исходной строки, начиная с указанной позиции
     * и заканчивая концом выражения
     *
     * @static
     * @param {String} source строка с исходным математическим выражением
     * @param {Number} pos текущая позиция
     * @return {[Expression, Number]} массив, содержащий экземпляр Expression и новую позицию
     * @throws Ошибочно сформированное выражение
     */
    static parse(source, pos) {
        let left;
        [left, pos] = TermParser.parse(source, pos);
        pos = skipSpaces(source, pos);
        if (pos == source.length) return [left, pos];

        if (source[pos] == '+' || source[pos] == '-') {
            const op = source[pos];
            pos++;
            pos = skipSpaces(source, pos);

            if (!ExprParser.isApplicable(source, pos)) {
                throw new Error(`Invalid expression at ${pos}`);
            }

            let right;
            [right, pos] = ExprParser.parse(source, pos);

            switch (op) {
            case '+': return [new AddOperation(left, right), pos];
            case '-': return [new SubtractOperation(left, right), pos];
            }

            throw new Error("Invalid parser state");
        }

        return [left, pos];
    }
}

/**
 * Парсер символа <term> в представленной грамматике
 */
export class TermParser {

    /**
     * Метод проверяет применим ли символ <term> к текущей позиции
     *
     * @static
     * @param {String} source строка с исходным математическим выражением
     * @param {Number} pos текущая позиция
     * @returns {Boolean} истина, если применим, ложь -- в обратном случае
     */
    static isApplicable(source, pos) {
        return FactorParser.isApplicable(source, pos);
    }

    /**
     * Метод выполянет разбор исходной строки, начиная с указанной позиции
     * и заканчивая концом выражения
     *
     * @static
     * @param {String} source строка с исходным математическим выражением
     * @param {Number} pos текущая позиция
     * @return {[Expression, Number]} массив, содержащий экземпляр Expression и новую позицию
     * @throws Ошибочно сформированное выражение
     */
    static parse(source, pos) {
        let left;
        [left, pos] = FactorParser.parse(source, pos);
        pos = skipSpaces(source, pos);
        if (pos == source.length) return [left, pos];

        if (source[pos] == '*' || source[pos] == '/') {
            const op = source[pos];
            pos++;
            pos = skipSpaces(source, pos);

            if (!TermParser.isApplicable(source, pos)) {
                throw new Error(`Invalid term at ${pos}`);
            }

            let right;
            [right, pos] = TermParser.parse(source, pos);

            switch (op) {
            case '*': return [new MultiplyOperation(left, right), pos];
            case '/': return [new DivideOperation(left, right), pos];
            }

            throw new Error("Invalid parser state");
        }

        return [left, pos];
    }
}

/**
 * Парсер символа <factor> в представленной грамматике
 */
export class FactorParser {

    /**
     * Метод проверяет применим ли символ <factor> к текущей позиции
     *
     * @static
     * @param {String} source строка с исходным математическим выражением
     * @param {Number} pos текущая позиция
     * @returns {Boolean} истина, если применим, ложь -- в обратном случае
     */
    static isApplicable(source, pos) {
        if (pos >= source.length) return false;
        return source[pos] == '(' || NumberParser.isApplicable(source, pos);
    }

    /**
     * Метод выполянет разбор исходной строки, начиная с указанной позиции
     * и заканчивая концом выражения
     *
     * @static
     * @param {String} source строка с исходным математическим выражением
     * @param {Number} pos текущая позиция
     * @return {[Expression, Number]} массив, содержащий экземпляр Expression и новую позицию
     * @throws Ошибочно сформированное выражение
     */
    static parse(source, pos) {
        if (source[pos] == '(') {
            pos++;
            pos = skipSpaces(source, pos);
            if (!ExprParser.isApplicable(source, pos)) {
                throw new Error(`Invalid expressions at ${pos}`)
            }

            let expr;
            [expr, pos] = ExprParser.parse(source, pos);

            pos = skipSpaces(source, pos);
            if (pos == source.length || source[pos] != ')') {
                throw new Error(`Expected ) at ${pos}`);
            }

            pos++;
            return [expr, pos];
        }

        return NumberParser.parse(source, pos);
    }
}

/**
 * Парсер символа <number> в представленной грамматике
 */
export class NumberParser {

    /**
     * Метод проверяет применим ли символ <number> к текущей позиции
     *
     * @static
     * @param {String} source строка с исходным математическим выражением
     * @param {Number} pos текущая позиция
     * @returns {Boolean} истина, если применим, ложь -- в обратном случае
     */
    static isApplicable(source, pos) {
        if (pos >= source.length) return false;
        return source[pos] >= '0' && source[pos] <= '9';
    }

    /**
     * Метод выполянет разбор исходной строки, начиная с указанной позиции
     * и заканчивая концом выражения
     *
     * @static
     * @param {String} source строка с исходным математическим выражением
     * @param {Number} pos текущая позиция
     * @return {[Expression, Number]} массив, содержащий экземпляр Expression и новую позицию
     * @throws Ошибочно сформированное выражение
     */
    static parse(source, pos) {
        const start = pos;

        while (NumberParser.isApplicable(source, pos)) pos++;

        if (pos < source.length && source[pos] == '.') {
            pos++;
            if (!NumberParser.isApplicable(source, pos)) {
                throw new Error(`Expected digit at ${pos}`);
            }

            while (NumberParser.isApplicable(source, pos)) pos++;
        }

        const value = parseFloat(source.slice(start, pos));
        return [new NumberExpr(value), pos];
    }
}
