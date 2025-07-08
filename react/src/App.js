import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
    setWaitingForSecondOperand(false);
  };

  const handleOperationClick = (op) => {
    if (firstOperand === null) {
      setFirstOperand(parseFloat(display));
      setOperation(op);
      setWaitingForSecondOperand(true);
      setDisplay('0');
    } else if (!waitingForSecondOperand) {
      const secondOperand = parseFloat(display);
      const result = calculateResult(firstOperand, secondOperand, operation);
      setDisplay(result.toString());
      setFirstOperand(result);
      setOperation(op);
      setWaitingForSecondOperand(true);
    } else {
      setOperation(op);
    }
  };

  const handleEqualsClick = () => {
    if (firstOperand !== null && operation !== null && !waitingForSecondOperand) {
      const secondOperand = parseFloat(display);
      const result = calculateResult(firstOperand, secondOperand, operation);
      setDisplay(result.toString());
      setFirstOperand(null);
      setOperation(null);
      setWaitingForSecondOperand(false);
    }
  };

  const calculateResult = (first, second, op) => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '×':
        return first * second;
      case '÷':
        return second !== 0 ? first / second : 'Error';
      default:
        return 0;
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setOperation(null);
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <ErrorBoundary>
      <Box className="calculator-container">
        <Box className="calculator-display">
          <Typography variant="h3" className="display-text">
            {display}
          </Typography>
        </Box>
        <Grid container spacing={1} className="calculator-buttons">
          {buttons.map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                variant="contained"
                className={`calculator-button ${btn === 'C' ? 'clear-button' : ''} ${
                  ['÷', '×', '-', '+'].includes(btn) ? 'operation-button' : ''
                } ${btn === '=' ? 'equals-button' : ''}`}
                onClick={() => {
                  if (btn === 'C') handleClearClick();
                  else if (btn === '=') handleEqualsClick();
                  else if (['÷', '×', '-', '+'].includes(btn)) handleOperationClick(btn);
                  else handleNumberClick(btn);
                }}
              >
                {btn}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ErrorBoundary>
  );
}

export default App;
