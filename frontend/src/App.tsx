import React, { useState } from 'react';
import { Container, Paper, Grid, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { backend } from 'declarations/backend';

const CalculatorButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '60px',
  fontSize: '1.5rem',
}));

const DisplayPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  textAlign: 'right',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  fontSize: '2rem',
}));

const App: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = async (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operation) {
      const currentValue = firstOperand || 0;
      let op;
      switch (operation) {
        case '+':
          op = { add: null };
          break;
        case '-':
          op = { subtract: null };
          break;
        case '*':
          op = { multiply: null };
          break;
        case '/':
          op = { divide: null };
          break;
        default:
          return;
      }

      const result = await backend.calculate(currentValue, inputValue, op);
      if ('ok' in result) {
        setDisplay(result.ok.toString());
        setFirstOperand(result.ok);
      } else {
        setDisplay('Error');
        setFirstOperand(null);
      }
    }

    setWaitingForSecondOperand(true);
    setOperation(nextOperation);
  };

  return (
    <Container maxWidth="sm">
      <DisplayPaper elevation={3}>{display}</DisplayPaper>
      <Grid container spacing={1}>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map(
          (btn) => (
            <Grid item xs={3} key={btn}>
              <CalculatorButton
                variant="contained"
                color={['/', '*', '-', '+'].includes(btn) ? 'secondary' : btn === '=' ? 'success' : 'primary'}
                onClick={() => {
                  if (btn === '=') {
                    performOperation('=');
                  } else if (['+', '-', '*', '/'].includes(btn)) {
                    performOperation(btn);
                  } else if (btn === '.') {
                    inputDecimal();
                  } else {
                    inputDigit(btn);
                  }
                }}
              >
                {btn}
              </CalculatorButton>
            </Grid>
          )
        )}
        <Grid item xs={12}>
          <CalculatorButton variant="contained" color="secondary" onClick={clear}>
            Clear
          </CalculatorButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
