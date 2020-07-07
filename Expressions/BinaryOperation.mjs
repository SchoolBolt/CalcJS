import Expression from "./Expression.mjs";

/**
 * Общий предок для бинарных операторов
 */
export default class BinaryOperator extends Expression {

    /**
     * @constructor
     * @param {Expression} left левый операнд
     * @param {Expression} right правый операнд
     */
    constructor(left, right) {
        super();

        /** @protected */
        this._left = left;
        /** @protected */
        this._right = right;
    }
}
