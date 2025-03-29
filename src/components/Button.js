// src/components/Button.js
import React from 'react';
import { Button as MuiButton } from '@mui/material'; // Переименовано, чтобы избежать конфликтов

// Компонент кнопки
const Button = ({ text, onClick }) => {
  return (
    <MuiButton variant="contained" onClick={onClick}>
      {text}
    </MuiButton>
  );
};

export default Button;