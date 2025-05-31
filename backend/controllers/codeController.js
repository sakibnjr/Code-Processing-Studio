const codeService = require('../services/codeService');

const codeController = {
    processCode: async (req, res) => {
        try {
            const { code } = req.body;
            const processedCode = await codeService.processCode(code);
            res.json({ processedCode });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    tokenizeCode: async (req, res) => {
        try {
            const { code } = req.body;
            const tokens = await codeService.tokenizeCode(code);
            res.json({ tokens });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    optimizeCode: async (req, res) => {
        try {
            const { code } = req.body;
            const optimizedCode = await codeService.optimizeCode(code);
            res.json({ optimizedCode });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    validateSyntax: async (req, res) => {
        try {
            const { code } = req.body;
            const result = await codeService.validateSyntax(code);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    generateIR: async (req, res) => {
        try {
            const { code } = req.body;
            const ir = await codeService.generateIR(code);
            res.json({ ir });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    generateAST: async (req, res) => {
        try {
            const { code } = req.body;
            const ast = await codeService.generateAST(code);
            res.json({ ast });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    generateSymbolTable: async (req, res) => {
        try {
            const { code } = req.body;
            const symbolTable = await codeService.generateSymbolTable(code);
            res.json({ symbolTable });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = codeController; 