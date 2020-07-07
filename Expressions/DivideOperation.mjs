import BinaryOperation from "./BinaryOperation.mjs";

/**
 * Операция деления
 */
export default class DivideOperation extends BinaryOperation {

    /**
     * @constructor
     * @param {Expression} left левый операнд
     * @param {Expression} right правый операнд
     */
    constructor(left, right) {
        super(left, right);
    }

    /**
     * Метод вычисляет численное значение выражения
     *
     * @returns {Number} значение выражения как вещественное число
     */
    calculate() {
        const numerator = this._left.calculate();
        const denominator = this._right.calculate();
        if (denominator == 0) {
            throw new Error("Division by zero");
        }
        return numerator / denominator;
    }
}
