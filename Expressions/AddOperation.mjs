import BinaryOperation from "./BinaryOperation.mjs";

/**
 * Операция сложения
 */
export default class AddOperation extends BinaryOperation {

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
        return this._left.calculate() + this._right.calculate();
    }
}
