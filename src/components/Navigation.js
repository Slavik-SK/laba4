// src/components/Navigation.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

// Компонент навигации (простой AppBar)
const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Навигация
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;