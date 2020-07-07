
/**
 * Общий предок всех математических выражений
 */
export default class Expression {

    /**
     * Метод вычисляет численное значение выражения
     *
     * @abstract
     * @returns {Number} значение выражения как вещественное число
     */
    calculate() {
        throw new Exception("Must be implemented");
    }
}
