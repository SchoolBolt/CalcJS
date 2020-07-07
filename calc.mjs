import { Parser } from "./Parser";
import readline from "readline-sync";

function main() {
    console.log("Please, enter the mathematical expression containing floating point numbers, operations +, -, *, / or ():");
    let expr = readline.question("> ");

    const parser = new Parser(expr);

    try {
        expr = parser.parse();
        console.log(expr.calculate());
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }

    readline.question("Press <Enter> key to exit...");
}

main();
