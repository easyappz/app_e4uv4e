const express = require('express');

const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// POST /api/calculate/add - Addition
router.post('/calculate/add', (req, res) => {
  const { num1, num2 } = req.body;
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Invalid input. Numbers are required.' });
  }
  const result = num1 + num2;
  res.json({ result });
});

// POST /api/calculate/subtract - Subtraction
router.post('/calculate/subtract', (req, res) => {
  const { num1, num2 } = req.body;
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Invalid input. Numbers are required.' });
  }
  const result = num1 - num2;
  res.json({ result });
});

// POST /api/calculate/multiply - Multiplication
router.post('/calculate/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Invalid input. Numbers are required.' });
  }
  const result = num1 * num2;
  res.json({ result });
});

// POST /api/calculate/divide - Division
router.post('/calculate/divide', (req, res) => {
  const { num1, num2 } = req.body;
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Invalid input. Numbers are required.' });
  }
  if (num2 === 0) {
    return res.status(400).json({ error: 'Division by zero is not allowed.' });
  }
  const result = num1 / num2;
  res.json({ result });
});

module.exports = router;
