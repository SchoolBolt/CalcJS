import {
    skipSpaces,
    ExprParser
} from "./ParserImpl.mjs";

/**
 * Класс разбора математического выражения как строки
 */
export default class Parser {

    /**
     * @constructor
     * @param {String} source строка, содержащая математическое выражение
     */
    constructor(source) {
        /** @private */
        this._source = source;
    }

    /**
     * Метод преобразует строку, переданную в конструктор,
     * в дерево операндов и возвращает корневой элемент.
     *
     * @return {Expression} корневой элемент дерева операндов
     */
    parse() {
        let pos = 0;

        pos = skipSpaces(this._source, pos);
        if (!ExprParser.isApplicable(this._source, pos)) {
            throw new Error("Not a valid expression");
        }

        let result;
        [result, pos] = ExprParser.parse(this._source, pos);

        pos = skipSpaces(this._source, pos);
        if (pos != this._source.length) {
            throw new Error(`Unexpected symbols at the end of expression after ${pos}`);
        }

        return result
    }
}
