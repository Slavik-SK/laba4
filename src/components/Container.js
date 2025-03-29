
// src/components/Container.js
import React from 'react';
import { Container as MuiContainer, Paper } from '@mui/material';

// Компонент контейнера с отступами и тенью
const Container = ({ children }) => {
  return (
    <MuiContainer maxWidth="md">
      <Paper elevation={3} style={{ padding: '16px', margin: '16px 0' }}>
        {children}
      </Paper>
    </MuiContainer>
  );
};

export default Container;