const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Route for removing comments
app.post("/process", (req, res) => {
  const { code } = req.body;
  const processedCode = code
    .split("\n")
    .filter((line) => !line.trim().startsWith("//")) // Remove single-line comments
    .map((line) => line.split("/*")[0]) // Remove multi-line comments (basic handling)
    .join("\n");
  res.json({ processedCode });
});

// Route for tokenizing code
app.post("/tokenize", (req, res) => {
  const { code } = req.body;

  const keywords = [
    "auto",
    "break",
    "case",
    "char",
    "const",
    "continue",
    "default",
    "do",
    "double",
    "else",
    "enum",
    "extern",
    "float",
    "for",
    "goto",
    "if",
    "int",
    "long",
    "register",
    "return",
    "short",
    "signed",
    "sizeof",
    "static",
    "struct",
    "switch",
    "typedef",
    "union",
    "unsigned",
    "void",
    "volatile",
    "while",
  ];

  const operators = ["+", "-", "*", "/", "=", "==", "!=", "<", ">", "<=", ">="];
  const specialSymbols = [";", ",", "(", ")", "{", "}", "[", "]"];

  const tokens = [];

  // Set to keep track of already added tokens
  const uniqueTokens = new Set();

  // Split code into words, operators, and symbols
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

      // Add token only if it is not already in the Set
      if (tokenType && !uniqueTokens.has(`${tokenType}:${word}`)) {
        tokens.push({ type: tokenType, value: word });
        uniqueTokens.add(`${tokenType}:${word}`);
      }
    });
  }

  res.json({ tokens });
});

app.post("/optimize", (req, res) => {
  const { code } = req.body;

  // Helper functions for various optimizations

  // Remove dead code (basic implementation: remove unreachable return or break statements)
  const removeDeadCode = (lines) => {
    const optimizedLines = [];
    let hasReturnOrBreak = false;

    lines.forEach((line) => {
      if (hasReturnOrBreak && /^\s*(return|break)/.test(line)) {
        // Skip unreachable lines
        return;
      }
      if (/^\s*(return|break)/.test(line)) {
        hasReturnOrBreak = true;
      }
      optimizedLines.push(line);
    });

    return optimizedLines;
  };

  // Perform constant folding
  const constantFolding = (line) => {
    return line.replace(
      /(\d+)\s*([\+\-\*\/])\s*(\d+)/g,
      (match, a, operator, b) => {
        // Evaluate the constant expression
        switch (operator) {
          case "+":
            return parseInt(a) + parseInt(b);
          case "-":
            return parseInt(a) - parseInt(b);
          case "*":
            return parseInt(a) * parseInt(b);
          case "/":
            return parseInt(a) / parseInt(b);
          default:
            return match;
        }
      }
    );
  };

  // Perform strength reduction
  const strengthReduction = (line) => {
    return line
      .replace(/\b(\w+)\s*=\s*\1\s*\*\s*2\b/g, "$1 = $1 << 1") // Replace x = x * 2 with x = x << 1
      .replace(/\b(\w+)\s*=\s*\1\s*\/\s*2\b/g, "$1 = $1 >> 1"); // Replace x = x / 2 with x = x >> 1
  };

  // Remove redundant operations
  const removeRedundantOperations = (line) => {
    return line
      .replace(/\b(\w+)\s*=\s*\1\s*([\+\-\*\/])\s*0\b/g, "$1 = $1") // x = x + 0 or x = x - 0
      .replace(/\b(\w+)\s*=\s*\1\s*\*\s*1\b/g, "$1 = $1") // x = x * 1
      .replace(/\b(\w+)\s*=\s*\1\s*\/\s*1\b/g, "$1 = $1"); // x = x / 1
  };

  // Optimize variable declarations (combine multiple variable declarations into one)
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

  // Main optimization process
  let optimizedCode = code
    .split("\n")
    .map((line) => line.trim()) // Remove leading/trailing spaces
    .filter((line) => line !== "") // Remove empty lines
    .map(removeRedundantOperations) // Apply redundant operations removal
    .map(constantFolding) // Apply constant folding
    .map(strengthReduction); // Apply strength reduction

  optimizedCode = removeDeadCode(optimizedCode); // Remove dead code
  optimizedCode = optimizeVariableDeclarations(optimizedCode); // Optimize variable declarations

  optimizedCode = optimizedCode.join("\n"); // Reassemble the code

  res.json({ optimizedCode });
});

app.post("/validate-syntax", (req, res) => {
  const { code } = req.body;

  try {
    // Example validation for C syntax (placeholder logic)
    const errors = [];
    if (!code.includes("main()")) {
      errors.push("Missing 'main()' function.");
    }
    if (!code.includes(";")) {
      errors.push("Missing semicolons in the code.");
    }

    res.json({ isValid: errors.length === 0, errors });
  } catch (error) {
    res.status(500).json({ error: "Error validating syntax." });
  }
});

app.post("/generate-ir", (req, res) => {
  const { code } = req.body;

  try {
    const ir = [];
    // Example IR generation (placeholder logic)
    const lines = code.split("\n");
    lines.forEach((line, index) => {
      if (/(\w+)\s*=\s*(.+)/.test(line)) {
        const [_, lhs, rhs] = line.match(/(\w+)\s*=\s*(.+)/);
        ir.push(`t${index + 1} = ${rhs}`);
        ir.push(`${lhs} = t${index + 1}`);
      }
    });

    res.json({ ir });
  } catch (error) {
    res.status(500).json({ error: "Error generating intermediate code." });
  }
});

const Parser = require("tree-sitter");
const C = require("tree-sitter-c");

app.post("/generate-ast", (req, res) => {
  const { code } = req.body;

  try {
    if (!code || code.trim() === "") {
      throw new Error("No code provided");
    }

    const parser = new Parser();
    parser.setLanguage(C);
    const tree = parser.parse(code);

    // Convert tree to a react-d3-tree compatible format
    const convertNode = (node) => ({
      name: node.type, // Required by react-d3-tree
      children: node.children.map(convertNode), // Recursive call
    });

    const ast = convertNode(tree.rootNode);

    res.json({ ast });
  } catch (error) {
    console.error("Error generating AST:", error.message);
    res.status(500).json({ error: `Error generating AST: ${error.message}` });
  }
});

app.post("/generate-symbol-table", (req, res) => {
  const { code } = req.body;

  try {
    const symbolTable = [];
    let scope = "global"; // Start with global scope

    // Regex for variable declarations (supports int, float, char)
    const variableRegex = /\b(int|float|char)\s+([\w\s,=]+);/g;

    // Regex for function declarations
    const functionRegex = /\b(\w+)\s+(\w+)\(([\w\s,]*)\)\s*\{/g;

    // Regex for function parameters
    const parameterRegex = /(\w+)\s+(\w+)/g;

    // Process each line of code
    const lines = code.split("\n");

    lines.forEach((line, index) => {
      let trimmedLine = line.trim();

      // Check for function declarations
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
        scope = funcName; // Switch scope to the function
        return;
      }

      // Check for variable declarations
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

      // Handle scope closure
      if (trimmedLine === "}") {
        scope = "global"; // Reset scope to global when function ends
      }
    });

    res.json({ symbolTable });
  } catch (error) {
    res.status(500).json({ error: "Error generating symbol table." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
