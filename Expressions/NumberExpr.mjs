import Expression from "./Expression.mjs";

/**
 * Числовая константа как математическое выражение
 */
export default class NumberExpr extends Expression {

    /**
     * @constructor
     * @param {Number} value значение числовой константы
     */
    constructor(value) {
        super();

        /** @private */
        this._value = value;
    }

    /**
     * Метод вычисляет численное значение выражения
     *
     * @returns {Number} значение выражения как вещественное число
     */
    calculate() {
        return this._value;
    }
}
