const Parser = require("tree-sitter");
const C = require("tree-sitter-c");

const codeService = {
    processCode: async (code) => {
        return code
            .split("\n")
            .filter((line) => !line.trim().startsWith("//"))
            .map((line) => line.split("/*")[0])
            .join("\n");
    },

    tokenizeCode: async (code) => {
        const keywords = [
            "auto", "break", "case", "char", "const", "continue", "default",
            "do", "double", "else", "enum", "extern", "float", "for", "goto",
            "if", "int", "long", "register", "return", "short", "signed",
            "sizeof", "static", "struct", "switch", "typedef", "union",
            "unsigned", "void", "volatile", "while"
        ];

        const operators = ["+", "-", "*", "/", "=", "==", "!=", "<", ">", "<=", ">="];
        const specialSymbols = [";", ",", "(", ")", "{", "}", "[", "]"];
        const tokens = [];
        const uniqueTokens = new Set();

        const words = code.match(/\w+|[+\-*/=<>(){}\[\];,]|"[^"]*"|'[^']*'/g);

        if (words) {
            words.forEach((word) => {
                let tokenType = null;

                if (keywords.includes(word)) {
                    tokenType = "Keyword";
                } else if (/^[a-zA-Z_]\w*$/.test(word)) {
                    tokenType = "Identifier";
                } else if (/^\d+$/.test(word)) {
                    tokenType = "Constant";
                } else if (operators.includes(word)) {
                    tokenType = "Operator";
                } else if (specialSymbols.includes(word)) {
                    tokenType = "Special Symbol";
                } else if (/^".*"$/.test(word) || /^'.*'$/.test(word)) {
                    tokenType = "String";
                }

                if (tokenType && !uniqueTokens.has(`${tokenType}:${word}`)) {
                    tokens.push({ type: tokenType, value: word });
                    uniqueTokens.add(`${tokenType}:${word}`);
                }
            });
        }

        return tokens;
    },

    optimizeCode: async (code) => {
        const removeDeadCode = (lines) => {
            const optimizedLines = [];
            let hasReturnOrBreak = false;

            lines.forEach((line) => {
                if (hasReturnOrBreak && /^\s*(return|break)/.test(line)) {
                    return;
                }
                if (/^\s*(return|break)/.test(line)) {
                    hasReturnOrBreak = true;
                }
                optimizedLines.push(line);
            });

            return optimizedLines;
        };

        const constantFolding = (line) => {
            return line.replace(
                /(\d+)\s*([\+\-\*\/])\s*(\d+)/g,
                (match, a, operator, b) => {
                    switch (operator) {
                        case "+": return parseInt(a) + parseInt(b);
                        case "-": return parseInt(a) - parseInt(b);
                        case "*": return parseInt(a) * parseInt(b);
                        case "/": return parseInt(a) / parseInt(b);
                        default: return match;
                    }
                }
            );
        };

        const strengthReduction = (line) => {
            return line
                .replace(/\b(\w+)\s*=\s*\1\s*\*\s*2\b/g, "$1 = $1 << 1")
                .replace(/\b(\w+)\s*=\s*\1\s*\/\s*2\b/g, "$1 = $1 >> 1");
        };

        const removeRedundantOperations = (line) => {
            return line
                .replace(/\b(\w+)\s*=\s*\1\s*([\+\-\*\/])\s*0\b/g, "$1 = $1")
                .replace(/\b(\w+)\s*=\s*\1\s*\*\s*1\b/g, "$1 = $1")
                .replace(/\b(\w+)\s*=\s*\1\s*\/\s*1\b/g, "$1 = $1");
        };

        const optimizeVariableDeclarations = (lines) => {
            const declarationRegex = /^\s*(int|float|char)\s+([\w,=\s]+);/;
            const groupedDeclarations = {};
            const optimizedLines = [];

            lines.forEach((line) => {
                const match = line.match(declarationRegex);
                if (match) {
                    const type = match[1];
                    const variables = match[2];

                    if (!groupedDeclarations[type]) {
                        groupedDeclarations[type] = [];
                    }
                    groupedDeclarations[type].push(variables);
                } else {
                    optimizedLines.push(line);
                }
            });

            Object.entries(groupedDeclarations).forEach(([type, variables]) => {
                optimizedLines.unshift(`${type} ${variables.join(", ")};`);
            });

            return optimizedLines;
        };

        let optimizedCode = code
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line !== "")
            .map(removeRedundantOperations)
            .map(constantFolding)
            .map(strengthReduction);

        optimizedCode = removeDeadCode(optimizedCode);
        optimizedCode = optimizeVariableDeclarations(optimizedCode);

        return optimizedCode.join("\n");
    },

    validateSyntax: async (code) => {
        const errors = [];
        if (!code.includes("main()")) {
            errors.push("Missing 'main()' function.");
        }
        if (!code.includes(";")) {
            errors.push("Missing semicolons in the code.");
        }
        return { isValid: errors.length === 0, errors };
    },

    generateIR: async (code) => {
        const ir = [];
        const lines = code.split("\n");
        lines.forEach((line, index) => {
            if (/(\w+)\s*=\s*(.+)/.test(line)) {
                const [_, lhs, rhs] = line.match(/(\w+)\s*=\s*(.+)/);
                ir.push(`t${index + 1} = ${rhs}`);
                ir.push(`${lhs} = t${index + 1}`);
            }
        });
        return ir;
    },

    generateAST: async (code) => {
        if (!code || code.trim() === "") {
            throw new Error("No code provided");
        }

        const parser = new Parser();
        parser.setLanguage(C);
        const tree = parser.parse(code);

        const convertNode = (node) => ({
            name: node.type,
            children: node.children.map(convertNode),
        });

        return convertNode(tree.rootNode);
    },

    generateSymbolTable: async (code) => {
        const symbolTable = [];
        let scope = "global";

        const variableRegex = /\b(int|float|char)\s+([\w\s,=]+);/g;
        const functionRegex = /\b(\w+)\s+(\w+)\(([\w\s,]*)\)\s*\{/g;
        const parameterRegex = /(\w+)\s+(\w+)/g;

        const lines = code.split("\n");

        lines.forEach((line) => {
            let trimmedLine = line.trim();

            const funcMatch = functionRegex.exec(trimmedLine);
            if (funcMatch) {
                const [, returnType, funcName, params] = funcMatch;
                symbolTable.push({
                    name: funcName,
                    type: "function",
                    returnType,
                    scope: "global",
                    memoryAddress: `0x${Math.floor(Math.random() * 1e8).toString(16)}`,
                    parameters: params
                        .split(",")
                        .map((param) => {
                            const paramMatch = parameterRegex.exec(param.trim());
                            if (paramMatch) {
                                const [, paramType, paramName] = paramMatch;
                                return { name: paramName, type: paramType };
                            }
                            return null;
                        })
                        .filter(Boolean),
                });
                scope = funcName;
                return;
            }

            let varMatch;
            while ((varMatch = variableRegex.exec(trimmedLine)) !== null) {
                const [, varType, vars] = varMatch;
                vars.split(",").forEach((variable) => {
                    const [name, value] = variable.split("=").map((v) => v.trim());
                    symbolTable.push({
                        name,
                        type: "variable",
                        dataType: varType,
                        scope,
                        memoryAddress: `0x${Math.floor(Math.random() * 1e8).toString(16)}`,
                        value: value || "undefined",
                    });
                });
            }

            if (trimmedLine === "}") {
                scope = "global";
            }
        });

        return symbolTable;
    }
};

module.exports = codeService; 