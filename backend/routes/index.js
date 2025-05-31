const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');

// Code processing routes
router.post('/process', codeController.processCode);
router.post('/tokenize', codeController.tokenizeCode);
router.post('/optimize', codeController.optimizeCode);
router.post('/validate-syntax', codeController.validateSyntax);
router.post('/generate-ir', codeController.generateIR);
router.post('/generate-ast', codeController.generateAST);
router.post('/generate-symbol-table', codeController.generateSymbolTable);

module.exports = router; 